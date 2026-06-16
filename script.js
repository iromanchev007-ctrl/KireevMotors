/* ===== Kireev Motors — scripts ===== */
(function () {
  "use strict";

  /* Current year in footer */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Mobile menu ---- */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.classList.contains("nav-link")) {
        nav.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            // small stagger for grids
            setTimeout(function () { el.classList.add("in"); }, (i % 6) * 60);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Car brands & models ---- */
  var CARS = {
    "Lada": ["Granta", "Vesta", "Largus", "Niva", "Kalina", "Priora", "XRAY"],
    "Toyota": ["Camry", "Corolla", "RAV4", "Land Cruiser", "Highlander", "Avensis", "Prius"],
    "Kia": ["Rio", "Sportage", "Ceed", "Optima", "Sorento", "Cerato", "Soul"],
    "Hyundai": ["Solaris", "Creta", "Tucson", "Santa Fe", "Elantra", "Sonata", "i30"],
    "Volkswagen": ["Polo", "Golf", "Passat", "Tiguan", "Jetta", "Touareg"],
    "Renault": ["Logan", "Sandero", "Duster", "Kaptur", "Megane", "Arkana"],
    "Nissan": ["Almera", "Qashqai", "X-Trail", "Juke", "Note", "Teana"],
    "Skoda": ["Octavia", "Rapid", "Kodiaq", "Superb", "Fabia", "Karoq"],
    "Ford": ["Focus", "Fiesta", "Mondeo", "Kuga", "Explorer", "EcoSport"],
    "BMW": ["3 Series", "5 Series", "X3", "X5", "X1", "7 Series"],
    "Mercedes-Benz": ["C-Class", "E-Class", "GLC", "GLE", "A-Class", "S-Class"],
    "Audi": ["A4", "A6", "Q5", "Q7", "A3", "Q3"],
    "Chevrolet": ["Lacetti", "Cruze", "Niva", "Aveo", "Cobalt", "Captiva"],
    "Mazda": ["3", "6", "CX-5", "CX-30", "CX-9"],
    "Mitsubishi": ["Lancer", "Outlander", "ASX", "Pajero", "Eclipse Cross"],
    "Honda": ["Civic", "CR-V", "Accord", "Pilot", "HR-V"],
    "Geely": ["Coolray", "Atlas", "Tugella", "Monjaro", "Emgrand"],
    "Chery": ["Tiggo 4", "Tiggo 7", "Tiggo 8", "Arrizo 8"],
    "Haval": ["Jolion", "F7", "Dargo", "H9", "M6"]
  };

  var brandList = document.getElementById("brandList");
  var brandInput = document.getElementById("brand");
  var modelList = document.getElementById("modelList");
  var modelInput = document.getElementById("model");

  if (brandList) {
    Object.keys(CARS).sort().forEach(function (b) {
      var opt = document.createElement("option");
      opt.value = b;
      brandList.appendChild(opt);
    });
  }

  function fillModels(brand) {
    if (!modelList) return;
    modelList.innerHTML = "";
    var models = CARS[brand];
    if (models) {
      models.forEach(function (m) {
        var opt = document.createElement("option");
        opt.value = m;
        modelList.appendChild(opt);
      });
      modelInput.placeholder = "Выберите или впишите модель";
    } else {
      modelInput.placeholder = "Введите модель вручную";
    }
  }

  if (brandInput) {
    brandInput.addEventListener("input", function () {
      fillModels(brandInput.value.trim());
    });
    brandInput.addEventListener("change", function () {
      fillModels(brandInput.value.trim());
      if (modelInput) modelInput.value = "";
    });
  }

  /* ---- Service card "Записаться" prefill ---- */
  var serviceSelect = document.getElementById("service");
  document.querySelectorAll("[data-service]").forEach(function (link) {
    link.addEventListener("click", function () {
      var name = link.getAttribute("data-service");
      if (serviceSelect) {
        Array.prototype.forEach.call(serviceSelect.options, function (o) {
          if (o.value === name) serviceSelect.value = name;
        });
      }
    });
  });

  /* ---- Phone formatting (RU) ---- */
  var phone = document.getElementById("phone");
  if (phone) {
    phone.addEventListener("input", function () {
      var d = phone.value.replace(/\D/g, "");
      if (d.startsWith("8")) d = "7" + d.slice(1);
      if (d.startsWith("9") && d.length <= 10) d = "7" + d;
      d = d.slice(0, 11);
      var out = "+7";
      if (d.length > 1) out += " (" + d.slice(1, 4);
      if (d.length >= 4) out += ") " + d.slice(4, 7);
      if (d.length >= 7) out += "-" + d.slice(7, 9);
      if (d.length >= 9) out += "-" + d.slice(9, 11);
      phone.value = out;
    });
  }

  /* ---- Form submit (stub) ---- */
  var form = document.getElementById("bookingForm");
  var success = document.getElementById("formSuccess");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      ["name", "phone", "brand", "service"].forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        if (!el.value.trim()) {
          el.classList.add("invalid");
          ok = false;
        } else {
          el.classList.remove("invalid");
        }
      });
      if (!ok) {
        var firstInvalid = form.querySelector(".invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      /* Stub: collect data (no real sending). Replace with fetch() to backend / Telegram bot later. */
      var data = {
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        email: form.email.value.trim(),
        brand: form.brand.value.trim(),
        model: form.model.value.trim(),
        service: form.service.value,
        comment: form.comment.value.trim()
      };
      console.log("Заявка (заглушка):", data);

      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
      if (modelInput) modelInput.placeholder = "Сначала выберите марку";

      setTimeout(function () {
        if (success) success.hidden = true;
      }, 6000);
    });
  }
})();
