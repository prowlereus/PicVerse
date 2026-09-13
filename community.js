document.addEventListener("DOMContentLoaded", () => {
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".discussion-item, .activity-item, .user-item"
    );

    elements.forEach((element, index) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        setTimeout(() => {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }, index * 50);
      }
    });
  }

  document
    .querySelectorAll(".discussion-item, .activity-item, .user-item")
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "all 0.6s ease";
    });

  window.addEventListener("scroll", animateOnScroll);
  window.addEventListener("load", animateOnScroll);

  document.querySelectorAll(".discussion-item").forEach((item) => {
    item.addEventListener("click", function () {
      const title = this.querySelector("h3").textContent;
      showNotification(`Opening discussion: "${title}"`, "success");

      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "translateY(0) scale(1)";
      }, 150);
    });
  });

  document.querySelectorAll(".user-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.02)";
      this.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "";
    });

    item.addEventListener("click", function () {
      const username = this.querySelector("h4").textContent;
      showNotification(`Viewing profile: ${username}`, "success");
    });
  });

  document.querySelectorAll(".activity-item").forEach((item) => {
    item.addEventListener("click", function () {
      const activityText = this.querySelector("p").textContent;
      showNotification("Activity details loaded", "success");

      this.style.backgroundColor = "#e3f2fd";
      setTimeout(() => {
        this.style.backgroundColor = "";
      }, 300);
    });
  });

  function simulateRealTimeActivity() {
    const activityList = document.querySelector(".activity-list");
    const activities = [
      {
        icon: "🎨",
        text: "<strong>CreativeArtist</strong> uploaded a new artwork",
        time: "Just now",
      },
      {
        icon: "💬",
        text: '<strong>ArtLover123</strong> commented on "Digital Landscapes"',
        time: "2 minutes ago",
      },
      {
        icon: "👥",
        text: "<strong>NewMember</strong> joined the community",
        time: "5 minutes ago",
      },
      {
        icon: "❤️",
        text: '<strong>ArtCritic</strong> liked "Abstract Dreams"',
        time: "8 minutes ago",
      },
    ];

    let activityIndex = 0;

    function addNewActivity() {
      if (activityIndex < activities.length) {
        const activity = activities[activityIndex];
        const activityElement = document.createElement("div");
        activityElement.className = "activity-item";
        activityElement.style.opacity = "0";
        activityElement.style.transform = "translateX(-20px)";
        activityElement.style.transition = "all 0.5s ease";

        activityElement.innerHTML = `
                    <div class="activity-icon">${activity.icon}</div>
                    <div class="activity-content">
                        <p>${activity.text}</p>
                        <span class="activity-time">${activity.time}</span>
                    </div>
                `;

        activityList.insertBefore(activityElement, activityList.firstChild);

        setTimeout(() => {
          activityElement.style.opacity = "1";
          activityElement.style.transform = "translateX(0)";
        }, 100);

        const items = activityList.querySelectorAll(".activity-item");
        if (items.length > 6) {
          const lastItem = items[items.length - 1];
          lastItem.style.opacity = "0";
          lastItem.style.transform = "translateX(20px)";
          setTimeout(() => {
            if (lastItem.parentNode) {
              lastItem.parentNode.removeChild(lastItem);
            }
          }, 500);
        }

        activityIndex++;
      }
    }

    setInterval(addNewActivity, 10000);
  }

  setTimeout(simulateRealTimeActivity, 5000);

  function animateOnlineIndicators() {
    const indicators = document.querySelectorAll(".online-indicator");
    indicators.forEach((indicator, index) => {
      setTimeout(() => {
        indicator.style.animationDelay = `${index * 0.2}s`;
      }, index * 100);
    });
  }

  animateOnlineIndicators();

  function animateCounters() {
    const counters = document.querySelectorAll(".reply-count");

    counters.forEach((counter) => {
      const target = Number.parseInt(counter.textContent);
      let current = 0;
      const increment = target / 50; // Animate over 50 steps

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 30);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  });

  const forumSection = document.querySelector(".forum-discussions");
  if (forumSection) {
    observer.observe(forumSection);
  }

  function addSearchFunctionality() {
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search discussions...";
    searchInput.style.cssText = `
            width: 100%;
            padding: 10px 15px;
            border: 2px solid #e1e8ed;
            border-radius: 25px;
            margin-bottom: 20px;
            font-size: 14px;
            transition: border-color 0.3s ease;
        `;

    searchInput.addEventListener("focus", function () {
      this.style.borderColor = "#667eea";
    });

    searchInput.addEventListener("blur", function () {
      this.style.borderColor = "#e1e8ed";
    });

    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const discussions = document.querySelectorAll(".discussion-item");

      discussions.forEach((discussion) => {
        const title = discussion.querySelector("h3").textContent.toLowerCase();
        const author = discussion
          .querySelector(".author")
          .textContent.toLowerCase();

        if (title.includes(searchTerm) || author.includes(searchTerm)) {
          discussion.style.display = "flex";
        } else {
          discussion.style.display = searchTerm ? "none" : "flex";
        }
      });
    });

    const forumHeader = document.querySelector(".forum-discussions h2");
    if (forumHeader) {
      forumHeader.parentNode.insertBefore(searchInput, forumHeader.nextSibling);
    }
  }

  addSearchFunctionality();

  const particleContainer = document.querySelector(".particle-layer");
  if (particleContainer) {
    for (let i = 0; i < 40; i++) {
      const p = document.createElement("div");
      p.classList.add("particle");
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.width = p.style.height = `${4 + Math.random() * 4}px`;
      p.style.opacity = `${0.1 + Math.random() * 0.3}`;
      p.style.animationDelay = `${Math.random() * 10}s`;
      p.style.animationDuration = `${8 + Math.random() * 6}s`;
      particleContainer.appendChild(p);
    }
  }
});
