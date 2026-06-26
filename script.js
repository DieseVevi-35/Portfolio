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

// ===================== Galerie-Filter (gallery.html) =====================
(function () {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return; // Nicht auf der Galerie-Seite



  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  const title = document.getElementById("galleryTitle");
  const count = document.getElementById("galleryCount");

  function renderCategory(key) {
    const data = categories[key];
    if (!data) return;

    title.textContent = data.label;
    count.textContent = data.count + (data.count === 1 ? " Bild" : " Bilder");

    grid.innerHTML = "";
    for (let i = 1; i <= data.count; i++) {
      const ph = document.createElement("div");
      ph.className = "placeholder";
      ph.textContent = data.label + " " + i;
      grid.appendChild(ph);
    }

    sidebarLinks.forEach(function (link) {
      link.classList.toggle("active", link.dataset.category === key);
    });

    history.replaceState(null, "", "#" + key);
  }

  sidebarLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      renderCategory(link.dataset.category);
    });
  });

  // Direkter Link/Reload berücksichtigt aktuelle Kategorie aus der URL
  const initial = window.location.hash.replace("#", "");
  renderCategory(categories[initial] ? initial : "fussball");
})();
