// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Hero section animations
function initHeroAnimations() {
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    const nav = document.querySelector('nav');

    // Navbar animation
    gsap.from(nav, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // Hero text animation
    gsap.from(heroText.children, {
        x: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Hero image animation
    gsap.from(heroImage, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
}

// Game card animations
function initGameCardAnimations() {
    // Animate game cards on scroll
    gsap.utils.toArray('.game').forEach(game => {
        gsap.from(game, {
            scrollTrigger: {
                trigger: game,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });

        // Hover animation
        game.addEventListener('mouseenter', () => {
            gsap.to(game, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out",
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
            });
        });

        game.addEventListener('mouseleave', () => {
            gsap.to(game, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
                boxShadow: "none"
            });
        });
    });
}

// Section header animations
function initSectionHeaderAnimations() {
    gsap.utils.toArray('.games-head').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: "top bottom-=50",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
    initGameCardAnimations();
    initSectionHeaderAnimations();
});
