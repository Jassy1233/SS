  document.addEventListener("DOMContentLoaded", () => {
  // Variables para el slider
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.slide-indicator');
  const prevBtn = document.querySelector('.nav-arrow.left');
  const nextBtn = document.querySelector('.nav-arrow.right');
  let currentSlide = 0;
  let slideInterval;
  const intervalTime = 5000; 

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startSlideInterval() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  function pauseSlideInterval() {
    clearInterval(slideInterval);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      prevSlide();
      pauseSlideInterval();
      startSlideInterval(); 
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      nextSlide();
      pauseSlideInterval();
      startSlideInterval(); 
    });
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
      showSlide(index);
      pauseSlideInterval();
      startSlideInterval(); 
    });
  });

  const sliderWrapper = document.querySelector('.slider-wrapper');
  if (sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', pauseSlideInterval);
    sliderWrapper.addEventListener('mouseleave', startSlideInterval);
  }

  startSlideInterval();

  const floatingElements = document.querySelectorAll('.floating-element');
  
  floatingElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 1.5}s`;
  });

  const heroText = document.querySelector('.hero-text');
  const testimonial = document.querySelector('.testimonial');

  function fadeInOnScroll() {
    const elements = [heroText, testimonial, ...document.querySelectorAll('.hero-benefits li')];
    
    elements.forEach((element, index) => {
      if (element && isElementInViewport(element)) {
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, index * 200);
      }
    });
  }

  fadeInOnScroll();
  });