import { FEATURED, MORE } from './projects.js';

document.documentElement.classList.add('js');

const el = (tag, props = {}, ...children) => {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children.filter((c) => c !== null && c !== undefined));
  return node;
};

function card(project, index) {
  const chips = el('ul', { className: 'chips' }, ...project.stack.map((s) => el('li', {}, s)));
  const status = project.status ? el('span', { className: 'status' }, project.status) : null;
  const img = el('img', { src: project.image, alt: project.alt, loading: 'lazy', decoding: 'async', width: 1280, height: 720 });
  const item = el(
    'li',
    { className: 'reveal' },
    el(
      'article',
      { className: 'card' },
      status,
      el('div', { className: 'shot' }, img),
      el(
        'div',
        { className: 'body' },
        // a button, not a link: it opens the details here, the links to leave are inside
        el('h3', {}, el('button', { type: 'button', className: 'open', onclick: () => openProject(project) }, project.name)),
        el('p', { className: 'tagline' }, project.tagline),
        chips,
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
      el('span', {}, project.what),
      el('small', {}, project.stack),
    ),
  );
}

// the details of one project, in a <dialog>: the browser already handles Esc, keeps the
// focus inside and gives it back to the card when it closes
const dialog = document.getElementById('project-dialog');

function openProject(project, { push = true } = {}) {
  const links = el(
    'div',
    { className: 'actions' },
    project.live ? el('a', { className: 'button', href: project.live, target: '_blank', rel: 'noopener' }, 'Open it live') : null,
    el('a', { className: 'button ghost', href: project.repo, target: '_blank', rel: 'noopener' }, 'Code on GitHub'),
  );
  dialog.querySelector('.dialog-body').replaceChildren(
    el('img', { src: project.image, alt: project.alt, width: 1280, height: 720 }),
    el(
      'div',
      { className: 'dialog-text' },
      el('h2', { id: 'dialog-title' }, project.name, project.status ? el('span', { className: 'status' }, project.status) : null),
      el('p', { className: 'tagline' }, project.tagline),
      el('p', {}, project.description),
      el('h3', {}, 'What was interesting'),
      el('ul', { className: 'highlights' }, ...project.highlights.map((h) => el('li', {}, h))),
      el('ul', { className: 'chips' }, ...project.stack.map((s) => el('li', {}, s))),
      // only the ones on Render's free plan sleep; GitHub Pages answers right away
      project.live?.includes('onrender.com') ? el('p', { className: 'note' }, 'The live site may take about 30 seconds to wake up.') : null,
      links,
    ),
  );
  // #trail in the address opens trail directly, so a project can be shared
  if (push && location.hash !== `#${project.id}`) history.pushState(null, '', `#${project.id}`);
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
}

dialog.addEventListener('close', () => {
  if (FEATURED.some((p) => `#${p.id}` === location.hash)) history.pushState(null, '', location.pathname);
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

document.getElementById('project-grid').append(...FEATURED.map(card));
fromAddress();
document.getElementById('more-list').append(...MORE.map(moreItem));

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
document.querySelectorAll('.reveal').forEach((node) => reveal.observe(node));

// the progress line, the header border and the parallax of the hero all read the scroll,
// so one listener updates them once per frame
const root = document.documentElement;
const header = document.querySelector('.top');
let queued = false;
function onScroll() {
  queued = false;
  const max = root.scrollHeight - innerHeight;
  root.style.setProperty('--progress', max > 0 ? (scrollY / max).toFixed(4) : '0');
  root.style.setProperty('--scroll', String(Math.min(scrollY, 1200)));
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
