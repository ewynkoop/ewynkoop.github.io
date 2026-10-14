/* Renders project cards from projects.js and handles the nav, filters, and
   project popup. You shouldn't need to edit this file to add projects. */

(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const ICONS = {
    photo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-8 8"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/></svg>',
    pdf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></svg>',
    arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  };

  // A striped "coming soon" box that shows the file path to upload.
  const placeholder = (kind, label, path) =>
    `<div class="ph">${ICONS[kind]}<span class="ph__label">${esc(label)}</span>${path ? `<span class="ph__path">${esc(path)}</span>` : ""}</div>`;

  // Swap any <img> that fails to load for a placeholder.
  const guardImages = (root) => {
    root.querySelectorAll("img[data-placeholder]").forEach((img) => {
      const swap = () => { img.outerHTML = placeholder("photo", img.dataset.placeholder, img.getAttribute("src")); };
      if (img.complete && img.naturalWidth === 0) swap();
      else img.addEventListener("error", swap, { once: true });
    });
  };

  /* ---------- Nav ---------- */
  const nav = $("#nav");
  const toggle = $(".nav__toggle");
  const links = $("#nav-links");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", open);
    links.classList.toggle("is-open", open);
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") { toggle.setAttribute("aria-expanded", "false"); links.classList.remove("is-open"); }
  });
  addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 10), { passive: true });

  // Highlight the nav link for the section you're looking at.
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.querySelectorAll("a").forEach((a) => a.classList.toggle("is-active", a.hash === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["about", "projects", "experience", "contact"].forEach((id) => sectionObserver.observe(document.getElementById(id)));

  /* ---------- Project cards ---------- */
  const cardsEl = $("#cards");
  const filtersEl = $("#filters");
  const categories = ["All", ...new Set(PROJECTS.map((p) => p.category))];
  let active = "All";

  filtersEl.innerHTML = categories
    .map((c) => {
      const n = c === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === c).length;
      return `<button class="filter" data-cat="${esc(c)}" aria-pressed="${c === active}">${esc(c)}<span class="count">${n}</span></button>`;
    })
    .join("");

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    active = btn.dataset.cat;
    filtersEl.querySelectorAll(".filter").forEach((b) => b.setAttribute("aria-pressed", b === btn));
    renderCards();
  });

  const cardHTML = (p, i) => `
    <button class="card cat--${slug(p.category)}" data-id="${esc(p.id)}" style="animation-delay:${i * 60}ms"
            aria-label="Open project: ${esc(p.title)}">
      <div class="card__media">
        <img src="${esc(p.cover)}" alt="" loading="lazy" data-placeholder="Photo coming soon">
        <span class="card__cat">${esc(p.category)}</span>
        ${p.award ? `<span class="card__award">🏆 ${esc(p.award)}</span>` : ""}
      </div>
      <div class="card__body">
        <div class="card__date">${esc(p.date)}</div>
        <h3 class="card__title">${esc(p.title)}</h3>
        <p class="card__summary">${esc(p.summary)}</p>
        <div class="card__foot">
          <div class="card__tags">${(p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
          <span class="card__arrow">${ICONS.arrow}</span>
        </div>
      </div>
    </button>`;

  function renderCards() {
    const list = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);
    cardsEl.innerHTML = list.map(cardHTML).join("");
    guardImages(cardsEl);
  }
  renderCards();

  cardsEl.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) openProject(card.dataset.id);
  });

  /* ---------- Project popup ---------- */
  const modal = $("#modal");
  const content = $("#modal-content");

  const mediaHTML = (m) => {
    const cap = m.caption ? `<figcaption>${esc(m.caption)}</figcaption>` : "";
    switch (m.type) {
      case "image":
        return `<figure><div class="m__frame"><img src="${esc(m.src)}" alt="${esc(m.caption || "")}" loading="lazy" data-placeholder="Photo coming soon"></div>${cap}</figure>`;
      case "video":
        return `<figure class="is-wide"><div class="m__frame" data-video="${esc(m.src)}">
                  <video controls playsinline preload="metadata"><source src="${esc(m.src)}"></video>
                </div>${cap}</figure>`;
      case "youtube":
        return `<figure class="is-wide"><div class="m__frame"><iframe src="https://www.youtube-nocookie.com/embed/${esc(m.id)}" title="${esc(m.caption || "Video")}" allowfullscreen loading="lazy"></iframe></div>${cap}</figure>`;
      case "pdf":
        return `<figure class="is-wide"><a class="pdf-card" data-pdf="${esc(m.src)}" href="${esc(m.src)}" target="_blank" rel="noopener">
                  <span class="pdf-card__icon">PDF</span><span><strong>${esc(m.caption || "Open PDF")}</strong><br><small>Opens in a new tab ↗</small></span>
                </a></figure>`;
      default:
        return "";
    }
  };

  function openProject(id, { push = true } = {}) {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) return;

    const media = p.media || [];
    content.innerHTML = `
      <div class="m__hero"><img src="${esc(p.cover)}" alt="" data-placeholder="Cover photo coming soon"></div>
      <div class="m__inner">
        <div class="m__meta cat--${slug(p.category)}">
          <span class="card__cat">${esc(p.category)}</span>
          ${p.award ? `<span class="card__award">🏆 ${esc(p.award)}</span>` : ""}
          ${(p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}
          <span class="m__date">${esc(p.date)}</span>
        </div>
        <h2 class="m__title" id="modal-title">${esc(p.title)}</h2>
        <p class="m__summary">${esc(p.summary)}</p>
        ${(p.sections || [])
          .map((s) => `<section class="m__section"><h3>${esc(s.heading)}</h3>${s.body.map((t) => `<p>${esc(t)}</p>`).join("")}</section>`)
          .join("")}
        ${media.length ? `<h3 class="m__gallery-title">Photos &amp; videos</h3><div class="m__gallery">${media.map(mediaHTML).join("")}</div>` : ""}
        ${(p.links || []).length
          ? `<div class="m__links">${p.links.map((l) => `<a class="btn btn--ghost" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}</div>`
          : ""}
      </div>`;

    guardImages(content);

    // Missing videos become placeholders too.
    content.querySelectorAll("[data-video]").forEach((frame) => {
      frame.querySelector("source").addEventListener("error", () => {
        frame.innerHTML = placeholder("video", "Video coming soon", frame.dataset.video);
      });
    });

    // Missing PDFs (only checkable when served over http, e.g. on GitHub Pages).
    content.querySelectorAll("[data-pdf]").forEach((a) => {
      if (location.protocol === "file:") return;
      fetch(a.dataset.pdf, { method: "HEAD" })
        .then((r) => { if (!r.ok) a.outerHTML = placeholder("pdf", "PDF coming soon", a.dataset.pdf); })
        .catch(() => {});
    });

    if (!modal.open) {
      modal.showModal();
      document.body.style.overflow = "hidden";
    }
    $(".modal__sheet").scrollTop = 0;
    if (push) history.replaceState(null, "", "#project-" + id);
  }

  function closeProject() {
    content.querySelectorAll("video").forEach((v) => v.pause());
    modal.close();
  }

  modal.addEventListener("close", () => {
    document.body.style.overflow = "";
    if (location.hash.startsWith("#project-")) history.replaceState(null, "", "#projects");
  });
  $("#modal-close").addEventListener("click", closeProject);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeProject(); }); // click backdrop

  // Click a project photo to see it bigger.
  content.addEventListener("click", (e) => {
    const img = e.target.closest(".m__frame img");
    if (!img) return;
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = `<img src="${img.src}" alt="${esc(img.alt)}">`;
    lb.addEventListener("click", () => lb.remove());
    modal.appendChild(lb);
  });

  // Share links like yoursite.com/#project-rube-goldberg open straight to that project.
  const fromHash = () => {
    const m = location.hash.match(/^#project-(.+)$/);
    if (m) openProject(m[1], { push: false });
  };
  addEventListener("hashchange", fromHash);
  fromHash();

  /* ---------- Misc ---------- */
  guardImages(document.querySelector(".hero"));
  $("#year").textContent = new Date().getFullYear();

  // Fade sections in as you scroll.
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); revealObserver.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".section__title, .about__body, .projects__intro, .timeline__item, .contact__big, .contact__card")
    .forEach((el) => { el.classList.add("reveal"); revealObserver.observe(el); });
})();
