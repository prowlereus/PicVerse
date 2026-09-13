document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const indicators = document.querySelectorAll(".indicator");
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    slides[index].classList.add("active");
    indicators[index].classList.add("active");

    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }

  function stopSlideshow() {
    clearInterval(slideInterval);
  }

  if (slides.length > 0) {
    startSlideshow();

    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        showSlide(index);
        stopSlideshow();
        startSlideshow(); // Restart the timer
      });
    });

    const slideshowContainer = document.querySelector(".slideshow-container");
    if (slideshowContainer) {
      slideshowContainer.addEventListener("mouseenter", stopSlideshow);
      slideshowContainer.addEventListener("mouseleave", startSlideshow);
    }
  }

  function animateArtworks() {
    const artworkCards = document.querySelectorAll(".artwork-card");

    artworkCards.forEach((card, index) => {
      const cardTop = card.getBoundingClientRect().top;
      const cardVisible = 150;

      if (cardTop < window.innerHeight - cardVisible) {
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, index * 100); // Stagger animation
      }
    });
  }

  document.querySelectorAll(".artwork-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease";
  });

  function animateTags() {
    const tags = document.querySelectorAll(".tag");

    tags.forEach((tag, index) => {
      const tagTop = tag.getBoundingClientRect().top;
      const tagVisible = 150;

      if (tagTop < window.innerHeight - tagVisible) {
        setTimeout(() => {
          tag.style.opacity = "1";
          tag.style.transform = "translateY(0) scale(1)";
        }, index * 50);
      }
    });
  }

  document.querySelectorAll(".tag").forEach((tag) => {
    tag.style.opacity = "0";
    tag.style.transform = "translateY(20px) scale(0.9)";
    tag.style.transition = "all 0.4s ease";
  });

  window.addEventListener("scroll", animateArtworks);
  window.addEventListener("scroll", animateTags);
  window.addEventListener("load", animateArtworks);
  window.addEventListener("load", animateTags);

  document.querySelectorAll(".artwork-card").forEach((card) => {
    card.addEventListener("click", function () {
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "translateY(-10px)";
      }, 100);
    });
  });

  const ctaButtons = document.querySelectorAll(".cta-button");
  ctaButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-3px) scale(1)";
    });
  });

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector(".hero-section");

    if (heroSection) {
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    }
  });
});
