// Project Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.project-carousel');
  const prevBtn = document.querySelector('.carousel-nav.prev');
  const nextBtn = document.querySelector('.carousel-nav.next');
  
  if (!carousel) return;
  
  const scrollAmount = 380; // card width + gap
  
  // Next button
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
  }
  
  // Previous button
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
  }
  
  // Auto-scroll carousel
  let autoScrollInterval;
  
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 5000); // Auto-scroll every 5 seconds
  }
  
  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }
  
  // Start auto-scroll
  startAutoScroll();
  
  // Stop auto-scroll on hover
  carousel.addEventListener('mouseenter', stopAutoScroll);
  carousel.addEventListener('mouseleave', startAutoScroll);
  
  // Project card click handlers
  const projectCards = document.querySelectorAll('.project-hover-card');
  projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
      e.preventDefault();
      const projectId = this.dataset.project;
      window.open(`project-details.html?project=${projectId}`, '_blank');
    });
  });
});

// Honeycomb animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'scale(1)';
      }, index * 50);
    }
  });
}, observerOptions);

// Observe hexagons
document.addEventListener('DOMContentLoaded', () => {
  const hexagons = document.querySelectorAll('.hexagon');
  hexagons.forEach(hex => {
    hex.style.opacity = '0';
    hex.style.transform = 'scale(0.8)';
    hex.style.transition = 'all 0.4s ease';
    observer.observe(hex);
  });
});
