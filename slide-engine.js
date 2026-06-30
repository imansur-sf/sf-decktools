/* ─────────────────────────────────────────────────────────────
   SLIDE ENGINE — keyboard / button / dot nav for SF Decktools.
   Expects in the DOM:
     <div class="slide-deck"> containing N <div class="slide">
     <div class="section-label" id="section-label"></div>
     <div class="slide-dots" id="dots"></div>
     <div class="slide-controls">
       <button class="slide-btn" id="prev">←</button>
       <span class="slide-counter" id="counter">1 / N</span>
       <button class="slide-btn" id="next">→</button>
     </div>
     [optional] <div class="progress-bar" id="progress"></div>
   First slide should carry the .active class.
   ───────────────────────────────────────────────────────────── */
(function () {
  const slides = document.querySelectorAll('.slide');
  if (!slides.length) return;

  const dotsEl       = document.getElementById('dots');
  const counterEl    = document.getElementById('counter');
  const prevBtn      = document.getElementById('prev');
  const nextBtn      = document.getElementById('next');
  const sectionLabel = document.getElementById('section-label');
  const progressEl   = document.getElementById('progress');

  let current = 0;

  // Build dots
  if (dotsEl) {
    slides.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => go(i));
      dotsEl.appendChild(d);
    });
  }

  function go(n) {
    slides[current].classList.remove('active');
    if (dotsEl) dotsEl.children[current]?.classList.remove('active');

    current = Math.max(0, Math.min(n, slides.length - 1));

    slides[current].classList.add('active');
    slides[current].scrollTop = 0;
    if (dotsEl)        dotsEl.children[current]?.classList.add('active');
    if (counterEl)     counterEl.textContent = (current + 1) + ' / ' + slides.length;
    if (sectionLabel)  sectionLabel.textContent = slides[current].dataset.section || '';
    if (prevBtn)       prevBtn.disabled = current === 0;
    if (nextBtn)       nextBtn.disabled = current === slides.length - 1;
    if (progressEl)    progressEl.style.width = ((current + 1) / slides.length * 100) + '%';
  }

  if (prevBtn) prevBtn.addEventListener('click', () => go(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => go(current + 1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault(); go(current + 1);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault(); go(current - 1);
    }
  });

  // Touch swipe
  let touchStartX = 0;
  document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1));
  }, { passive: true });

  // Initial state
  go(0);
})();
