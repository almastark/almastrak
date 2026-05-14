/* ===== Shared Site Data ===== */

const siteNavigation = [
  {
    label: "Hem",
    href: "index.html#top"
  },
  {
    label: "Case-studier",
    href: "index.html#work"
  },
  {
    label: "Arbetssätt",
    href: "index.html#value"
  },
  {
    label: "Om mig",
    href: "index.html#about"
  },
  {
    label: "Kontakt",
    href: "index.html#contact"
  }
];

const siteFooter = {
  year: "2026",
  name: "Alma Stark",
  line: "Byggd för att visa hur jag tänker, inte bara hur det ser ut."
};

/* ===== Helpers ===== */

function getCurrentPageName(){
  const path = window.location.pathname;
  const fileName = path.substring(path.lastIndexOf("/") + 1);
  return fileName || "index.html";
}

function isHomePage(){
  const page = getCurrentPageName();
  return page === "index.html" || page === "";
}

/* ===== Header ===== */

function createSiteHeader(){
  const headerMount = document.querySelector("[data-site-header]");

  if (!headerMount) return;

  const currentPage = getCurrentPageName();

  const navLinks = siteNavigation.map(item => {
    const isCurrent =
      currentPage === "index.html" &&
      item.href.startsWith("index.html#") &&
      window.location.hash === item.href.replace("index.html", "");

    return `
      <a href="${item.href}" ${isCurrent ? 'aria-current="page"' : ""}>
        ${item.label}
      </a>
    `;
  }).join("");

  headerMount.innerHTML = `
    <header class="site-header">
      <nav class="site-nav" aria-label="Huvudmeny">
        <a class="site-brand" href="index.html#top" aria-label="Alma Stark startsida">
          <span class="site-brand__mark" aria-hidden="true"></span>
          <span class="site-brand__text">
            <span class="site-brand__name">Alma Stark</span>
            <span class="site-brand__role">Digital Content Designer</span>
          </span>
        </a>

        <button class="site-nav__toggle" type="button" aria-label="Öppna meny" aria-expanded="false">
          <span class="site-nav__toggle-line"></span>
        </button>

        <div class="site-nav__links">
          ${navLinks}
        </div>
      </nav>
    </header>
  `;
}

/* ===== Footer ===== */

function createSiteFooter(){
  const footerMount = document.querySelector("[data-site-footer]");

  if (!footerMount) return;

  footerMount.innerHTML = `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <div>© ${siteFooter.year} ${siteFooter.name}</div>
        <div>${siteFooter.line}</div>
      </div>
    </footer>
  `;
}

/* ===== Mobile Menu ===== */

function setupMobileNavigation(){
  const siteNav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".site-nav__toggle");
  const links = document.querySelector(".site-nav__links");

  if (!siteNav || !toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("no-scroll", isOpen);
  });

  links.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      siteNav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
    }
  });
}

/* ===== Scroll Reveal ===== */

function setupRevealAnimation(){
  const revealElements = document.querySelectorAll(".reveal");

  if (!revealElements.length) return;

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ===== Current Year Optional Safety ===== */

function updateDynamicYear(){
  const yearNodes = document.querySelectorAll("[data-current-year]");
  const currentYear = new Date().getFullYear();

  yearNodes.forEach(node => {
    node.textContent = String(currentYear);
  });
}

/* ===== Init ===== */

document.addEventListener("DOMContentLoaded", () => {
  createSiteHeader();
  createSiteFooter();
  setupMobileNavigation();
  setupRevealAnimation();
  updateDynamicYear();
});
