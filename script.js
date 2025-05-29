gsap.registerPlugin(ScrollTrigger);

// Animate preloader
gsap.to(".preloader_cont", {
    y: "100%",
    opacity: 0.2,
    duration: 0.8,
    ease: "expo.in"
});

// Small display navbar links dropdown
const dropdownBtn = document.querySelector(".navbar_dropdown");
const navbarLinks = document.querySelector(".navbar_links");

dropdownBtn.addEventListener("click", (e) => {
    const dropdownStatus = dropdownBtn.classList.toggle("active");
    if (dropdownStatus == true) {
        navbarLinks.classList.add("active");
    } else {
        navbarLinks.classList.remove("active");
    }
});

// Fade in scroll animation
gsap.from(".navbar_cont", {
    scrollTrigger: {
        trigger: ".navbar_cont",
        start: "top bottom",
        toggleActions: "play none none reset"
    },
    x: -150,
    opacity: 0,
    duration: 0.5
});

gsap.from(".aio_banner", {
    scrollTrigger: {
        trigger: ".aio_banner",
        start: "top bottom",
        toggleActions: "play none none reset"
    },
    x: -150,
    opacity: 0,
    duration: 0.5
});

gsap.from(".featured_img_cont", {
    scrollTrigger: {
        trigger: ".aio_banner",
        start: "bottom top",
        toggleActions: "play none none reverse"
    },
    y: 100,
    scale: 0.7,
    opacity: 0,
    duration: 0.5
});

gsap.from(".second_featured_blog", {
    scrollTrigger: {
        trigger: ".second_featured_blog",
        start: "top bottom",
        toggleActions: "play none none reset"
    },
    x: -150,
    opacity: 0,
    duration: 0.5
});

gsap.from(".cta_title", {
    scrollTrigger: {
        trigger: ".cta_title",
        start: "top bottom",
        toggleActions: "play none none reset"
    },
    x: -150,
    opacity: 0,
    duration: 0.5
});

gsap.from(".subscription_title", {
    scrollTrigger: {
        trigger: ".subscription_title",
        start: "top bottom",
        toggleActions: "play none none reset"
    },
    x: -150,
    opacity: 0,
    duration: 0.5
});

gsap.from(".subscription_card_cont", {
    scrollTrigger: {
        trigger: ".subscription_card_cont",
        start: "top bottom",
        toggleActions: "play none none reset"
    },
    y: 150,
    opacity: 0,
    duration: 0.5
});

gsap.from(".platform_heading", {
    scrollTrigger: {
        trigger: ".platform_heading",
        start: "top bottom",
        toggleActions: "play none none reset"
    },
    x: -150,
    opacity: 0,
    duration: 0.5
});

gsap.from(".app_intro", {
    scrollTrigger: {
        trigger: ".app_intro",
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

