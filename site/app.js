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
        el('h3', {}, el('a', { href: project.live ?? project.repo, target: '_blank', rel: 'noopener' }, project.name)),
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

document.getElementById('project-grid').append(...FEATURED.map(card));
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
