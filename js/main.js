/* Ktisis Interiors — interactions
   GSAP + ScrollTrigger drive the scroll-linked pieces; Lenis smooths the scroll.
   Everything degrades: no JS → static page; reduced motion → final states. */

(() => {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  gsap.registerPlugin(ScrollTrigger);

  /* ------------------------------------------------------------------ */
  /* Smooth scroll                                                       */
  /* ------------------------------------------------------------------ */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  // Anchor links go through Lenis so pinned sections are accounted for.
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = $(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      closeMenu();
      if (lenis) lenis.scrollTo(target, { offset: -70, duration: 1.4 });
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ------------------------------------------------------------------ */
  /* Split headlines into words → inner spans for masked reveals         */
  /* ------------------------------------------------------------------ */
  $$('[data-split]').forEach((el) => {
    el.innerHTML = el.textContent
      .trim()
      .split(/\s+/)
      .map((w) => `<span class="w"><i>${w}</i></span>`)
      .join(' ');
  });

  /* ------------------------------------------------------------------ */
  /* Preloader → hero intro                                              */
  /* ------------------------------------------------------------------ */
  const hero = $('#hero');
  const intro = gsap.timeline({ paused: true });
  intro
    .to('.hero__img', { scale: 1, duration: 2.4, ease: 'power2.out' }, 0)
    .to('.hero__title .w > i', { y: 0, duration: 1.1, ease: 'power4.out', stagger: 0.06 }, 0.1)
    .to('#hero .reveal-up', { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.12 }, 0.4)
    .to('#lightswitch', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.9)
    .to('.wa', { scale: 1, duration: 0.6, ease: 'back.out(2)' }, 1.1);

  const pre = $('#preloader');
  if (reduce || !pre) {
    pre?.remove();
    intro.progress(1);
  } else {
    document.body.style.overflow = 'hidden';
    gsap
      .timeline({
        onComplete() {
          document.body.style.overflow = '';
          pre.remove();
          intro.play();
        },
      })
      .to('.preloader__word span', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.05 })
      .to('.preloader__line i', { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, 0.2)
      .to(pre, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '+=0.15');
  }

  // Hero parallax on scroll
  if (!reduce) {
    gsap.to('.hero__media', {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('.hero__content', {
      yPercent: -10,
      opacity: 0.2,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: '30% top', end: 'bottom top', scrub: true },
    });
  }

  // Light switch
  $('#lightswitch')?.addEventListener('click', function () {
    const lit = hero.classList.toggle('is-lit');
    this.setAttribute('aria-pressed', String(lit));
    $('.lightswitch__label', this).textContent = lit ? 'Lights on' : 'Turn on the lights';
  });

  /* ------------------------------------------------------------------ */
  /* Nav                                                                 */
  /* ------------------------------------------------------------------ */
  const nav = $('#nav');
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => nav.classList.toggle('is-solid', self.scroll() > 80),
  });
  const burger = $('#burger');
  const menu = $('#menu');
  $$('a', menu).forEach((a, i) => a.style.setProperty('--i', i));
  function closeMenu() {
    burger.classList.remove('is-open');
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
  });

  /* ------------------------------------------------------------------ */
  /* Section headline reveals                                            */
  /* ------------------------------------------------------------------ */
  $$('[data-split]').forEach((el) => {
    if (el.closest('#hero')) return;
    gsap.to($$('.w > i', el), {
      y: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.05,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
  $$('.lead, .steps, .finishes, .contact__meta').forEach((el) => {
    gsap.from(el, { opacity: 0, y: 24, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });

  /* ------------------------------------------------------------------ */
  /* Apartment walkthrough — first-person camera through CSS-3D rooms    */
  /* ------------------------------------------------------------------ */
  const stage = $('#tourStage');
  if (stage) {
    const world = $('#tourWorld');
    const rooms = $$('.room', world);
    const caption = $('#tourCaption');
    const man = $('#tourMan');
    const path = $('#tourPath');
    const pathLen = path.getTotalLength();
    const mapRooms = $$('#tourMap rect');
    const captions = {
      entry: ['00', 'Welcome home', 'Scroll to open the door and walk through a Ktisis 2 BHK.'],
      living: ['01', 'Living room', 'Built-in TV wall with display niches, cove-lit false ceiling and concealed wiring.'],
      bed: ['02', 'Bedroom 1', 'Headboard wall with wall lamps, bedside units and full-height wardrobes built to the room.'],
      kitchen: ['03', 'Kitchen & dining', 'Handleless modular kitchen with a breakfast island, bar seating and task lighting.'],
    };

    // Geometry: rooms are stacked along -Z; each room owns its depth and door position.
    let W = 0;
    const layout = () => {
      W = stage.clientWidth;
      const H = stage.clientHeight;
      world.style.setProperty('--sw', `${W}px`);
      world.style.setProperty('--sh', `${H}px`);
      const mobile = W < 600; // portrait: wider doors, shorter rooms
      let z = 0;
      rooms.forEach((r) => {
        const d = Math.round(+r.dataset.depth * (mobile ? 0.7 : 1));
        r._z = z;
        r._d = d;
        r.style.setProperty('--d', `${d}px`);
        r.style.setProperty('--z', `${z}px`);
        if (r.dataset.door) {
          const dx = +r.dataset.door;
          const dw = mobile ? Math.max(+r.dataset.doorw, 0.44) : +r.dataset.doorw;
          const dh = mobile ? 0.58 : +r.dataset.doorh;
          const L = (dx - dw / 2) * 100, R = (dx + dw / 2) * 100, T = (1 - dh) * 100;
          $('.wall--back', r).style.clipPath =
            `polygon(0 0, 100% 0, 100% 100%, ${R}% 100%, ${R}% ${T}%, ${L}% ${T}%, ${L}% 100%, 0 100%)`;
          r.style.setProperty('--dl', `${L}%`);
          r.style.setProperty('--dw', `${dw * 100}%`);
          r.style.setProperty('--dh', `${dh * 100}%`);
          r._doorX = (dx - 0.5) * W;
          // Walking "through" = the wall scales up past the eye; drop it once the
          // doorway is wider than the viewport: s = p/(p - z) >= 1.05/dw.
          const persp = parseFloat(getComputedStyle(stage).perspective) || 900;
          r._hideZ = persp * (1 - dw / 1.05);
        } else {
          r._hideZ = 0;
        }
        z -= d;
      });
    };
    layout();
    ScrollTrigger.addEventListener('refreshInit', layout);

    const cam = { x: 0, z: 0 };
    let current = null;
    let walkTimer;
    const render = () => {
      // Head bob keyed to distance walked, so it reads as steps, not a wobble.
      const bob = reduce ? 0 : Math.sin(cam.z / 55) * 5;
      world.style.transform = `translate3d(${-cam.x}px, ${bob}px, ${-cam.z}px)`;
      rooms.forEach((r) => {
        const backZ = r._z - r._d;
        r.classList.toggle('is-passed', cam.z < backZ); // side planes now fully behind the eye
        r.style.visibility = cam.z < backZ - r._hideZ - 20 ? 'hidden' : '';
      });
      // Caption flips a few steps before an open-plan wall dissolves, so it matches what you see.
      const room = rooms.find((r) => cam.z <= r._z + 1 && cam.z > r._z - r._d + (r.dataset.door ? 0 : 320)) || rooms[rooms.length - 1];
      if (room !== current) {
        current = room;
        const [n, h, p] = captions[room.dataset.name];
        caption.classList.remove('is-switching');
        void caption.offsetWidth; // restart the caption animation
        caption.classList.add('is-switching');
        $('.tour__n', caption).textContent = n;
        $('h3', caption).textContent = h;
        $('p', caption).textContent = p;
        mapRooms.forEach((rc) => rc.classList.toggle('is-here', rc.dataset.room === room.dataset.name));
      }
    };

    if (reduce) {
      rooms.forEach((r) => r.style.setProperty('--lit', 1));
      $$('.door__panel', world).forEach((d) => (d.style.transform = 'rotateY(100deg)'));
      cam.z = rooms[1]._z - rooms[1]._d * 0.4;
      render();
    } else {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '#tour',
          start: 'top top',
          end: () => `+=${rooms.length * 1500}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            render();
            // minimap walker follows the route in step with scroll
            const pt = path.getPointAtLength(pathLen * self.progress);
            man.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
            man.classList.add('is-walking');
            clearTimeout(walkTimer);
            walkTimer = setTimeout(() => man.classList.remove('is-walking'), 180);
            $('#tourHint').style.opacity = self.progress > 0.03 ? 0 : 1;
          },
        },
      });

      rooms.forEach((r, i) => {
        const last = i === rooms.length - 1;
        const label = `room${i}`;
        tl.addLabel(label);
        // Lights come on as you step in.
        tl.to(r, { '--lit': 1, duration: 0.6, ease: 'power2.out' }, label);
        if (r.dataset.door && !last) {
          // Entrance: walk up to the front door, it swings away, step through.
          tl.to(cam, { z: () => r._z - r._d + 260, x: () => r._doorX, duration: 2 }, label);
          tl.to($('.door__panel', r), { rotateY: 100, duration: 0.9, ease: 'power2.inOut' }, `${label}+=1.1`);
          tl.to(cam, { z: () => r._z - r._d - r._hideZ - 60, duration: 0.9 }, `${label}+=2`);
          tl.to($('.door__panel', r), { opacity: 0, duration: 0.2 }, `${label}+=2.1`);
        } else if (!last) {
          // Open-plan rooms: walk to the far wall; it dissolves as you reach it
          // and the next room is already lit beyond.
          tl.to(cam, { z: () => r._z - r._d + 320, x: 0, duration: 2 }, label);
          tl.to($('.wall--back', r), { opacity: 0, duration: 0.7, ease: 'power2.in' }, `${label}+=1.5`);
          tl.to(rooms[i + 1], { '--lit': 1, duration: 0.6, ease: 'power2.out' }, `${label}+=1.5`);
          tl.to(cam, { z: () => r._z - r._d - 40, duration: 0.5 }, `${label}+=2`);
        } else {
          // Final room: walk to the island and settle in the middle.
          tl.to(cam, { z: () => r._z - r._d + 190, x: 0, duration: 2.2 }, label);
          tl.to({}, { duration: 0.5 });
        }
      });
      render();
    }
  }

  /* ------------------------------------------------------------------ */
  /* Kitchen showcase — scrubbed timeline                                */
  /* ------------------------------------------------------------------ */
  const steps = $$('#steps li');
  const setStep = (i) => steps.forEach((li, k) => li.classList.toggle('is-active', k === i));

  if ($('#kitchen')) {
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: {
        trigger: '#kitchen',
        start: isMobile ? 'top 70%' : 'top top',
        end: isMobile ? 'bottom 60%' : '+=2600',
        scrub: 1.2,
        pin: !isMobile,
        anticipatePin: 1,
        onUpdate(self) {
          const p = self.progress;
          setStep(p < 0.28 ? 0 : p < 0.5 ? 1 : p < 0.78 ? 2 : 3);
        },
      },
    });

    tl.addLabel('doors')
      .to('.k-uppers .k-door--l', { rotateY: -108, duration: 1.2, stagger: 0.12 }, 'doors')
      .to('.k-uppers .k-door--r', { rotateY: 108, duration: 1.2, stagger: 0.12 }, 'doors+=0.15')
      .addLabel('light', '>-0.3')
      .to('.k-glow', { opacity: 1, duration: 0.8 }, 'light')
      .to('.k-strip', { backgroundColor: '#f2c98a', boxShadow: '0 6px 24px rgba(255,200,120,.65)', duration: 0.8 }, 'light')
      .addLabel('drawers', '>')
      .to('.k-drawer', { z: 110, boxShadow: '0 30px 40px -10px rgba(0,0,0,.6)', duration: 1.2, stagger: 0.18 }, 'drawers')
      .to('.k-drawer i', { opacity: 1, duration: 0.5, stagger: 0.18 }, 'drawers+=0.2')
      .to('.k-base .k-door--l', { rotateY: -100, duration: 1 }, 'drawers+=0.3')
      .to('.k-base .k-door--r', { rotateY: 100, duration: 1 }, 'drawers+=0.45')
      .addLabel('cook', '>')
      .call(() => $('.k-hob').classList.add('is-on'), null, 'cook')
      .call(() => $('.k-oven').classList.add('is-on'), null, 'cook+=0.2')
      .to('.scene__hint', { opacity: 0, duration: 0.3 }, 'cook')
      .to({}, { duration: 0.8 });

    // Hob/oven switch off when scrolling back up past the cook label
    tl.eventCallback('onReverseComplete', () => {
      $('.k-hob').classList.remove('is-on');
      $('.k-oven').classList.remove('is-on');
    });
    ScrollTrigger.create({
      trigger: '#kitchen',
      start: 'top top',
      end: '+=2600',
      onUpdate(self) {
        if (self.progress < 0.78) {
          $('.k-hob').classList.remove('is-on');
          $('.k-oven').classList.remove('is-on');
        }
      },
    });
    setStep(0);

    // Finish picker
    const scene = $('#scene');
    $$('.swatch').forEach((b) => {
      b.addEventListener('click', () => {
        $$('.swatch').forEach((x) => x.classList.toggle('is-active', x === b));
        scene.dataset.finish = b.dataset.finish;
        gsap.fromTo('.k-door, .k-drawer', { filter: 'brightness(1.6)' }, { filter: 'brightness(1)', duration: 0.9, ease: 'power2.out', stagger: 0.03 });
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Service cards — reveal + 3D tilt                                    */
  /* ------------------------------------------------------------------ */
  gsap.from('.card', {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.1,
    scrollTrigger: { trigger: '.cards', start: 'top 80%', once: true },
  });
  if (finePointer && !reduce) {
    $$('[data-tilt]').forEach((card) => {
      const qx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3' });
      const qy = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3' });
      gsap.set(card, { transformPerspective: 900 });
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        qx(-py * 10);
        qy(px * 12);
      });
      card.addEventListener('pointerleave', () => { qx(0); qy(0); });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Render vs reality slider                                            */
  /* ------------------------------------------------------------------ */
  const ba = $('#ba');
  if (ba) {
    const range = $('#baRange');
    const set = (v) => ba.style.setProperty('--x', `${v}%`);
    range.addEventListener('input', () => set(range.value));
    // Nudge on first view so people notice it's draggable
    ScrollTrigger.create({
      trigger: ba,
      start: 'top 70%',
      once: true,
      onEnter() {
        if (reduce) return;
        const o = { v: 50 };
        gsap.timeline()
          .to(o, { v: 64, duration: 0.9, ease: 'power2.inOut', onUpdate: () => set(o.v) })
          .to(o, { v: 42, duration: 0.9, ease: 'power2.inOut', onUpdate: () => set(o.v) })
          .to(o, { v: 50, duration: 0.7, ease: 'power2.inOut', onUpdate: () => { set(o.v); range.value = o.v; } });
      },
    });
  }

  /* ------------------------------------------------------------------ */
  /* Process timeline — line draws, steps light up                       */
  /* ------------------------------------------------------------------ */
  const draw = $('#timelineDraw');
  if (draw) {
    gsap.to(draw, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: true },
    });
    $$('.tstep').forEach((s) => {
      gsap.from(s, { opacity: 0, x: -20, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: s, start: 'top 85%', once: true } });
      ScrollTrigger.create({ trigger: s, start: 'top 65%', end: 'bottom 40%', toggleClass: { targets: s, className: 'is-on' } });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Counters                                                            */
  /* ------------------------------------------------------------------ */
  $$('[data-count]').forEach((el) => {
    const end = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const plain = 'plain' in el.dataset; // years: no thousands separator
    const fmt = (n) => (plain ? String(Math.round(n)) : Math.round(n).toLocaleString('en-IN')) + suffix;
    if (reduce) { el.textContent = fmt(end); return; }
    const o = { v: 0 };
    gsap.to(o, {
      v: end,
      duration: 1.8,
      ease: 'power3.out',
      onUpdate: () => (el.textContent = fmt(o.v)),
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });

  /* ------------------------------------------------------------------ */
  /* Portfolio — pinned horizontal scroll (desktop)                      */
  /* ------------------------------------------------------------------ */
  const hs = $('#hscroll');
  if (hs && !window.matchMedia('(max-width: 900px)').matches && !reduce) {
    const dist = () => hs.scrollWidth - window.innerWidth;
    const tween = gsap.to(hs, {
      x: () => -dist(),
      ease: 'none',
      scrollTrigger: {
        trigger: '#portfolio',
        start: 'top top',
        end: () => `+=${dist()}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    // Inner image parallax, opposite to travel direction
    $$('.work img').forEach((img) => {
      gsap.fromTo(img, { xPercent: -6 }, {
        xPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: img.closest('.work'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Testimonials                                                        */
  /* ------------------------------------------------------------------ */
  const quotes = $$('.quote');
  const dots = $$('#quotesDots button');
  let qi = 0, qt;
  const showQuote = (i) => {
    qi = (i + quotes.length) % quotes.length;
    quotes.forEach((q, k) => q.classList.toggle('is-active', k === qi));
    dots.forEach((d, k) => d.classList.toggle('is-active', k === qi));
  };
  const autoQuotes = () => { clearInterval(qt); qt = setInterval(() => showQuote(qi + 1), 6000); };
  dots.forEach((d, i) => d.addEventListener('click', () => { showQuote(i); autoQuotes(); }));
  if (!reduce) autoQuotes();

  /* ------------------------------------------------------------------ */
  /* Contact → WhatsApp (no backend)                                     */
  /* ------------------------------------------------------------------ */
  const form = $('#form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      $$('[required]', form).forEach((f) => {
        const bad = !f.value.trim();
        f.closest('.field').classList.toggle('is-error', bad);
        if (bad) ok = false;
      });
      if (!ok) { gsap.fromTo(form, { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(1,0.3)' }); return; }
      const v = (id) => $(id, form).value.trim();
      const msg =
        `Hi Ktisis, I'd like a free site visit.\n` +
        `Name: ${v('#fname')}\nPhone: ${v('#fphone')}\n` +
        (v('#fcity') ? `Location: ${v('#fcity')}\n` : '') +
        `Project: ${v('#fscope')}`;
      window.open(`https://wa.me/919947386281?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      form.classList.add('is-done');
    });
  }

  /* ------------------------------------------------------------------ */
  /* Cursor + magnetic buttons (fine pointers only)                      */
  /* ------------------------------------------------------------------ */
  if (finePointer && !reduce) {
    const cur = $('#cursor');
    const dot = $('.cursor__dot', cur);
    const ring = $('.cursor__ring', cur);
    const dx = gsap.quickTo(dot, 'x', { duration: 0.08 });
    const dy = gsap.quickTo(dot, 'y', { duration: 0.08 });
    const rx = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3' });
    const ry = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3' });
    window.addEventListener('pointermove', (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); });
    $$('a, button, .swatch, .ba__range').forEach((el) => {
      el.addEventListener('pointerenter', () => cur.classList.add('is-hover'));
      el.addEventListener('pointerleave', () => cur.classList.remove('is-hover'));
    });
    $$('[data-magnetic]').forEach((el) => {
      const mx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
      const my = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        mx((e.clientX - (r.left + r.width / 2)) * 0.25);
        my((e.clientY - (r.top + r.height / 2)) * 0.25);
      });
      el.addEventListener('pointerleave', () => { mx(0); my(0); });
    });
  } else {
    $('#cursor')?.remove();
  }

  // Images/fonts loading can shift pin distances
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
