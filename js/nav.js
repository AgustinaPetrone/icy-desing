
  
  // DOMContentLoaded para asegurar que el HTML ya existe
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');
  
    btn.addEventListener('click', () => {
      nav.classList.toggle('open');
      // Animar icono hamburguesa (opcional)
      btn.classList.toggle('active');
    });
  });