document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("artworkModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalArtist = document.getElementById("modalArtist");
  const modalLikes = document.getElementById("modalLikes");
  const modalViews = document.getElementById("modalViews");
  const modalDescription = document.getElementById("modalDescription");
  const closeBtn = document.querySelector(".close");

  const artworkData = {
    1: {
      title: "Sunset Landscape",
      artist: "Ethan Vance",
      likes: 1456,
      views: 8923,
      description:
        "Silhouetted against a brilliant orange sunset, two ships rest on the calm sea, their dark forms reflected in the shimmering path of light cast by the setting sun. A flock of birds flying high above completes this tranquil maritime scene.",
      image: "assets/ship.png",
    },
    2: {
      title: "The Ancient Voyager",
      artist: "Kurnia Septiawan",
      likes: 892,
      views: 5634,
      description:
        "In a surreal underwater realm, a majestic sea turtle glides through the deep blue, carrying a living island on its back. This wandering home, complete with a cozy house and waterfalls cascading from its edges, is illuminated by ethereal beams of light filtering down from the ocean's surface.",
      image: "assets/turtle.jpg",
    },
    3: {
      title: "Wild Soul",
      artist: "Edward Alexander",
      likes: 1123,
      views: 7245,
      description:
        "This artistic portrait captures the powerful gaze of a grizzly bear. Rendered in earthy tones with a textured, painterly style, it evokes a sense of the bear's wild majesty and contemplative nature.",
      image: "assets/bear.jpg",
    },
    4: {
      title: "Chrome and Crimson",
      artist: "Bruce Lee",
      likes: 756,
      views: 4892,
      description:
        "In a hazy cyberpunk metropolis, a mysterious figure in a crimson hood surveys the neon-lit streets. Her intense, glowing eyes and sleek metallic facial enhancements mark her as a product of this high-tech world, standing ready for whatever the future holds.",
      image: "assets/assasin.jpg",
    },
    5: {
      title: "The Keeper of Runes",
      artist: "Madison Beer",
      likes: 1834,
      views: 12456,
      description:
        "In a misty, ancient forest, a lone cloaked figure stands among towering monoliths inscribed with glowing, arcane symbols. The heavy, somber atmosphere suggests this is a sacred and forgotten place, filled with ancient magic and guarded secrets.",
      image: "assets/forest.jpg",
    },
    6: {
      title: "The Last Behemoth",
      artist: "Chris Evan",
      likes: 2145,
      views: 15678,
      description:
        "Deep within a fire-lit cavern, a cloaked traveler stands in silent awe before a colossal elephant, a living relic from a forgotten age. The sheer scale of the ancient behemoth, framed by glowing rock and shadow, creates a powerful and epic fantasy scene of a world where humanity and myth collide.",
      image: "assets/elephant.jpg",
    },
    7: {
      title: "Oceanic Symphony",
      artist: "Snow White",
      likes: 1567,
      views: 9834,
      description:
        "This vibrant and energetic artwork depicts an underwater jubilee, where a majestic orca, playful dolphins, and graceful sea turtles swim in harmony. The deep blue sea is brought to life by schools of colorful fish and shimmering light from above, creating a joyous celebration of oceanic life.",
      image: "assets/ocean.jpg",
    },
    8: {
      title: "Heart of the Machine",
      artist: "Timothy Ronald",
      likes: 1289,
      views: 8123,
      description:
        "A vibrant, glowing heart emerges from a dark background, its form intricately woven from the illuminated traces of a circuit board. This powerful image symbolizes the fusion of human emotion and technology, representing a digital pulse or the very core of a thinking machine.",
      image: "assets/heart.jpg",
    },
    9: {
      title: "Cyberpunk City",
      artist: "Taylor Swift",
      likes: 1678,
      views: 11234,
      description:
        "Bathed in a vibrant haze of purple and pink neon, a bustling city street comes to life after dark. The silhouettes of pedestrians move through the glowing alleyways, capturing the chaotic energy and electric dreams of a classic cyberpunk future.",
      image: "assets/cyberpunk.jpg",
    },
    10: {
      title: "Sea of Dreams",
      artist: "Mikey Madison",
      likes: 934,
      views: 6789,
      description:
        "A lone woman journeys in an ornate boat across a vast, surreal sea made of clouds. Guided by a distant light and surrounded by glowing, drifting petals, she approaches a solitary house floating peacefully in a fantastical, dream-like sky.",
      image: "assets/boat.jpg",
    },
    11: {
      title: "Color Explosion",
      artist: "Lamine Yamal",
      likes: 2234,
      views: 14567,
      description:
        "An abstract exploration of color relationships and emotional expression. The piece uses dynamic composition to create visual energy and movement.",
      image: "assets/abs1.jpg",
    },
    12: {
      title: "Geometric Forms",
      artist: "Keanu",
      likes: 1345,
      views: 8901,
      description:
        "A study in geometric abstraction that explores the relationship between mathematical precision and artistic expression.",
      image: "assets/abs2.jpg",
    },
    13: {
      title: "Digital Waves",
      artist: "Cha Eun Woo",
      likes: 1789,
      views: 10456,
      description:
        "A fluid digital composition that captures the essence of movement and flow through abstract forms and gradients.",
      image: "assets/abs3.jpg",
    },
    14: {
      title: "Fractal Art",
      artist: "Fajar Sadboy",
      likes: 1456,
      views: 9123,
      description:
        "A complex fractal composition that demonstrates the beauty of mathematical patterns in digital art creation.",
      image: "assets/abs4.jpg",
    },
    15: {
      title: "Minimalist Design",
      artist: "Sisca Kohl",
      likes: 987,
      views: 6234,
      description:
        "A minimalist approach that proves the power of simplicity in digital art. Every element serves a purpose in the overall composition.",
      image: "assets/abs5.jpg",
    },
    16: {
      title: "Girl with a Pearl Earring",
      artist: "Johannes Vermeer",
      likes: 123,
      views: 456,
      description:
        "This captivating painting features a young European girl in an exotic blue and yellow turban and a prominent pearl earring. She is depicted turning her head to gaze directly at the viewer with a mysterious and intimate expression. The artwork is celebrated for Vermeer's masterful use of light (chiaroscuro), which softly illuminates her face against a dark, featureless background, drawing all attention to her enigmatic presence and the shimmering pearl.",
      image: "assets/portrait1.jpg",
    },
    17: {
      title: "Self-Portrait with an Easel",
      artist: "Nicolas Régnier",
      likes: 234,
      views: 567,
      description:
        "In this complex and confident self-portrait, Nicolas Régnier presents himself not just as a craftsman, but as a cultured gentleman. Dressed in elegant black attire with a wide-brimmed hat, he pauses his work to engage the viewer with a direct and assured gaze. On the easel is a portrait of another man, possibly his patron, who also looks out of the canvas. This painting-within-a-painting technique serves as a sophisticated advertisement of Régnier's skill and an assertion of the high status of the artist in the 17th century.",
      image: "assets/portrait2.jpg",
    },
    18: {
      title: "Snow White Discovers the Cottage",
      artist: "Disney Dreams Collection",
      likes: 345,
      views: 678,
      description:
        "The composition is filled with vibrant detail, from the lush, colorful flowers lining the sparkling stream to the gentle woodland creatures—deer and rabbits—that have befriended the lost princess. The painting evokes a powerful sense of hope, peace, and the promise of safety after a perilous journey.",
      image: "assets/fantasy.jpg",
    },
    19: {
      title: "Beyond the Andromeda",
      artist: "Sule",
      likes: 456,
      views: 789,
      description: "To infinity and beyond.",
      image: "assets/space.jpg",
    },
  };

  document.querySelectorAll(".artwork-item").forEach((item) => {
    item.addEventListener("click", function () {
      const artworkId = this.getAttribute("data-artwork");
      const artwork = artworkData[artworkId];

      if (artwork) {
        modalImage.src = artwork.image;
        modalImage.alt = artwork.title;
        modalTitle.textContent = artwork.title;
        modalArtist.textContent = `by ${artwork.artist}`;
        modalLikes.textContent = `❤️ ${artwork.likes.toLocaleString()}`;
        modalViews.textContent = `👁️ ${artwork.views.toLocaleString()}`;
        modalDescription.textContent = artwork.description;

        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent background scrolling
      }
    });
  });

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
  }

  function animateArtworks() {
    const artworkItems = document.querySelectorAll(".artwork-item");

    artworkItems.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top;
      const itemVisible = 150;

      if (itemTop < window.innerHeight - itemVisible) {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, index * 50);
      }
    });
  }

  document.querySelectorAll(".artwork-item").forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "all 0.6s ease";
  });

  window.addEventListener("scroll", animateArtworks);
  window.addEventListener("load", animateArtworks);

  document.querySelectorAll(".artwork-item img").forEach((img) => {
    const showImage = () => {
      img.style.opacity = "1";
    };

    if (img.complete) {
      showImage();
    } else {
      img.style.opacity = "0";
      img.style.transition = "opacity 0.3s ease";
      img.addEventListener("load", showImage);
      img.addEventListener("error", () => {
        showImage();
        console.error(`Failed to load image: ${img.src}`);
      });
    }
  });

  document.querySelectorAll(".artwork-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
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
