const loveMessages = [
  "Roar-some love sent! 🦁",
  "Hasan feels the jungle hugs! 🌿",
  "That's a lot of birthday love! 🎂",
  "The monkeys are cheering! 🐒",
  "Hasan's giggling already! 😄",
  "Heart explosion in the jungle! 💥",
  "You're the best explorer! 🗺️",
  "Safari squad sends love back! 💚",
];

const animalMessages = {
  monkey: "Ooh ooh! Monkey says hi to Hasan! 🐒",
  lion: "ROOOAR! Hasan's favorite lion is king of the party! 🦁👑",
  giraffe: "Giraffe says Hasan is growing tall! 🦒",
  elephant: "Elephant trumpets happy birthday! 🐘",
  parrot: "Squawk! Parrot loves party time! 🦜",
};

function initFireflies() {
  const container = document.getElementById("fireflies");
  for (let i = 0; i < 18; i++) {
    const fly = document.createElement("span");
    fly.className = "firefly";
    fly.style.left = `${Math.random() * 100}%`;
    fly.style.top = `${20 + Math.random() * 60}%`;
    fly.style.setProperty("--duration", `${4 + Math.random() * 6}s`);
    fly.style.setProperty("--delay", `${Math.random() * 5}s`);
    fly.style.setProperty("--dx", `${-30 + Math.random() * 60}px`);
    fly.style.setProperty("--dy", `${-40 + Math.random() * 80}px`);
    container.appendChild(fly);
  }
}

function initFallingLeaves() {
  const container = document.getElementById("fallingLeaves");
  const leaves = ["🍃", "🌿", "🍂", "🌱", "🌴"];
  for (let i = 0; i < 18; i++) {
    const leaf = document.createElement("span");
    leaf.className = "leaf";
    leaf.textContent = leaves[i % leaves.length];
    leaf.style.left = `${Math.random() * 100}%`;
    leaf.style.setProperty("--fall-duration", `${8 + Math.random() * 10}s`);
    leaf.style.setProperty("--fall-delay", `${Math.random() * 8}s`);
    container.appendChild(leaf);
  }
}

function initVines() {
  const container = document.getElementById("vines");
  const positions = [6, 14, 22, 31, 42, 53, 64, 73, 82, 91];
  positions.forEach((left, i) => {
    const vine = document.createElement("div");
    vine.className = i % 3 === 0 ? "vine vine-thick" : "vine";
    vine.style.left = `${left + (Math.random() * 4 - 2)}%`;
    vine.style.height = `${18 + Math.random() * 28}vh`;
    vine.style.setProperty("--vine-angle", `${-3 + Math.random() * 6}deg`);
    vine.style.setProperty("--vine-duration", `${3 + Math.random() * 3}s`);
    vine.style.setProperty("--vine-delay", `${Math.random() * 2}s`);
    container.appendChild(vine);
  });
}

function initScrollReveal() {
  const cards = document.querySelectorAll(".card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  cards.forEach((card) => observer.observe(card));
}

function initScrollButton() {
  document.getElementById("scrollBtn").addEventListener("click", () => {
    document.getElementById("invite").scrollIntoView({ behavior: "smooth" });
  });
}

function initFactReveal() {
  const reveal = document.getElementById("factReveal");
  const toggle = () => reveal.classList.toggle("revealed");

  reveal.addEventListener("click", toggle);
  reveal.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function initAnimals() {
  document.querySelectorAll(".animal").forEach((animal) => {
    animal.addEventListener("click", () => {
      animal.classList.add("bounce");
      setTimeout(() => animal.classList.remove("bounce"), 400);

      if (animal.classList.contains("lion-favorite")) {
        animal.classList.add("roaring");
        setTimeout(() => animal.classList.remove("roaring"), 500);
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            const rect = animal.getBoundingClientRect();
            spawnHeart(rect.left + rect.width / 2, rect.top + rect.height / 2);
          }, i * 80);
        }
      }

      const key = animal.dataset.animal;
      showToast(animalMessages[key] || "Jungle friend says hi! 🌴");
    });
  });

  setTimeout(() => {
    showToast("Meet Hasan's favorite — the mighty Lion! 🦁👑");
  }, 1800);
}

function spawnHeart(x, y) {
  const container = document.getElementById("heartContainer");
  const hearts = ["❤️", "💚", "💛", "🧡", "💕", "💖"];
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.setProperty("--size", `${1 + Math.random() * 1.5}rem`);
  heart.style.setProperty("--duration", `${1.2 + Math.random() * 0.8}s`);
  heart.style.setProperty("--tx", `${-80 + Math.random() * 160}px`);
  heart.style.setProperty("--ty", `${-120 - Math.random() * 100}px`);
  heart.style.setProperty("--rot", `${-30 + Math.random() * 60}deg`);
  container.appendChild(heart);
  setTimeout(() => heart.remove(), 2000);
}

function spawnConfetti(x, y) {
  const colors = ["#f4c542", "#6fbf4a", "#ff6b6b", "#87ceeb", "#fff8e7"];
  for (let i = 0; i < 16; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${x}px`;
    piece.style.top = `${y}px`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    piece.style.setProperty("--duration", `${0.8 + Math.random() * 0.6}s`);
    piece.style.setProperty("--tx", `${-100 + Math.random() * 200}px`);
    piece.style.setProperty("--ty", `${-80 - Math.random() * 120}px`);
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1500);
  }
}

function initLoveButton() {
  const btn = document.getElementById("loveBtn");
  const countEl = document.getElementById("loveCount");
  const messageEl = document.getElementById("loveMessage");
  let count = 0;

  btn.addEventListener("click", (e) => {
    count += 1;
    countEl.textContent = count;

    btn.classList.add("pulse");
    setTimeout(() => btn.classList.remove("pulse"), 400);

    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        spawnHeart(cx + (Math.random() - 0.5) * 40, cy + (Math.random() - 0.5) * 20);
      }, i * 60);
    }

    if (count % 5 === 0) {
      spawnConfetti(cx, cy);
    }

    messageEl.textContent = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    messageEl.style.opacity = "1";

    if (count === 1) {
      showToast("First heart for Hasan! Keep them coming! 💚");
    } else if (count === 10) {
      showToast("10 hearts! Hasan is one loved explorer! 🎉");
    } else if (count === 25) {
      showToast("25 hearts! Jungle legend status! 🏆");
    }
  });
}

function initParallax() {
  const layers = document.querySelectorAll("[data-parallax]");
  let ticking = false;

  document.addEventListener("mousemove", (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      layers.forEach((layer) => {
        const strength = parseFloat(layer.dataset.parallax) || 0.04;
        layer.style.transform = `translate(${x * strength * 120}px, ${y * strength * 60}px)`;
      });

      ticking = false;
    });
  });
}

initFireflies();
initFallingLeaves();
initVines();
initScrollReveal();
initScrollButton();
initFactReveal();
initAnimals();
initLoveButton();
initParallax();
