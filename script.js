// ============================================
// SISTEMA DE PARTÍCULAS Y CANVAS
// ============================================

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    addParticles(x, y, count = 5) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            this.particles.push({
                x: x || Math.random() * this.canvas.width,
                y: y || Math.random() * this.canvas.height,
                vx: Math.cos(angle) * (Math.random() * 2 + 1),
                vy: Math.sin(angle) * (Math.random() * 2 + 1),
                life: 1,
                maxLife: Math.random() * 2 + 1,
                size: Math.random() * 2 + 1,
                color: ['#ff1493', '#00d9ff', '#a855f7'][Math.floor(Math.random() * 3)]
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles = this.particles.filter(p => {
            p.life -= 1 / 60 / p.maxLife;
            return p.life > 0;
        });

        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // Gravedad

            const opacity = Math.max(0, p.life);
            this.ctx.globalAlpha = opacity;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// EFECTO PARALLAX EN SCROLL
// ============================================

class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax]');
        window.addEventListener('scroll', () => this.update());
    }

    update() {
        const scrollY = window.scrollY;
        this.elements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }
}

// ============================================
// CONTROL DE MÚSICA Y TRANSICIÓN
// ============================================

class MusicController {
    constructor() {
        this.audio = document.getElementById('bgMusic');
        this.isPlaying = false;
    }

    play() {
        if (!this.isPlaying) {
            this.audio.volume = 0.3;
            this.audio.play().catch(err => console.log('Auto-play bloqueado:', err));
            this.isPlaying = true;
        }
    }

    stop() {
        this.audio.pause();
        this.isPlaying = false;
    }

    fadeOut(duration = 2000) {
        return new Promise((resolve) => {
            const steps = duration / 50;
            const volumeStep = this.audio.volume / steps;
            const interval = setInterval(() => {
                this.audio.volume = Math.max(0, this.audio.volume - volumeStep);
                if (this.audio.volume <= 0) {
                    clearInterval(interval);
                    this.audio.pause();
                    resolve();
                }
            }, 50);
        });
    }
}

// ============================================
// EFECTOS DE ESTRELLAS FLOTANTES
// ============================================

function createFloatingStars() {
    const starfield = document.querySelector('.stars-container');
    if (!starfield) return;

    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.5 + 0.5;
        star.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`;
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
        starfield.appendChild(star);
    }
}

// ============================================
// CREACIÓN DE LUCES CAYENDO
// ============================================

function createFallingLights() {
    const container = document.querySelector('.falling-lights');
    if (!container) return;

    for (let i = 0; i < 15; i++) {
        const light = document.createElement('div');
        light.style.position = 'absolute';
        light.style.width = Math.random() * 6 + 3 + 'px';
        light.style.height = light.style.width;
        light.style.background = ['#ff1493', '#00d9ff', '#a855f7'][Math.floor(Math.random() * 3)];
        light.style.borderRadius = '50%';
        light.style.left = Math.random() * 100 + '%';
        light.style.top = -10 + 'px';
        light.style.boxShadow = `0 0 ${Math.random() * 15 + 10}px currentColor`;
        light.style.filter = 'blur(2px)';
        light.style.animation = `fall ${Math.random() * 5 + 4}s linear infinite`;
        container.appendChild(light);
    }
}

// ============================================
// SCROLL ANIMACIONES
// ============================================

class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-scroll-animate]');
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        this.observer = new IntersectionObserver((entries) => this.onIntersect(entries), this.observerOptions);
        this.elements.forEach(el => this.observer.observe(el));
    }

    onIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }
}

// ============================================
// INTERACTIVIDAD DEL BOTÓN HERO
// ============================================

function setupHeroButton() {
    const startBtn = document.getElementById('startBtn');
    const music = new MusicController();

    startBtn.addEventListener('click', () => {
        // Reproducir música
        music.play();

        // Crear efecto de transición
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.inset = '0';
        overlay.style.background = 'radial-gradient(circle, transparent 0%, rgba(0, 0, 0, 0.8) 100%)';
        overlay.style.zIndex = '999';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 1s ease-out';
        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);

        // Desplazamiento suave
        setTimeout(() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            setTimeout(() => {
                overlay.remove();
            }, 500);
        }, 800);

        // Crear partículas desde el botón
        const rect = startBtn.getBoundingClientRect();
        const particleSystem = window.particleSystem;
        for (let i = 0; i < 20; i++) {
            particleSystem.addParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 1);
        }
    });
}

// ============================================
// BOTÓN FINAL
// ============================================

function setupFinalButton() {
    const finalBtn = document.getElementById('finalBtn');
    const music = window.musicInstance;

    if (finalBtn) {
        finalBtn.addEventListener('click', () => {
            // Crear overlay con video
            const finalOverlay = document.createElement('div');
            finalOverlay.style.position = 'fixed';
            finalOverlay.style.inset = '0';
            finalOverlay.style.background = 'rgba(0, 0, 0, 0.95)';
            finalOverlay.style.zIndex = '1000';
            finalOverlay.style.display = 'flex';
            finalOverlay.style.alignItems = 'center';
            finalOverlay.style.justifyContent = 'center';
            finalOverlay.style.opacity = '0';
            finalOverlay.style.transition = 'opacity 1s ease-out';
            finalOverlay.style.padding = '20px';

            // Video grande
            const videoElement = document.createElement('video');
            videoElement.src = 'video.mp4';
            videoElement.controls = true;
            videoElement.autoplay = true;
            videoElement.style.width = '90vw';
            videoElement.style.maxWidth = '800px';
            videoElement.style.height = 'auto';
            videoElement.style.borderRadius = '25px';
            videoElement.style.boxShadow = '0 0 60px rgba(255, 20, 147, 0.8)';

            finalOverlay.appendChild(videoElement);
            document.body.appendChild(finalOverlay);

            // Fade in del overlay
            setTimeout(() => {
                finalOverlay.style.opacity = '1';
            }, 50);

            // Fade out de música
            if (music) {
                music.fadeOut(3000);
            }

            // Cerrar al hacer click fuera del video
            finalOverlay.addEventListener('click', (e) => {
                if (e.target === finalOverlay) {
                    finalOverlay.style.opacity = '0';
                    setTimeout(() => {
                        finalOverlay.remove();
                    }, 500);
                }
            });

            // Cerrar cuando termine el video
            videoElement.addEventListener('ended', () => {
                setTimeout(() => {
                    finalOverlay.style.opacity = '0';
                    setTimeout(() => {
                        finalOverlay.remove();
                    }, 500);
                }, 2000);
            });
        });
    }
}

// ============================================
// EFECTO DE GLOW EN TEXTO
// ============================================

function addTextGlowEffect() {
    const titles = document.querySelectorAll('h1, h2, h3');
    titles.forEach(title => {
        title.addEventListener('mouseover', () => {
            title.style.textShadow = '0 0 20px rgba(255, 20, 147, 0.8), 0 0 40px rgba(0, 217, 255, 0.6)';
        });
        title.addEventListener('mouseout', () => {
            title.style.textShadow = '';
        });
    });
}

// ============================================
// ANIMACIÓN KEYFRAMES DINÁMICAS
// ============================================

function addAnimationKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 1;
            }
            100% {
                transform: translateY(${window.innerHeight}px) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0px) translateX(0px);
            }
            50% {
                transform: translateY(-50px) translateX(30px);
            }
        }

        @keyframes twinkle {
            0%, 100% {
                opacity: 0.5;
            }
            50% {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// SMOOTH SCROLL PARA LINKS
// ============================================

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ============================================
// INICIALIZACIÓN GENERAL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Sistemas principales
    window.particleSystem = new ParticleSystem();
    window.musicInstance = new MusicController();

    // Crear elementos visuales
    createFloatingStars();
    createFallingLights();
    addAnimationKeyframes();
    addSectionTransitions();
    createPetals();

    // Configurar interactividad
    setupHeroButton();
    setupFinalButton();
    addTextGlowEffect();
    setupSmoothScroll();

    // Observadores y efectos
    new ScrollAnimations();
    new ParallexEffect();

    // Agregar datos de scroll animate
    document.querySelectorAll('.section-title, .section-subtitle, .gallery-grid, .timeline, .letter-card').forEach(el => {
        el.setAttribute('data-scroll-animate', 'true');
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    });

    // Agregar parallax a elementos específicos
    document.querySelectorAll('.glow-circle, .blur-shape').forEach(el => {
        el.setAttribute('data-parallax', '0.3');
    });

    // Log de inicialización
    console.log('🌟 Página interactiva inicializada correctamente');
    console.log('✨ Todos los efectos y animaciones están listos');
});

// ============================================
// MANEJO DE VIEWPORT Y RESPONSIVE
// ============================================

function handleViewportChange() {
    const width = window.innerWidth;
    const isMobile = width < 768;

    // Ajustar configuraciones según dispositivo
    if (isMobile) {
        // Reducir cantidad de partículas en móvil
        document.querySelectorAll('.stars').forEach(el => {
            el.style.backgroundSize = '150px 150px';
        });
    }
}

window.addEventListener('resize', handleViewportChange);
window.addEventListener('orientationchange', handleViewportChange);

// Inicializar al cargar
handleViewportChange();

// ============================================
// MANEJO DE ERRORES Y FALLBACKS
// ============================================

// Fallback si no carga la imagen de fondo
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Crear placeholder si falla la imagen
            this.style.background = 'linear-gradient(135deg, #ff1493, #00d9ff)';
            this.style.display = 'none';
        });
    });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy loading para imágenes
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// Reducir frame rate en background
let isVisible = true;
document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
    if (!isVisible) {
        window.particleSystem.particles = [];
    }
});

// ============================================
// LLUVIA DE PÉTALOS
// ============================================

function createPetals() {
    const petalsContainer = document.createElement('div');
    petalsContainer.id = 'petalsContainer';
    petalsContainer.style.position = 'fixed';
    petalsContainer.style.top = '0';
    petalsContainer.style.left = '0';
    petalsContainer.style.width = '100%';
    petalsContainer.style.height = '100%';
    petalsContainer.style.pointerEvents = 'none';
    petalsContainer.style.zIndex = '2';
    document.body.appendChild(petalsContainer);

    function createPetal() {
        const petal = document.createElement('div');
        const size = Math.random() * 15 + 8;
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 8;
        const delay = Math.random() * 2;

        petal.style.position = 'absolute';
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.background = `radial-gradient(ellipse at 30% 30%, rgba(212, 175, 55, 0.7), rgba(196, 30, 58, 0.5))`;
        petal.style.borderRadius = '50% 0';
        petal.style.left = left + '%';
        petal.style.top = '-20px';
        petal.style.opacity = '0.6';
        petal.style.boxShadow = '0 0 8px rgba(212, 175, 55, 0.3)';
        petal.style.animation = `fallPetal ${duration}s ease-in ${delay}s forwards`;
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;

        petalsContainer.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, (duration + delay) * 1000 + 100);
    }

    // Crear pétalos continuamente
    setInterval(() => {
        if (document.body.contains(petalsContainer)) {
            createPetal();
        }
    }, 800);
}

// ============================================
// TRANSICIONES SUAVES ENTRE SECCIONES
// ============================================

function addSectionTransitions() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fallPetal {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 0.6;
            }
            25% {
                opacity: 0.7;
            }
            75% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(${window.innerHeight + 50}px) translateX(${Math.random() * 150 - 75}px) rotate(720deg);
                opacity: 0;
            }
        }

        section {
            animation: sectionFadeIn 1s ease-out forwards;
            opacity: 0;
        }

        section:nth-child(1) {
            animation-delay: 0s;
        }

        section:nth-child(2) {
            animation-delay: 0.1s;
        }

        section:nth-child(3) {
            animation-delay: 0.2s;
        }

        section:nth-child(4) {
            animation-delay: 0.3s;
        }

        section:nth-child(5) {
            animation-delay: 0.4s;
        }

        section:nth-child(6) {
            animation-delay: 0.5s;
        }

        @keyframes sectionFadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .container {
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .section-title {
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-item {
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .memory-card {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
}
