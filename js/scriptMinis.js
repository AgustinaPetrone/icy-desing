fetch('data/products.json')
  .then(r => r.json())
  .then(products => {
    const container = document.getElementById('mini-products-list');
    products.forEach((p) => {
      const images = (p.images && p.images.length) ? p.images : [p.image];

      const card = document.createElement('div');
      card.className = 'product';
      card.innerHTML = `
        <div class="carousel">
          <img class="carousel-img" src="${images[0]}" alt="${p.name}">
          <button class="carousel-btn prev" aria-label="Anterior">&#10094;</button>
          <button class="carousel-btn next" aria-label="Siguiente">&#10095;</button>
          <div class="dots">
            ${images.map((_, i) => `<span class="dot ${i===0?'active':''}" data-idx="${i}"></span>`).join('')}
          </div>
        </div>
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <strong>$${p.price}</strong>
      `;
      container.appendChild(card);

      // Lógica del carrusel por card
      const imgEl = card.querySelector('.carousel-img');
      const prev = card.querySelector('.prev');
      const next = card.querySelector('.next');
      const dots = card.querySelectorAll('.dot');
      const carousel = card.querySelector('.carousel');
      let idx = 0;

      function go(n) {
        idx = (n + images.length) % images.length;
        imgEl.src = images[idx];
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      }

      prev.addEventListener('click', () => go(idx - 1));
      next.addEventListener('click', () => go(idx + 1));
      dots.forEach(d => d.addEventListener('click', e => go(parseInt(e.target.dataset.idx))));

      // Swipe móvil
      let startX = 0;
      carousel.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
      carousel.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
      }, { passive: true });
    });
  });
