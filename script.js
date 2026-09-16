// ===================== Mobiles Menü =====================
(function () {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", function () {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();

// ===================== Projekte-Dropdown =====================
(function () {
  const dropdown = document.querySelector(".nav-dropdown");
  if (!dropdown) return;

  const trigger = dropdown.querySelector(".nav-dropdown-trigger");
  const menu = dropdown.querySelector(".dropdown-menu");

  function isMobile() {
    return window.matchMedia("(max-width: 860px)").matches;
  }

  trigger.addEventListener("click", function (e) {
    if (!isMobile()) return; // Desktop: Hover übernimmt das Öffnen
    e.preventDefault();
    const isOpen = dropdown.classList.toggle("open");
    trigger.setAttribute("aria-expanded", String(isOpen));
  });

  // Schließt das Dropdown bei Klick außerhalb (nur mobile relevant)
  document.addEventListener("click", function (e) {
    if (isMobile() && !dropdown.contains(e.target) && dropdown.classList.contains("open")) {
      dropdown.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    }
  });

  // Dropdown + mobiles Hauptmenü schließen, wenn ein Unterpunkt geklickt wird
  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      dropdown.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    });
  });
})();

// ===================== Bilder-Lightbox (Galerie-Seiten) =====================
(function () {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return; // Nicht auf einer Galerie-Seite

  const images = Array.from(grid.querySelectorAll(".gallery-item img"));
  if (!images.length) return;

  let currentIndex = 0;

  // Lightbox-Markup einmalig erzeugen und an den body anhängen
  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Schließen">&times;</button>' +
    '<button type="button" class="lightbox-prev" aria-label="Vorheriges Bild">&#10094;</button>' +
    '<button type="button" class="lightbox-next" aria-label="Nächstes Bild">&#10095;</button>' +
    '<div class="lightbox-content">' +
      '<img class="lightbox-img" src="" alt="">' +
      '<p class="lightbox-counter"></p>' +
    "</div>";
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector(".lightbox-img");
  const counterEl = overlay.querySelector(".lightbox-counter");
  const closeBtn = overlay.querySelector(".lightbox-close");
  const prevBtn = overlay.querySelector(".lightbox-prev");
  const nextBtn = overlay.querySelector(".lightbox-next");
  const hasMultiple = images.length > 1;
  prevBtn.style.display = hasMultiple ? "" : "none";
  nextBtn.style.display = hasMultiple ? "" : "none";

  function show(index) {
    currentIndex = (index + images.length) % images.length;
    const source = images[currentIndex];
    imgEl.src = source.currentSrc || source.src;
    imgEl.alt = source.alt || "";
    counterEl.textContent = hasMultiple ? (currentIndex + 1) + " / " + images.length : "";
  }

  function openAt(index) {
    show(index);
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-locked");
    closeBtn.focus();
  }

  function close() {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-locked");
    imgEl.src = "";
  }

  images.forEach(function (img, index) {
    img.addEventListener("click", function () {
      openAt(index);
    });
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", function () { show(currentIndex - 1); });
  nextBtn.addEventListener("click", function () { show(currentIndex + 1); });

  // Klick auf den abgedunkelten Hintergrund schließt die Lightbox
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay || e.target.classList.contains("lightbox-content")) {
      close();
    }
  });

  // Tastatursteuerung: Escape schließt, Pfeiltasten blättern durch
  document.addEventListener("keydown", function (e) {
    if (!overlay.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(currentIndex - 1);
    if (e.key === "ArrowRight") show(currentIndex + 1);
  });
})();

