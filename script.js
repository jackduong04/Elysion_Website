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
        start: "top bottom"
    },
    y: 50,
    opacity: 0,
    duration: 0.3
});

gsap.from(".aio_banner", {
    scrollTrigger: {
        trigger: ".aio_banner",
        start: "top bottom"
    },
    y: 50,
    opacity: 0,
    duration: 0.3
});

gsap.from(".featured_blog", {
    scrollTrigger: {
        trigger: ".featured_blog",
        start: "top bottom"
    },
    y: 50,
    scale: 0.8,
    opacity: 0,
    duration: 0.3
});

gsap.from(".second_featured_blog", {
    scrollTrigger: {
        trigger: ".second_featured_blog",
        start: "top bottom"
    },
    y: 50,
    opacity: 0,
    duration: 0.3
});

gsap.from(".cta_title", {
    scrollTrigger: {
        trigger: ".cta_title",
        start: "top bottom"
    },
    y: 50,
    opacity: 0,
    duration: 0.3
});

gsap.from(".subscription_title", {
    scrollTrigger: {
        trigger: ".subscription_title",
        start: "top bottom"
    },
    y: 50,
    opacity: 0,
    duration: 0.3
});

gsap.from(".subscription_card_cont", {
    scrollTrigger: {
        trigger: ".subscription_card_cont",
        start: "top bottom"
    },
    y: 50,
    opacity: 0,
    duration: 0.3
});

gsap.from(".platform_heading", {
    scrollTrigger: {
        trigger: ".platform_heading",
        start: "top bottom"
    },
    y: 50,
    opacity: 0,
    duration: 0.3
});

gsap.from(".app_intro", {
    scrollTrigger: {
        trigger: ".app_intro",
        start: "top bottom"
    },
    y: 50,
    opacity: 0,
    duration: 0.3
});
