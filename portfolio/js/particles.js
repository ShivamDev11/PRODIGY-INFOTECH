// Particles.js Configuration and Initialization
function initParticleEffect() {
    // Check if particles.js is already loaded
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#00f3ff', '#ff00ff', '#39ff14', '#ffeb3b']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00f3ff',
                    opacity: 0.4,
                    width: 1,
                    shadow: {
                        enable: true,
                        color: '#00f3ff',
                        blur: 5
                    }
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'bounce',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 200,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    } else {
        console.warn('Particles.js library not loaded');
        createCustomParticles();
    }
}

// Fallback custom particle system if particles.js is not available
function createCustomParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = Math.random() * 3 + 1;
            this.color = this.getRandomColor();
            this.alpha = Math.random() * 0.5 + 0.3;
        }

        getRandomColor() {
            const colors = ['#00f3ff', '#ff00ff', '#39ff14', '#ffeb3b'];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off walls
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            // Fade in and out
            this.alpha += (Math.random() - 0.5) * 0.02;
            this.alpha = Math.max(0.1, Math.min(0.8, this.alpha));
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Add glow effect
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.restore();
        }
    }

    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        drawConnections();

        requestAnimationFrame(animate);
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.save();
                    ctx.globalAlpha = (1 - distance / 150) * 0.4;
                    ctx.strokeStyle = '#00f3ff';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    
                    // Add glow to connections
                    ctx.shadowColor = '#00f3ff';
                    ctx.shadowBlur = 5;
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
    }

    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Start animation
    animate();
}

// Mouse trail effect
function initMouseTrail() {
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: #00f3ff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 10px #00f3ff, 0 0 20px #00f3ff;
        opacity: 0;
        transition: opacity 0.3s;
    `;
    document.body.appendChild(trail);

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        trail.style.opacity = '1';
    });

    function updateTrail() {
        // Smooth trail movement
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        trail.style.left = trailX - 5 + 'px';
        trail.style.top = trailY - 5 + 'px';
        
        requestAnimationFrame(updateTrail);
    }

    updateTrail();

    // Hide trail when mouse leaves window
    document.addEventListener('mouseleave', () => {
        trail.style.opacity = '0';
    });
}

// Floating elements animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Set random initial position and animation
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomDelay = Math.random() * 5;
        const randomDuration = 10 + Math.random() * 10;
        
        element.style.cssText += `
            animation: float ${randomDuration}s ease-in-out ${randomDelay}s infinite;
            left: ${randomX}%;
            top: ${randomY}%;
        `;
    });
}

// Add CSS for floating animation
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(10px, -15px) rotate(5deg);
        }
        50% {
            transform: translate(-5px, -25px) rotate(-5deg);
        }
        75% {
            transform: translate(-15px, -10px) rotate(3deg);
        }
    }
    
    .floating-element {
        position: absolute;
        pointer-events: none;
        z-index: 1;
        opacity: 0.3;
        font-size: 1.5rem;
    }
`;
document.head.appendChild(floatingStyle);

// Background gradient animation
function initBackgroundAnimation() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const gradient = document.createElement('div');
        gradient.className = 'animated-gradient';
        gradient.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, 
                rgba(0, 243, 255, 0.1) 0%, 
                rgba(255, 0, 255, 0.1) 25%, 
                rgba(57, 255, 20, 0.1) 50%, 
                rgba(255, 235, 59, 0.1) 75%, 
                rgba(0, 243, 255, 0.1) 100%);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            z-index: -1;
            pointer-events: none;
        `;
        section.style.position = 'relative';
        section.appendChild(gradient);
    });

    // Add gradient animation CSS
    const gradientStyle = document.createElement('style');
    gradientStyle.textContent = `
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(gradientStyle);
}

// Text reveal animation
function initTextReveal() {
    const revealElements = document.querySelectorAll('.reveal-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.3 });

    revealElements.forEach(el => observer.observe(el));
}

// Add text reveal CSS
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .reveal-text {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .reveal-text.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .reveal-text:nth-child(2) { transition-delay: 0.1s; }
    .reveal-text:nth-child(3) { transition-delay: 0.2s; }
    .reveal-text:nth-child(4) { transition-delay: 0.3s; }
    .reveal-text:nth-child(5) { transition-delay: 0.4s; }
`;
document.head.appendChild(revealStyle);

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add particles container to HTML
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles-js';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
    `;
    document.body.appendChild(particlesContainer);

    // Initialize all effects
    initParticleEffect();
    initMouseTrail();
    initBackgroundAnimation();
    initTextReveal();
    
    // Add some floating elements
    addFloatingElements();
});

// Add floating decorative elements
function addFloatingElements() {
    const shapes = ['💻', '🚀', '⭐', '🔮', '🎯', '⚡', '🌈', '🎨'];
    const container = document.body;
    
    for (let i = 0; i < 8; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.textContent = shapes[i];
        element.style.cssText += `
            color: ${getRandomNeonColor()};
            font-size: ${Math.random() * 2 + 1}rem;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        container.appendChild(element);
    }
    
    initFloatingElements();
}

function getRandomNeonColor() {
    const colors = ['#00f3ff', '#ff00ff', '#39ff14', '#ffeb3b'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initParticleEffect,
        initMouseTrail,
        initBackgroundAnimation,
        initTextReveal
    };
}