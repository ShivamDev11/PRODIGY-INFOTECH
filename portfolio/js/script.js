// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and effects
    initTypingEffect();
    initScrollAnimations();
    initSkillAnimations();
    initNavbarEffects();
    initContactForm();
    initCertificateAnimations();
});

// Typing Effect
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const texts = [
        "Full Stack Developer",
        "Web Designer",
        "UI/UX Enthusiast",
        "Problem Solver"
    ];
    
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    let isDeleting = false;
    
    function type() {
        currentText = texts[count];
        
        if (isDeleting) {
            letter = currentText.substring(0, index - 1);
            index--;
        } else {
            letter = currentText.substring(0, index + 1);
            index++;
        }
        
        typingElement.textContent = letter;
        
        let typeSpeed = 100;
        
        if (isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!isDeleting && index === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && index === 0) {
            isDeleting = false;
            count = (count + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add specific animations based on element
                if (entry.target.classList.contains('skill-item')) {
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.animation = `skillPop 0.6s ease ${delay}ms both`;
                    }, delay);
                }
                
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease both';
                }
                
                if (entry.target.classList.contains('certificate-card')) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease both';
                }
            }
        });
    }, observerOptions);

    // Observe all elements that should animate on scroll
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('.skill-item').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('.project-card').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('.certificate-card').forEach(el => {
        observer.observe(el);
    });
}

// Skill Animations
function initSkillAnimations() {
    const skills = document.querySelectorAll('.skill-item');
    
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.1)';
            this.style.boxShadow = `0 15px 40px ${getRandomNeonColor()}`;
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
        skill.addEventListener('click', function() {
            const skillName = this.getAttribute('data-skill');
            showSkillPopup(skillName);
        });
    });
}

function getRandomNeonColor() {
    const colors = [
        'rgba(0, 243, 255, 0.5)',
        'rgba(255, 0, 255, 0.5)',
        'rgba(57, 255, 20, 0.5)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function showSkillPopup(skillName) {
    // Remove existing popup if any
    const existingPopup = document.querySelector('.skill-popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'skill-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h3>${skillName}</h3>
            <p>Expert level proficiency in ${skillName}. Extensive experience in modern development practices and frameworks.</p>
            <div class="skill-level">
                <div class="level-bar">
                    <div class="level-progress" style="width: ${getSkillLevel(skillName)}%"></div>
                </div>
                <span class="level-text">${getSkillLevel(skillName)}% Mastery</span>
            </div>
            <button class="btn btn-neon close-popup">Close</button>
        </div>
    `;
    
    // Style the popup
    popup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(10px);
    `;
    
    const content = popup.querySelector('.popup-content');
    content.style.cssText = `
        background: linear-gradient(135deg, var(--darker-bg) 0%, #111 100%);
        padding: 2rem;
        border-radius: 15px;
        border: 2px solid var(--neon-blue);
        box-shadow: 0 0 30px var(--neon-blue);
        max-width: 400px;
        width: 90%;
        text-align: center;
        position: relative;
        animation: zoomIn 0.3s ease;
    `;

    // Add level bar styles
    const levelBarStyle = document.createElement('style');
    levelBarStyle.textContent = `
        .skill-level {
            margin: 1.5rem 0;
        }
        .level-bar {
            background: rgba(255, 255, 255, 0.1);
            height: 10px;
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 0.5rem;
        }
        .level-progress {
            height: 100%;
            background: linear-gradient(90deg, var(--neon-blue), var(--neon-green));
            border-radius: 5px;
            transition: width 1s ease;
        }
        .level-text {
            color: var(--neon-blue);
            font-size: 0.9rem;
        }
    `;
    document.head.appendChild(levelBarStyle);
    
    document.body.appendChild(popup);
    
    // Close popup events
    const closeBtn = popup.querySelector('.close-popup');
    closeBtn.addEventListener('click', () => {
        popup.remove();
        levelBarStyle.remove();
    });
    
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.remove();
            levelBarStyle.remove();
        }
    });
}

function getSkillLevel(skillName) {
    const levels = {
        'HTML5': 95,
        'CSS3': 90,
        'JavaScript': 88,
        'PHP': 85,
        'Python': 82,
        'React': 80,
        'Bootstrap': 92,
        'MySQL': 78,
        'SQLite': 75,
        'OOP': 85,
        'Wix': 88
    };
    return levels[skillName] || 75;
}

// Navbar Effects
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 243, 255, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name') || this.querySelector('input[type="text"]').value;
            const email = formData.get('email') || this.querySelector('input[type="email"]').value;
            const subject = formData.get('subject') || this.querySelectorAll('input[type="text"]')[1].value;
            const message = formData.get('message') || this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields!', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address!', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully!', 'success');
            this.reset();
            
            // Add sending animation
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--neon-green)' : 'var(--neon-pink)'};
        color: var(--dark-bg);
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px ${type === 'success' ? 'var(--neon-green)' : 'var(--neon-pink)'};
        z-index: 1001;
        animation: slideInRight 0.3s ease;
        font-weight: bold;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Certificate Animations
function initCertificateAnimations() {
    const certificates = document.querySelectorAll('.certificate-card');
    
    certificates.forEach(cert => {
        cert.addEventListener('mouseenter', function() {
            const img = this.querySelector('.certificate-img img');
            if (img) {
                img.style.transform = 'scale(1.1) rotate(2deg)';
            }
        });
        
        cert.addEventListener('mouseleave', function() {
            const img = this.querySelector('.certificate-img img');
            if (img) {
                img.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        cert.addEventListener('click', function() {
            const certTitle = this.querySelector('h3').textContent;
            const certDesc = this.querySelector('p').textContent;
            showCertificateModal(certTitle, certDesc, this.querySelector('img').src);
        });
    });
}

function showCertificateModal(title, description, imageSrc) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.certificate-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-image">
                <img src="${imageSrc}" alt="${title}">
            </div>
            <div class="modal-info">
                <h3>${title}</h3>
                <p>${description}</p>
                <button class="btn btn-neon view-certificate">View Full Certificate</button>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(10px);
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, var(--darker-bg) 0%, #111 100%);
        border: 2px solid var(--neon-blue);
        box-shadow: 0 0 50px var(--neon-blue);
        border-radius: 15px;
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        animation: zoomIn 0.3s ease;
    `;
    
    // Add modal styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .close-modal {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 2rem;
            color: var(--neon-blue);
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 1;
        }
        .close-modal:hover {
            color: var(--neon-pink);
            transform: scale(1.2);
        }
        .modal-image {
            width: 100%;
            padding: 2rem;
            text-align: center;
        }
        .modal-image img {
            max-width: 100%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .modal-info {
            padding: 0 2rem 2rem 2rem;
            text-align: center;
        }
        .modal-info h3 {
            color: var(--neon-blue);
            margin-bottom: 1rem;
        }
        .view-certificate {
            margin-top: 1rem;
        }
    `;
    document.head.appendChild(modalStyle);
    
    document.body.appendChild(modal);
    
    // Close modal events
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
        modalStyle.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            modalStyle.remove();
        }
    });
    
    const viewBtn = modal.querySelector('.view-certificate');
    viewBtn.addEventListener('click', () => {
        window.open(imageSrc, '_blank');
    });
}

// Add CSS animations dynamically
function addDynamicStyles() {
    const styles = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes zoomIn {
            from {
                transform: scale(0.8);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        .nav-link.active {
            color: var(--neon-blue) !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// Initialize dynamic styles
addDynamicStyles();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loaded class style
    const loadedStyle = document.createElement('style');
    loadedStyle.textContent = `
        body.loaded .home-section {
            animation: fadeIn 1s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(loadedStyle);
});

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initTypingEffect,
        initScrollAnimations,
        initSkillAnimations,
        initNavbarEffects,
        initContactForm
    };
}