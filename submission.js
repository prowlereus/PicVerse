document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("submissionForm");
  const fileInput = document.getElementById("artwork");
  const filePreview = document.getElementById("filePreview");
  const fileUploadText = document.querySelector(".file-upload-text");

  function showLoading() {
    document.getElementById("loading").style.display = "block";
  }

  function hideLoading() {
    document.getElementById("loading").style.display = "none";
  }

  function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  }

  const validators = {
    email: (value) => {
      if (!value.trim()) {
        return "Email is required";
      }

      const emailParts = value.split("@");
      if (emailParts.length !== 2) {
        return "Please enter a valid email address";
      }
      const [localPart, domain] = emailParts;
      if (!localPart || !domain) {
        return "Please enter a valid email address";
      }
      if (!domain.includes(".")) {
        return "Please enter a valid email address";
      }
      const domainParts = domain.split(".");
      if (domainParts.some((part) => !part)) {
        return "Please enter a valid email address";
      }
      return "";
    },

    title: (value) => {
      if (!value.trim()) {
        return "Title is required";
      }
      if (value.trim().length < 3) {
        return "Title must be at least 3 characters long";
      }
      if (value.trim().length > 100) {
        return "Title must be less than 100 characters";
      }
      return "";
    },

    description: (value) => {
      if (!value.trim()) {
        return "Description is required";
      }
      if (value.trim().length < 10) {
        return "Description must be at least 10 characters long";
      }
      if (value.trim().length > 1000) {
        return "Description must be less than 1000 characters";
      }
      return "";
    },

    tags: (value) => {
      const selectedOptions = Array.from(
        document.getElementById("tags").selectedOptions
      );
      if (selectedOptions.length === 0) {
        return "Please select at least one tag";
      }
      if (selectedOptions.length > 5) {
        return "Please select no more than 5 tags";
      }
      return "";
    },

    artwork: (value) => {
      const file = fileInput.files[0];
      if (!file) {
        return "Please upload an artwork file";
      }

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        return "Please upload a valid image file (JPEG, PNG, GIF, or WebP)";
      }

      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        return "File size must be less than 10MB";
      }

      return "";
    },
  };

  function validateField(fieldName, value) {
    const errorElement = document.getElementById(fieldName + "Error");
    const fieldElement =
      document.getElementById(fieldName) ||
      document.querySelector(`[name="${fieldName}"]`);
    const formGroup = fieldElement.closest(".form-group");

    let errorMessage = "";

    if (validators[fieldName]) {
      errorMessage = validators[fieldName](value);
    }

    if (fieldName === "aiGenerated") {
      const radioButtons = document.querySelectorAll(
        'input[name="aiGenerated"]'
      );
      const isChecked = Array.from(radioButtons).some((radio) => radio.checked);
      if (!isChecked) {
        errorMessage = "Please specify if the artwork is AI-generated";
      }
    }

    if (errorMessage) {
      errorElement.textContent = errorMessage;
      formGroup.classList.add("error");
      return false;
    } else {
      errorElement.textContent = "";
      formGroup.classList.remove("error");
      return true;
    }
  }

  document.getElementById("email").addEventListener("blur", function () {
    validateField("email", this.value);
  });

  document.getElementById("title").addEventListener("blur", function () {
    validateField("title", this.value);
  });

  document.getElementById("description").addEventListener("blur", function () {
    validateField("description", this.value);
  });

  document.getElementById("tags").addEventListener("change", function () {
    validateField("tags", this.value);
  });

  document.querySelectorAll('input[name="aiGenerated"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      validateField("aiGenerated", this.value);
    });
  });

  fileInput.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
      validateField("artwork", file);

      const reader = new FileReader();
      reader.onload = (e) => {
        filePreview.innerHTML = `
                    <img src="${
                      e.target.result
                    }" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 8px;">
                    <p style="margin-top: 10px; color: #2c3e50; font-weight: 500;">${
                      file.name
                    }</p>
                    <p style="color: #7f8c8d; font-size: 0.9rem;">${(
                      file.size /
                      1024 /
                      1024
                    ).toFixed(2)} MB</p>
                `;
        fileUploadText.textContent = "File selected successfully!";
        fileUploadText.style.color = "#27ae60";
      };
      reader.readAsDataURL(file);
    } else {
      filePreview.innerHTML = "";
      fileUploadText.textContent = "Choose file or drag and drop";
      fileUploadText.style.color = "#7f8c8d";
    }
  });

  const fileUploadContainer = document.querySelector(".file-upload-container");
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    fileUploadContainer.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  ["dragenter", "dragover"].forEach((eventName) => {
    fileUploadContainer.addEventListener(eventName, highlight, false);
  });
  ["dragleave", "drop"].forEach((eventName) => {
    fileUploadContainer.addEventListener(eventName, unhighlight, false);
  });

  function highlight(e) {
    fileUploadContainer.classList.add("drag-over");
  }

  function unhighlight(e) {
    fileUploadContainer.classList.remove("drag-over");
  }

  fileUploadContainer.addEventListener("drop", handleDrop, false);

  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files.length > 0) {
      fileInput.files = files;
      fileInput.dispatchEvent(new Event("change"));
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fields = ["email", "title", "description", "tags", "artwork"];
    let isValid = true;

    fields.forEach((field) => {
      const fieldElement = document.getElementById(field);
      const value = fieldElement ? fieldElement.value : "";
      if (!validateField(field, value)) {
        isValid = false;
      }
    });

    if (!validateField("aiGenerated", "")) {
      isValid = false;
    }

    if (isValid) {
      showLoading();

      setTimeout(() => {
        hideLoading();
        showNotification(
          "Artwork submitted successfully! It will be reviewed and published soon.",
          "success"
        );

        form.reset();
        filePreview.innerHTML = "";
        fileUploadText.textContent = "Choose file or drag and drop";
        fileUploadText.style.color = "#7f8c8d";

        document.querySelectorAll(".form-group").forEach((group) => {
          group.classList.remove("error");
        });
        document.querySelectorAll(".error-message").forEach((error) => {
          error.textContent = "";
        });
      }, 2000);
    } else {
      showNotification(
        "Please fix the errors in the form before submitting.",
        "error"
      );
    }
  });

  document.querySelector(".reset-btn").addEventListener("click", () => {
    filePreview.innerHTML = "";
    fileUploadText.textContent = "Choose file or drag and drop";
    fileUploadText.style.color = "#7f8c8d";

    document.querySelectorAll(".form-group").forEach((group) => {
      group.classList.remove("error");
    });
    document.querySelectorAll(".error-message").forEach((error) => {
      error.textContent = "";
    });
  });

  const descriptionField = document.getElementById("description");
  const descriptionGroup = descriptionField.closest(".form-group");

  const charCounter = document.createElement("small");
  charCounter.style.cssText =
    "display: block; margin-top: 5px; color: #7f8c8d; text-align: right;";
  descriptionGroup.appendChild(charCounter);

  function updateCharCounter() {
    const currentLength = descriptionField.value.length;
    const maxLength = 1000;
    charCounter.textContent = `${currentLength}/${maxLength} characters`;

    if (currentLength > maxLength * 0.9) {
      charCounter.style.color = "#e74c3c";
    } else if (currentLength > maxLength * 0.7) {
      charCounter.style.color = "#f39c12";
    } else {
      charCounter.style.color = "#7f8c8d";
    }
  }

  descriptionField.addEventListener("input", updateCharCounter);
  updateCharCounter();
});

const particleContainer = document.querySelector(".particle-layer");
for (let i = 0; i < 40; i++) {
  const p = document.createElement("div");
  p.classList.add("particle");
  p.style.left = `${Math.random() * 100}%`;
  p.style.top = `${Math.random() * 100}%`;
  p.style.animationDelay = `${Math.random() * 10}s`;
  p.style.animationDuration = `${8 + Math.random() * 6}s`;
  particleContainer.appendChild(p);
}
