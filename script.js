// Lead Monster Marketing Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initNavigation();
    initContactForm();
    initScrollAnimations();
    
    // Add active class to current page in navigation
    highlightCurrentPage();
});

// Navigation functionality
function initNavigation() {
    // For mobile navigation (to be implemented if needed)
    const logo = document.querySelector('.logo');
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll event listener for header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            header.style.background = '#fff';
        }
    });
}

// Contact form validation and submission
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;
        
        if (!name.value.trim()) {
            highlightError(name, 'Please enter your name');
            isValid = false;
        } else {
            removeError(name);
        }
        
        if (!email.value.trim()) {
            highlightError(email, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            highlightError(email, 'Please enter a valid email address');
            isValid = false;
        } else {
            removeError(email);
        }
        
        if (!message.value.trim()) {
            highlightError(message, 'Please enter your message');
            isValid = false;
        } else {
            removeError(message);
        }
        
        if (isValid) {
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate API call with timeout
            setTimeout(function() {
                submitButton.textContent = 'Message Sent!';
                contactForm.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.style.color = '#28a745';
                successMessage.style.padding = '15px';
                successMessage.style.marginTop = '20px';
                successMessage.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
                successMessage.style.borderRadius = '5px';
                successMessage.style.textAlign = 'center';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                
                contactForm.appendChild(successMessage);
                
                // Reset button after 3 seconds
                setTimeout(function() {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                    
                    // Remove success message after 5 seconds
                    setTimeout(function() {
                        successMessage.remove();
                    }, 5000);
                }, 3000);
            }, 1500);
        }
    });
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to highlight form errors
function highlightError(element, message) {
    element.style.borderColor = '#dc3545';
    
    // Check if error message already exists
    let errorElement = element.parentElement.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#dc3545';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '5px';
        element.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

// Helper function to remove form errors
function removeError(element) {
    element.style.borderColor = '#ddd';
    
    const errorElement = element.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Add scroll animations
function initScrollAnimations() {
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .value-card, .team-member');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animateElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
}

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    
    document.querySelectorAll('.nav a').forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (currentPage === linkPage || 
            (currentPage === '' && linkPage === 'index.html') || 
            (currentPage === '/' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}