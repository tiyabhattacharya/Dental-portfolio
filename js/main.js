// ==========================================
// Precision Smile Dental Studio - Main JS
// ==========================================

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initNavigation();
    initHeroSlider();
    initScrollAnimations();
    initDriftingImages();
    initBeforeAfterSliders();
    initTestimonials();
    initFAQ();
    initContactForm();
    feather.replace();
});

// ==========================================
// Preloader
// ==========================================

function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1000);
    });
}

// ==========================================
// Navigation
// ==========================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ==========================================
// Hero Slider
// ==========================================

function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    let currentSlide = 0;
    let autoplayInterval;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
        startAutoplay();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
        startAutoplay();
    });
    
    startAutoplay();
    
    // GSAP Hero Animation
    gsap.from('.hero-label', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.3
    });
    
    gsap.from('.hero-title', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.5
    });
    
    gsap.from('.hero-description', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.7
    });
    
    gsap.from('.hero-actions .btn', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.9,
        stagger: 0.2
    });
    
    gsap.from('.trust-badges .badge', {
        opacity: 0,
        x: -30,
        duration: 0.6,
        delay: 1.2,
        stagger: 0.15
    });
}

// ==========================================
// Scroll Animations
// ==========================================

function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Section header animations
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8
        });
    });
    
    // Service cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: i * 0.1
        });
    });
    
    // Doctor cards
    gsap.utils.toArray('.doctor-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: i * 0.15
        });
    });
    
    // Gallery items
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            delay: i * 0.1
        });
    });
    
    // Why Choose Us - Slide animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.benefit-item').forEach(item => {
        observer.observe(item);
    });
}

// ==========================================
// Drifting Images (Parallax Effect)
// ==========================================

function initDriftingImages() {
    const driftImages = document.querySelectorAll('.drift-image');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        driftImages.forEach(image => {
            const speed = image.dataset.speed || 2;
            const yPos = -(scrollY * speed / 100);
            image.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ==========================================
// Before & After Sliders
// ==========================================

// ==========================================
// Before & After Sliders (ADVANCED VERSION - OPTION C)
// ==========================================

function initBeforeAfterSliders() {
    const sliders = document.querySelectorAll('.comparison-slider');

    sliders.forEach(slider => {
        const before = slider.querySelector('.comparison-before');
        const after = slider.querySelector('.comparison-after');
        const handle = slider.querySelector('.comparison-handle');

        let isDragging = false;

        // Add ripple animation for handle
        handle.style.boxShadow = "0 0 0 0 rgba(20,184,166,0.4)";
        setInterval(() => {
            handle.animate([
                { boxShadow: "0 0 0 0 rgba(20,184,166,0.5)" },
                { boxShadow: "0 0 0 12px rgba(20,184,166,0)", offset: 1 }
            ], {
                duration: 1800,
                easing: "ease-out"
            });
        }, 1600);

        // Add tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'slider-tooltip';
        tooltip.innerText = "Slide to compare";
        tooltip.style.position = 'absolute';
        tooltip.style.top = '10px';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.background = 'rgba(0,0,0,0.6)';
        tooltip.style.color = '#fff';
        tooltip.style.padding = '6px 12px';
        tooltip.style.fontSize = '12px';
        tooltip.style.borderRadius = '6px';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity .4s ease';
        slider.appendChild(tooltip);

        setTimeout(() => tooltip.style.opacity = '1', 700);
        setTimeout(() => tooltip.style.opacity = '0', 3000);

        // Auto animate slider from 0% → 50%
        setTimeout(() => {
            after.style.clipPath = `inset(0 50% 0 0)`;
            handle.style.left = `50%`;

            // Image parallax animation
            before.querySelector('img').style.transform = 'scale(1.03)';
            after.querySelector('img').style.transform = 'scale(1.03)';
            setTimeout(() => {
                before.querySelector('img').style.transform = 'scale(1)';
                after.querySelector('img').style.transform = 'scale(1)';
            }, 500);
        }, 200);

        // Smooth drag update
        function updateSlider(e) {
            const rect = slider.getBoundingClientRect();
            let x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;

            x = Math.max(0, Math.min(x, rect.width));
            const percentage = (x / rect.width) * 100;

            after.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
            handle.style.left = `${percentage}%`;

            // Parallax movement
            const parallax = (percentage - 50) / 50; // -1 to +1
            before.querySelector('img').style.transform = `translateX(${parallax * 5}px) scale(1.02)`;
            after.querySelector('img').style.transform = `translateX(${parallax * -5}px) scale(1.02)`;
        }

        const startDrag = e => {
            isDragging = true;
            slider.classList.add('active-drag');
            handle.style.transform = 'scale(1.1)';
            updateSlider(e);
        };

        const stopDrag = () => {
            if (!isDragging) return;
            isDragging = false;
            slider.classList.remove('active-drag');
            handle.style.transform = 'scale(1)';

            // Smooth reset of parallax
            before.querySelector('img').style.transform = 'scale(1)';
            after.querySelector('img').style.transform = 'scale(1)';
        };

        // Event listeners
        slider.addEventListener('mousedown', startDrag);
        slider.addEventListener('touchstart', startDrag);

        document.addEventListener('mousemove', e => { if (isDragging) updateSlider(e); });
        document.addEventListener('touchmove', e => { if (isDragging) updateSlider(e); });

        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);

        // Cursor styling
        slider.style.cursor = "ew-resize";
    });
}

// function initBeforeAfterSliders() {
//     const sliders = document.querySelectorAll('.comparison-slider');
    
//     sliders.forEach(slider => {
//         const before = slider.querySelector('.comparison-before');
//         const after = slider.querySelector('.comparison-after');
//         const handle = slider.querySelector('.comparison-handle');
//         let isDragging = false;
        
//         function updateSlider(e) {
//             const rect = slider.getBoundingClientRect();
//             let x = e.clientX - rect.left;
            
//             // Handle touch events
//             if (e.type.includes('touch')) {
//                 x = e.touches[0].clientX - rect.left;
//             }
            
//             // Clamp value between 0 and width
//             x = Math.max(0, Math.min(x, rect.width));
            
//             const percentage = (x / rect.width) * 100;
            
//             after.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
//             handle.style.left = `${percentage}%`;
//         }
        
//         slider.addEventListener('mousedown', (e) => {
//             isDragging = true;
//             updateSlider(e);
//         });
        
//         slider.addEventListener('touchstart', (e) => {
//             isDragging = true;
//             updateSlider(e);
//         });
        
//         document.addEventListener('mousemove', (e) => {
//             if (isDragging) {
//                 updateSlider(e);
//             }
//         });
        
//         document.addEventListener('touchmove', (e) => {
//             if (isDragging) {
//                 updateSlider(e);
//             }
//         });
        
//         document.addEventListener('mouseup', () => {
//             isDragging = false;
//         });
        
//         document.addEventListener('touchend', () => {
//             isDragging = false;
//         });
//     });
// }

// ==========================================
// Testimonials Carousel
// ==========================================

function initTestimonials() {
    const slider = document.getElementById('testimonialsSlider');
    const prevBtn = document.getElementById('testimonialsPrev');
    const nextBtn = document.getElementById('testimonialsNext');
    
    if (!slider) return;
    
    const scrollAmount = slider.querySelector('.testimonial-card').offsetWidth + 30;
    
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// FAQ Accordion
// ==========================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
            
            // Refresh feather icons
            feather.replace();
        });
    });
}

// ==========================================
// Contact Form
// ==========================================

let currentFormStep = 1;

function nextStep() {
    const step1 = document.querySelector('[data-step="1"]');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    if (!name || !email || !phone) {
        alert('Please fill in all required fields');
        return;
    }
    
    currentFormStep = 2;
    step1.classList.remove('active');
    document.querySelector('[data-step="2"]').classList.add('active');
}

function prevStep() {
    currentFormStep = 1;
    document.querySelector('[data-step="2"]').classList.remove('active');
    document.querySelector('[data-step="1"]').classList.add('active');
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Mock form submission (replace with real endpoint)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // For real implementation, use:
            // const response = await fetch('https://usebasin.com/f/YOUR_FORM_ID', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });
            
            // Show success message
            document.querySelector('.contact-form-wrapper form').style.display = 'none';
            document.getElementById('formSuccess').style.display = 'block';
            
            // Log to console (for demo purposes)
            console.log('Form submitted:', data);
            
        } catch (error) {
            alert('There was an error submitting your form. Please try again.');
            console.error('Form error:', error);
        }
    });
}

function resetForm() {
    document.getElementById('contactForm').reset();
    currentFormStep = 1;
    document.querySelector('[data-step="2"]').classList.remove('active');
    document.querySelector('[data-step="1"]').classList.add('active');
    document.querySelector('.contact-form-wrapper form').style.display = 'block';
    document.getElementById('formSuccess').style.display = 'none';
}

// ==========================================
// Smooth Scroll for Anchor Links
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Lazy Loading Images
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}