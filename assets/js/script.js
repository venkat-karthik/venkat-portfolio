'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }

/**
 * Scroll Animation Observer - Simplified
 */
document.addEventListener('DOMContentLoaded', () => {
  // Simple scroll animations only for stats cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Only animate stats cards on scroll
  const statsCards = document.querySelectorAll('.stats-card.animate-on-scroll');
  statsCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    observer.observe(card);
  });
});

/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});

/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});

/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {

    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) { elemToggleFunc(toggleBtns[i]); }
    elemToggleFunc(skillsBox);

  });
}

/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {

  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    localStorage.setItem("theme", "dark_theme");
  }

});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}

/**
 * Parallax Effect for Hero Section
 */
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.hero-banner');
  
  parallaxElements.forEach(element => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

/**
 * Enhanced Typewriter Animation for Hero Title
 */
function typeWriter(element, texts, speed = 100, deleteSpeed = 50, pauseTime = 2000) {
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      element.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = isDeleting ? deleteSpeed : speed;
    
    if (!isDeleting && charIndex === currentText.length) {
      // Pause at end of text
      typeSpeed = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  type();
}

// Initialize typewriter animation when page loads
window.addEventListener('load', () => {
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const texts = [
      'Full-Stack Developer',
      'Coding Club Co-ordinator', 
      'Tech Enthusiast',
      'Problem Solver'
    ];
    typeWriter(typewriterElement, texts, 120, 80, 2500);
  }
});

/**
 * Enhanced Button Hover Effects
 */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px) scale(1.05)';
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});
/**
 * WhatsApp Form Integration
 */
document.addEventListener('DOMContentLoaded', function() {
  const whatsappForm = document.getElementById('whatsapp-form');
  
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;
      
      // Create WhatsApp message
      const whatsappMessage = `Hi Venkat! 👋

*New Contact from Website:*

*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}

*Message:*
${message}

Looking forward to connecting with you!`;
      
      // Encode the message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      // WhatsApp number (from resume: +918309827125)
      const whatsappNumber = '918309827125';
      
      // Create WhatsApp URL
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Open WhatsApp
      window.open(whatsappURL, '_blank');
      
      // Optional: Reset form after submission
      whatsappForm.reset();
      
      // Show success message
      alert('Redirecting to WhatsApp! Please send the message to complete your inquiry.');
    });
  }
});

/**
 * Enhanced Tooltip Functionality for Skills and Tools
 */
document.addEventListener('DOMContentLoaded', function() {
  const skillCards = document.querySelectorAll('.skill-card');
  
  skillCards.forEach(card => {
    const tooltip = card.querySelector('.tooltip');
    
    card.addEventListener('mouseenter', function() {
      if (tooltip) {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
        tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
        tooltip.style.transform = 'translateX(-50%) translateY(0px)';
      }
    });
  });
});

/**
 * Smooth scrolling for hire me button
 */
document.addEventListener('DOMContentLoaded', function() {
  const hireMeBtn = document.querySelector('a[href="#contact"]');
  
  if (hireMeBtn) {
    hireMeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
});
/**
 * Portfolio Filter Functionality
 */
document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.6s ease-out';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
});

/**
 * Progress Bar Animation for Skills Page
 */
document.addEventListener('DOMContentLoaded', function() {
  const progressBars = document.querySelectorAll('.progress');
  
  const animateProgressBars = () => {
    progressBars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible && !bar.classList.contains('animated')) {
        bar.classList.add('animated');
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      }
    });
  };
  
  // Initial check
  animateProgressBars();
  
  // Check on scroll
  window.addEventListener('scroll', animateProgressBars);
});