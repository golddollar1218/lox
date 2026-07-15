function initContract() {
  const display = document.getElementById("ca-display");
  const copyBtn = document.getElementById("copy-ca");
  const toast = document.getElementById("copy-toast");
  if (!display || !copyBtn || !toast) return;

  const address = display.textContent.trim();

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(address);
      copyBtn.classList.add("copied");
      copyBtn.querySelector("span").textContent = "Copied!";
      toast.textContent = "Contract address copied!";
      toast.classList.add("show");

      setTimeout(() => {
        copyBtn.classList.remove("copied");
        copyBtn.querySelector("span").textContent = "Copy";
        toast.classList.remove("show");
      }, 2500);
    } catch {
      toast.textContent = "Copy failed — select and copy manually.";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2500);
    }
  });
}

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  const header = document.querySelector(".site-header");
  if (!toggle || !links || !header) return;

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initReveals() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((el) => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
  );

  nodes.forEach((el) => io.observe(el));
}

function initCursorGlow() {
  const glow = document.getElementById("cursor-glow");
  if (!glow || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(pointer: fine)").matches) return;

  document.body.classList.add("has-cursor-glow");

  let raf = 0;
  let x = 0;
  let y = 0;

  const move = (e) => {
    x = e.clientX;
    y = e.clientY;
    if (!raf) {
      raf = requestAnimationFrame(() => {
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
        raf = 0;
      });
    }
  };

  window.addEventListener("mousemove", move, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  initContract();
  initNav();
  initReveals();
  initCursorGlow();
});
