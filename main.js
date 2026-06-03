// ---- Theme (dark / light) with system + localStorage ----
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initial);

  function setIcon(t) { toggle.textContent = t === "dark" ? "☀️" : "🌙"; }
  setIcon(initial);

  toggle.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setIcon(next);
  });
})();

// ---- Mobile nav ----
(function () {
  const burger = document.getElementById("navBurger");
  const links = document.getElementById("navLinks");
  if (!burger) return;
  burger.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );
})();

// ---- Scroll reveal ----
(function () {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((e) => e.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  els.forEach((e) => io.observe(e));
})();

// ---- Email unscramble (anti-scrape: real address assembled at click) ----
(function () {
  const el = document.getElementById("email");
  const btn = document.getElementById("unscramble");
  const user = "vkhindka";
  const domain = ["andrew", "cmu", "edu"].join(".");
  const addr = user + "@" + domain;

  const footerEmail = document.getElementById("footerEmail");
  if (footerEmail) footerEmail.setAttribute("href", "mailto:" + addr);

  if (!el || !btn) return;

  const pool = "abcdefghijklmnopqrstuvwxyz0123456789@._";
  const rand = () => pool[Math.floor(Math.random() * pool.length)];

  btn.addEventListener("click", function () {
    btn.disabled = true;
    btn.style.opacity = "0.5";
    let revealed = 0;

    // Flicker the still-scrambled characters (calm, not frantic).
    const flicker = setInterval(function () {
      let out = "";
      for (let i = 0; i < addr.length; i++) {
        const c = addr[i];
        if (i < revealed || c === "@" || c === ".") out += c;
        else out += rand();
      }
      el.textContent = out;
    }, 75);

    // Lock in two more correct characters per step (quick phased reveal).
    const reveal = setInterval(function () {
      revealed += 2;
      if (revealed >= addr.length) {
        clearInterval(flicker);
        clearInterval(reveal);
        el.textContent = addr;
        btn.remove();
      }
    }, 70);
  });
})();

// ---- Footer year ----
document.getElementById("year").textContent = new Date().getFullYear();
