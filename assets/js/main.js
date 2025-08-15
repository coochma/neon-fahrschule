let revealObserver = null;


// Data (easy to edit)
const courses = [
  { id: "B", title: "Klasse B", price: 1499, tag: "Beliebt", items: ["Theorie 14×90 min", "Praxis 12×45 min", "Prüfungsvorbereitung", "Sim-Training inkl."] },
  { id: "B197", title: "Klasse B197", price: 1699, tag: "Empfohlen", items: ["Automatik + Schalt", "Theorie 14×90 min", "Praxis 12×45 min", "Schalt‑Nachweis inkl."] },
  { id: "A1", title: "A1 (125cc)", price: 1290, tag: "Neu", items: ["Theorie 12×90 min", "Praxis nach Bedarf", "Schutzkleidung inkl.", "Track Day"] },
];

const nextTheory = [
  { day: "Mo", date: "18.08", topic: "Grundwissen 1", time: "18:00–19:30", room: "NEON – Studio 1" },
  { day: "Mi", date: "20.08", topic: "Vorfahrt & Regeln", time: "18:00–19:30", room: "NEON – Studio 2" },
  { day: "Fr", date: "22.08", topic: "Gefahrenerkennung", time: "17:30–19:00", room: "NEON – Studio 1" },
  { day: "Sa", date: "23.08", topic: "B197 Praxis‑Plus", time: "11:00–13:00", room: "NEON – Arena" },
];

const instructors = [
  { name: "Mia Neon", langs: ["DE", "EN"], car: "VW ID.3", bio: "Geduldig, klar, humorvoll.", rating: 4.9 },
  { name: "Jonas Flux", langs: ["DE", "PL"], car: "Cupra Born", bio: "Technikfreak & Safety first.", rating: 4.8 },
  { name: "Leyla Pulse", langs: ["DE", "TR"], car: "BMW 1er (Auto)", bio: "Angstfrei zum Führerschein.", rating: 5.0 },
  { name: "Alex Beam", langs: ["DE", "RU"], car: "Audi A3 (Schalt)", bio: "Ruhig & effizient.", rating: 4.7 },
];

// Inject courses
const cardsEl = document.getElementById('courseCards');
const tabsEl = document.getElementById('courseTabs');
let active = "B197";

function renderCourses() {
  cardsEl.innerHTML = courses.map(c => `
    <article class="course ${c.id === active ? 'active' : ''} reveal">
      <span class="tag">${c.tag}</span>
      <h3><svg class="i"><use href="#i-wheel"></use></svg>${c.title}</h3>
      <div class="price">€${c.price} <small>inkl. Grundbetrag*</small></div>
      <ul>${c.items.map(x => `<li>${x}</li>`).join('')}</ul>
      <div class="actions">
        <a href="#kontakt" class="btn neon">Jetzt starten</a>
        <a href="#kontakt" class="btn outline">Details</a>
      </div>
    </article>
  `).join('');
  revealInit(); // rebind reveal
}

tabsEl.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    tabsEl.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    active = btn.dataset.tab;
    renderCourses();
  });
});
renderCourses();

// Inject theory
const theoryEl = document.getElementById('theoryGrid');
theoryEl.innerHTML = nextTheory.map(t => `
  <article class="card-mini reveal">
    <div class="top">
      <div class="day">${t.day}</div>
      <div class="date">${t.date}</div>
    </div>
    <div class="mt"><strong>${t.topic}</strong></div>
    <div class="mt muted"><svg class="i"><use href="#i-clock"></use></svg> ${t.time}</div>
    <div class="mt muted"><svg class="i"><use href="#i-pin"></use></svg> ${t.room}</div>
    <a href="#kontakt" class="btn outline">Platz reservieren</a>
  </article>
`).join('');

// Inject team
const teamEl = document.getElementById('teamGrid');
teamEl.innerHTML = instructors.map(p => `
  <article class="team-card reveal">
    <div class="team-photo"></div>
    <div class="team-meta">
      <div>
        <div class="team-name">${p.name}</div>
        <div class="team-lang"><svg class="i"><use href="#i-lang"></use></svg> ${p.langs.join(' · ')}</div>
        <div class="muted">${p.car}</div>
      </div>
      <div class="muted"><svg class="i"><use href="#i-star"></use></svg> ${p.rating.toFixed(1)}</div>
    </div>
    <a href="#kontakt" class="btn outline" style="width:100%; margin-top:10px">Schnupperstunde</a>
  </article>
`).join('');

// Mobile nav
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('open');
});

// Contact form (demo only)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  statusEl.textContent = "Danke! Wir melden uns in Kürze.";
  form.reset();
});

// Reveal on scroll (safe, no TDZ)
function revealInit() {
  if (revealObserver) revealObserver.disconnect();

  const els = document.querySelectorAll('.reveal');
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach((el) => revealObserver.observe(el));
}

// на випадок ресайзу / повного релоаду
window.addEventListener('load', revealInit);
window.addEventListener('resize', () => {
  clearTimeout(window.__revealT);
  window.__revealT = setTimeout(revealInit, 120);
});



// Icons extra
(function injectExtraIcons() {
  const sprite = document.querySelector('svg[style*="display:none"]');
  if (!sprite) return;
  const extra = document.createElementNS("http://www.w3.org/2000/svg", "symbol");
  extra.setAttribute("id", "i-wheel");
  extra.setAttribute("viewBox", "0 0 24 24");
  extra.innerHTML = '<path fill="currentColor" d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm1 9h5v2h-5l-1 5h-2l1-5H6v-2h5l1-5h2l-1 5Z"/>';
  sprite.appendChild(extra);
})();

// Set current year safely (не переписуємо весь body)
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
