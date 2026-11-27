import { UI, startingLang } from './i18n.js';
import { FEATURED, MORE, TAGS } from './projects.js';

document.documentElement.classList.add('js');

const el = (tag, props = {}, ...children) => {
  // dataset can't be assigned whole, only filled in
  const { dataset, ...rest } = props;
  const node = Object.assign(document.createElement(tag), rest);
  if (dataset) Object.assign(node.dataset, dataset);
  node.append(...children.filter((c) => c !== null && c !== undefined));
  return node;
};

// the visitor's choice is a nicety: a private tab without storage just doesn't remember it
const saved = (() => {
  try {
    return localStorage.getItem('lang');
  } catch {
    return null;
  }
})();
let lang = startingLang(location.search, saved);
const t = (key) => UI[lang][key];
// a project with its texts in the current language
const local = (project) => (lang === 'pt' ? { ...project, ...project.pt } : project);

// "Java 21 / Spring Boot 4 / PostgreSQL", the way it would be written in a notebook
const stackLine = (stack) => el('p', { className: 'stack' }, stack.join(' / '));

function card(project, index) {
  const p = local(project);
  const status = p.status ? el('span', { className: 'status' }, `[${t(p.status)}]`) : null;
  const img = el('img', { src: p.image, alt: p.alt, loading: 'lazy', decoding: 'async', width: 1280, height: 720 });
  const item = el(
    'li',
    { className: 'reveal', dataset: { tags: p.tags.join(' ') } },
    el(
      'article',
      { className: 'card' },
      el('div', { className: 'shot' }, img),
      el(
        'div',
        { className: 'body' },
        el('span', { className: 'number' }, String(index + 1).padStart(2, '0')),
        // a button, not a link: it opens the details here, the links to leave are inside
        el('h3', {}, el('button', { type: 'button', className: 'open', onclick: () => openProject(project) }, p.name), status),
        el('p', { className: 'tagline' }, p.tagline),
        stackLine(p.stack),
      ),
    ),
  );
  // cards in the same row come in one after the other instead of all at once
  item.style.setProperty('--delay', `${(index % 3) * 0.08}s`);
  return item;
}

function moreItem(project) {
  return el(
    'li',
    { className: 'reveal' },
    el(
      'a',
      { href: project.repo, target: '_blank', rel: 'noopener' },
      el('strong', {}, project.name),
      el('span', {}, lang === 'pt' ? project.whatPt : project.what),
      el('small', {}, project.stack),
    ),
  );
}

// the address that opens this project directly, to paste in a message. The words come back
// after a moment, and the status line says it for screen readers
function copyLink(project) {
  const button = el('button', { type: 'button', className: 'button ghost' }, t('copyLink'));
  const said = el('span', { className: 'sr-only', role: 'status' });
  button.addEventListener('click', async () => {
    const url = `${location.origin}${location.pathname}${lang === 'pt' ? '?lang=pt' : ''}#${project.id}`;
    try {
      await navigator.clipboard.writeText(url);
      button.textContent = t('copied');
      said.textContent = t('copied');
      setTimeout(() => {
        button.textContent = t('copyLink');
        said.textContent = '';
      }, 2000);
    } catch {
      // no clipboard (an old browser, or not allowed): the address bar has the same link
    }
  });
  return el('span', {}, button, said);
}

// the details of one project, in a <dialog>: the browser already handles Esc, keeps the
// focus inside and gives it back to the card when it closes
const dialog = document.getElementById('project-dialog');
let shown = null;

function openProject(project, { push = true } = {}) {
  shown = project;
  const p = local(project);
  const links = el(
    'div',
    { className: 'actions' },
    p.live ? el('a', { className: 'button', href: p.live, target: '_blank', rel: 'noopener' }, t('live')) : null,
    el('a', { className: 'button ghost', href: p.repo, target: '_blank', rel: 'noopener' }, t('code')),
    copyLink(project),
  );
  dialog.querySelector('.dialog-body').replaceChildren(
    el('img', { src: p.image, alt: p.alt, width: 1280, height: 720 }),
    el(
      'div',
      { className: 'dialog-text' },
      el('h2', { id: 'dialog-title' }, p.name, p.status ? el('span', { className: 'status' }, `[${t(p.status)}]`) : null),
      el('p', { className: 'tagline' }, p.tagline),
      el('p', {}, p.description),
      el('h3', {}, t('interesting')),
      el('ul', { className: 'highlights' }, ...p.highlights.map((h) => el('li', {}, h))),
      stackLine(p.stack),
      // only the ones on Render's free plan sleep; GitHub Pages answers right away
      p.live?.includes('onrender.com') ? el('p', { className: 'note' }, t('wakeUp')) : null,
      links,
    ),
  );
  // #trail in the address opens trail directly, so a project can be shared
  if (push && location.hash !== `#${project.id}`) history.pushState(null, '', `${location.search}#${project.id}`);
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
}

dialog.addEventListener('close', () => {
  shown = null;
  if (FEATURED.some((p) => `#${p.id}` === location.hash)) history.pushState(null, '', location.pathname + location.search);
});
// a click on the dark area around the box closes it
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

function fromAddress() {
  const project = FEATURED.find((p) => `#${p.id}` === location.hash);
  if (project) openProject(project, { push: false });
  else if (dialog.open) dialog.close();
}
addEventListener('popstate', fromAddress);

// filter by what it's made with. Hidden cards leave the grid, and the ones that stay slide
// into their new place (the FLIP trick: measure, change, then animate from the old spot)
const grid = document.getElementById('project-grid');
const count = document.getElementById('filter-count');
let current = 'all';
const buttons = TAGS.map(([tag]) => el('button', { type: 'button', dataset: { tag }, onclick: () => filter(tag) }));

function filter(tag, { animate = true } = {}) {
  current = tag;
  const items = [...grid.children];
  const before = new Map(items.map((li) => [li, li.getBoundingClientRect()]));
  let visible = 0;
  for (const li of items) {
    const match = tag === 'all' || li.dataset.tags.split(' ').includes(tag);
    li.hidden = !match;
    if (match) visible++;
  }
  buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tag === tag)));
  count.textContent = tag === 'all' ? '' : t('shownOf')(visible, items.length);
  if (!animate || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (const li of items) {
    if (li.hidden) continue;
    const old = before.get(li);
    const now = li.getBoundingClientRect();
    const was = old.width ? old : null;
    li.animate(
      was
        ? [{ transform: `translate(${was.left - now.left}px, ${was.top - now.top}px)` }, { transform: 'none' }]
        : [{ opacity: 0, transform: 'scale(0.96)' }, { opacity: 1, transform: 'none' }],
      { duration: 380, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
    );
    // a card that comes back after the scroll animation already ran shouldn't stay invisible
    li.classList.add('in');
  }
}

// reveal on scroll: each element animates once, the first time it shows up
const reveal = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('in');
      reveal.unobserve(entry.target);
    }
  },
  { rootMargin: '0px 0px -8% 0px' },
);

// everything that has words: the fixed text marked with data-i18n, the cards, the list, the
// filter and an open project. Switching language redraws it in place, without animating again
function render({ first = false } = {}) {
  const words = UI[lang];
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  document.title = words.title;
  document.querySelector('meta[name=description]').content = words.description;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    node.textContent = words[node.dataset.i18n];
  });
  document.querySelectorAll('[data-i18n-label]').forEach((node) => {
    node.setAttribute('aria-label', words[node.dataset.i18nLabel]);
  });
  const toggle = document.getElementById('lang');
  toggle.textContent = words.langButton;
  toggle.setAttribute('aria-label', words.langLabel);
  toggle.lang = lang === 'pt' ? 'en' : 'pt';

  TAGS.forEach(([, en, pt], i) => {
    buttons[i].textContent = lang === 'pt' ? pt : en;
  });
  // the cards that already slid in stay put; the ones still below wait for the scroll
  const moreList = document.getElementById('more-list');
  const seen = (list) => !first && list.firstElementChild?.classList.contains('in');
  const [cardsSeen, moreSeen] = [seen(grid), seen(moreList)];
  const cards = FEATURED.map(card);
  const more = MORE.map(moreItem);
  grid.replaceChildren(...cards);
  moreList.replaceChildren(...more);
  cards.forEach((node) => (cardsSeen ? node.classList.add('in') : reveal.observe(node)));
  more.forEach((node) => (moreSeen ? node.classList.add('in') : reveal.observe(node)));
  filter(current, { animate: false });
  if (shown) openProject(shown, { push: false });
}

document.getElementById('filters').append(...buttons);
document.getElementById('lang').addEventListener('click', () => {
  lang = lang === 'pt' ? 'en' : 'pt';
  try {
    localStorage.setItem('lang', lang);
  } catch {
    // nothing to do, it just won't be remembered
  }
  // a ?lang= in the address would win on the next visit, so it follows the switch
  if (new URLSearchParams(location.search).has('lang')) {
    history.replaceState(null, '', `?lang=${lang}${location.hash}`);
  }
  render();
});

render({ first: true });
fromAddress();
document.querySelectorAll('.reveal').forEach((node) => reveal.observe(node));

// the progress line and the header border both read the scroll, so one listener updates
// them once per frame
const root = document.documentElement;
const header = document.querySelector('.top');
let queued = false;
function onScroll() {
  queued = false;
  const max = root.scrollHeight - innerHeight;
  root.style.setProperty('--progress', max > 0 ? (scrollY / max).toFixed(4) : '0');
  header.classList.toggle('scrolled', scrollY > 8);
}
addEventListener('scroll', () => {
  if (!queued) {
    queued = true;
    requestAnimationFrame(onScroll);
  }
}, { passive: true });
onScroll();

// the menu link of the section on screen gets underlined
const links = new Map([...document.querySelectorAll('nav a')].map((a) => [a.getAttribute('href').slice(1), a]));
const spy = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach((a) => a.classList.remove('active'));
      links.get(entry.target.id)?.classList.add('active');
    }
  },
  { rootMargin: '-45% 0px -50% 0px' },
);
document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));
