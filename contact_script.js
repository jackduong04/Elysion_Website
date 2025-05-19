gsap.registerPlugin(ScrollTrigger);

// Animate preloader
gsap.to(".preloader_cont", {
    y: "100%",
    opacity: 0.2,
    duration: 1,
    ease: "expo.in"
});

// Auto scroll after inactivity

function autoScroll() {
    const scrollTarget = document.querySelector(".homepg_hero");
    const scrollDuration = 1500;
    let hasScrolled = false;
    let inactivityTimer;

    function autoScroll() {
        if (!hasScrolled) {
            smoothScrollTo(scrollTarget, scrollDuration);
            cleanup();
        }
    }

    function smoothScrollTo(target, duration) {
        const targetY = target.getBoundingClientRect().bottom + window.pageYOffset;
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        let startTime = null;

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            window.scrollTo(0, startY + distance * easeInOutQuad(progress));

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    // Easing function for smooth effect
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function cleanup() {
        window.removeEventListener("scroll", onScroll, { passive: true });
        clearTimeout(inactivityTimer);
    }

    function onScroll() {
        if (!hasScrolled) {
            hasScrolled = true;
            cleanup();
        }
    }

    // Initial setup only if user is at top
    if (window.scrollY === 0) {
        inactivityTimer = setTimeout(autoScroll, 1500);
        window.addEventListener("scroll", onScroll, { passive: true });
    }
}
autoScroll();

// Fade in scroll animation
gsap.from(".contact_form_cont", {
    scrollTrigger: {
        trigger: ".contact_form_cont",
        start: "top center",
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    duration: 0.5
});

gsap.from(".navbar_cont", {
    scrollTrigger: {
        trigger: ".contact_form_cont",
        start: "top center",
        toggleActions: "play none none none"
    },
    opacity: 0,
    duration: 0.5
});

gsap.from(".contact_info_cont", {
    scrollTrigger: {
        trigger: ".contact_info_cont",
        start: "top bottom",
        toggleActions: "play none none reset"
    },
    x: -150,
    opacity: 0,
    duration: 0.5
});

// Lenis
const lenis = new Lenis();
// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);
// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});
// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);