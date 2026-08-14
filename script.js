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

// Drop matching files into assets/videos/ to fill these slots (see the README there).
const journeyVideos = [
  {
    file: "hasan-bday.mp4",
    chapter: "Year One",
    emoji: "🦁",
    title: "Hasan's first year",
    caption:
      "From sleepy newborn yawns to wobbly first steps — one whole year of our little explorer.",
  },
];

const videoBasePath = "assets/videos/";

// Set by initMusic so the backsound can step aside while a clip plays.
const musicBridge = {
  suppressed: false,
  duck() {},
  restore() {},
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
    document.getElementById("event").scrollIntoView({ behavior: "smooth" });
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

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "";
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function buildJourneyClip(video, index) {
  const clip = document.createElement("button");
  clip.className = "journey-clip pending";
  clip.type = "button";
  clip.dataset.index = String(index);
  clip.setAttribute("aria-label", `Play ${video.chapter} — ${video.title}`);
  clip.innerHTML = `
    <span class="journey-clip-media">
      <span class="journey-clip-chapter"></span>
      <video muted playsinline preload="metadata" tabindex="-1"></video>
      <span class="journey-clip-play" aria-hidden="true">▶</span>
      <span class="journey-clip-duration" hidden></span>
      <span class="journey-clip-soon">Coming soon 🌿</span>
    </span>
    <span class="journey-clip-body">
      <span class="journey-clip-title">
        <span class="journey-clip-emoji" aria-hidden="true"></span><span class="journey-clip-name"></span>
      </span>
      <span class="journey-clip-caption"></span>
    </span>`;

  clip.querySelector(".journey-clip-chapter").textContent = video.chapter;
  clip.querySelector(".journey-clip-emoji").textContent = video.emoji;
  clip.querySelector(".journey-clip-name").textContent = video.title;
  clip.querySelector(".journey-clip-caption").textContent = video.caption;
  return clip;
}

function initJourney() {
  const rail = document.getElementById("journeyRail");
  const hint = document.getElementById("journeyHint");
  const empty = document.getElementById("journeyEmpty");
  const modal = document.getElementById("videoModal");
  const panel = modal?.querySelector(".video-modal-panel");
  const player = document.getElementById("videoModalPlayer");
  const closeBtn = document.getElementById("videoModalClose");
  const nav = modal?.querySelector(".video-modal-nav");
  const prevBtn = document.getElementById("videoPrevBtn");
  const nextBtn = document.getElementById("videoNextBtn");
  const chapterEl = document.getElementById("videoModalChapter");
  const titleEl = document.getElementById("videoModalTitle");
  const captionEl = document.getElementById("videoModalCaption");
  const counterEl = document.getElementById("videoModalCounter");
  if (!rail || !modal || !player) return;

  rail.classList.toggle("solo", journeyVideos.length === 1);

  const entries = journeyVideos.map((video, index) => {
    const src = `${videoBasePath}${video.file}`;
    const clip = buildJourneyClip(video, index);
    const thumb = clip.querySelector("video");
    const durationEl = clip.querySelector(".journey-clip-duration");
    const entry = { video, src, clip, playable: false, settled: false };

    const settle = (playable) => {
      if (entry.settled) return;
      entry.settled = true;
      entry.playable = playable;
      clip.classList.remove("pending");
      clip.classList.add(playable ? "ready" : "unavailable");
      if (!playable) {
        clip.disabled = true;
        clip.setAttribute("aria-label", `${video.chapter} — clip coming soon`);
      }
      refreshRailState();
    };

    thumb.addEventListener("loadedmetadata", () => {
      const label = formatDuration(thumb.duration);
      if (label) {
        durationEl.textContent = label;
        durationEl.hidden = false;
      }
      settle(true);
    });
    thumb.addEventListener("error", () => settle(false));
    // A slow connection shouldn't lock the clip out; let the modal surface any real failure.
    setTimeout(() => settle(true), 10000);

    thumb.src = `${src}#t=0.1`;
    clip.addEventListener("click", () => openClip(index));
    rail.appendChild(clip);
    return entry;
  });

  function refreshRailState() {
    if (entries.some((entry) => !entry.settled)) return;
    const playable = entries.filter((entry) => entry.playable);
    if (empty) empty.hidden = playable.length > 0 || entries.length === 1;
    if (hint) hint.hidden = playable.length < 2;
  }

  function playableEntries() {
    return entries.filter((entry) => entry.playable);
  }

  let currentIndex = -1;
  let lastFocused = null;

  function render(index) {
    const entry = entries[index];
    if (!entry) return;
    currentIndex = index;

    chapterEl.textContent = entry.video.chapter;
    titleEl.textContent = `${entry.video.emoji} ${entry.video.title}`;
    captionEl.textContent = entry.video.caption;

    const playable = playableEntries();
    const position = playable.indexOf(entry);
    if (nav) nav.hidden = playable.length < 2;
    counterEl.textContent = playable.length > 1 ? `${position + 1} / ${playable.length}` : "";
    prevBtn.disabled = position <= 0;
    nextBtn.disabled = position === -1 || position >= playable.length - 1;

    player.src = entry.src;
    player.load();
    player.play().catch(() => {});
  }

  function step(direction) {
    const playable = playableEntries();
    const position = playable.indexOf(entries[currentIndex]);
    const next = playable[position + direction];
    if (next) render(entries.indexOf(next));
  }

  function openClip(index) {
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("video-open");
    musicBridge.duck();
    render(index);
    closeBtn.focus();
  }

  function closeClip() {
    if (modal.hidden) return;
    player.pause();
    player.removeAttribute("src");
    player.load();
    modal.hidden = true;
    document.body.classList.remove("video-open");
    musicBridge.restore();
    if (lastFocused instanceof HTMLElement) lastFocused.focus();
  }

  player.addEventListener("error", () => {
    if (player.currentSrc) captionEl.textContent = "This clip couldn't be loaded — try again later! 🌿";
  });

  closeBtn.addEventListener("click", closeClip);
  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));
  modal.querySelectorAll("[data-video-close]").forEach((el) => {
    el.addEventListener("click", closeClip);
  });

  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;

    if (e.key === "Escape") {
      closeClip();
    } else if (e.key === "ArrowLeft") {
      step(-1);
    } else if (e.key === "ArrowRight") {
      step(1);
    } else if (e.key === "Tab" && panel) {
      const focusable = [...panel.querySelectorAll("button:not(:disabled), video")];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  refreshRailState();
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

function initMusic() {
  const audio = document.getElementById("bgMusic");
  const btn = document.getElementById("musicBtn");
  if (!audio || !btn) return;

  audio.volume = 0.45;
  let unlocked = false;

  const setPlayingUI = (playing) => {
    btn.classList.toggle("playing", playing);
    btn.setAttribute("aria-pressed", playing ? "true" : "false");
    btn.setAttribute(
      "aria-label",
      playing ? "Mute jungle backsound" : "Play jungle backsound"
    );
    btn.querySelector(".music-btn-icon").textContent = playing ? "🔊" : "🎵";
  };

  const play = async () => {
    if (musicBridge.suppressed) return false;
    try {
      await audio.play();
      unlocked = true;
      setPlayingUI(true);
      return true;
    } catch {
      setPlayingUI(false);
      return false;
    }
  };

  const pause = () => {
    audio.pause();
    setPlayingUI(false);
  };

  let resumeAfterVideo = false;

  musicBridge.duck = () => {
    musicBridge.suppressed = true;
    resumeAfterVideo = !audio.paused;
    if (resumeAfterVideo) pause();
  };

  musicBridge.restore = () => {
    musicBridge.suppressed = false;
    if (!resumeAfterVideo) return;
    resumeAfterVideo = false;
    play();
  };

  btn.addEventListener("click", async () => {
    if (audio.paused) {
      const ok = await play();
      if (ok) showToast("Jungle vibes on! 🌴🎵");
    } else {
      pause();
      showToast("Music paused 🤫");
    }
  });

  // Try autoplay; if blocked, start on first tap anywhere
  play().then((ok) => {
    if (ok) return;

    const unlock = async () => {
      if (unlocked) return;
      const started = await play();
      if (started) {
        showToast("Welcome to the jungle! 🦁🎵");
        window.removeEventListener("pointerdown", unlock);
        window.removeEventListener("keydown", unlock);
      }
    };

    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("keydown", unlock);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !audio.paused) {
      audio.dataset.wasPlaying = "1";
      audio.pause();
    } else if (!document.hidden && audio.dataset.wasPlaying === "1") {
      audio.dataset.wasPlaying = "0";
      play();
    }
  });
}

initFireflies();
initFallingLeaves();
initVines();
initScrollReveal();
initScrollButton();
initFactReveal();
initAnimals();
initJourney();
initLoveButton();
initParallax();
initMusic();
