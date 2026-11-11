const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const backTop = document.getElementById("backTop");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

window.addEventListener("scroll", () => {
  backTop.classList.toggle("visible", window.scrollY > 500);
});
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

document.getElementById("year").textContent = new Date().getFullYear();

const sections = document.querySelectorAll("main section[id]");
const navAnchors = navLinks.querySelectorAll('a[href^="#"]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navAnchors.forEach((anchor) => {
        anchor.classList.toggle("active", anchor.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach((section) => observer.observe(section));

const revealTargets = document.querySelectorAll(
  ".section-heading, .about-text, .about-stats, .skill-card, .timeline-item, .project-card, .research-card, .certificate-card, .service-card, .contact-details, .contact-form"
);
const revealObserver = new IntersectionObserver((entries, currentObserver) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach((target) => {
  target.classList.add("reveal");
  revealObserver.observe(target);
});

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  formStatus.textContent = "Sending...";
  formStatus.classList.remove("error");
  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  const payload = Object.fromEntries(new FormData(contactForm).entries());
  try {
    const response = await fetch("/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Unable to send your message.");
    formStatus.textContent = result.message;
    contactForm.reset();
  } catch (error) {
    formStatus.textContent = error.message || "Something went wrong. Please try again.";
    formStatus.classList.add("error");
  } finally {
    submitButton.disabled = false;
  }
});
