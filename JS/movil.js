document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const body = document.querySelector('body');

  // Toggle del menú
  hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    this.classList.toggle('is-active');
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', function(event) {
    if (!event.target.closest('nav') && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('is-active');
    }
  });

  // Cerrar menú al hacer click en un enlace
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('is-active');
    });
  });
});