gsap.registerPlugin(ScrollTrigger);

// Animate preloader
gsap.to(".preloader_cont", {
    y: "100%",
    opacity: 0.2,
    duration: 1,
    ease: "expo.in"
});

// Fade in scroll animation
gsap.from(".blog_list_cont", {
    scrollTrigger: {
        trigger: ".second_featured_blog_img",
        start: "top center",
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    duration: 0.5
});

gsap.from(".navbar_cont", {
    scrollTrigger: {
        trigger: ".second_featured_blog_img",
        start: "top center",
        toggleActions: "play none none reverse"
    },
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