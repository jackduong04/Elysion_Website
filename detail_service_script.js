gsap.registerPlugin(ScrollTrigger);

// Animate preloader
gsap.to(".preloader_cont", {
    y: "100%",
    opacity: 0.2,
    duration: 1,
    ease: "expo.in"
});

// Before after comparision on hover
const bfaft_cont = document.querySelector(".bfaft_cont");
const img_bf = document.querySelector(".img_bf");
bfaft_cont.addEventListener("mousemove", (e) => {
    img_bf.style.width = `${e.layerX}px`;
});

// Before after comparison on scroll
gsap.to(".img_bf", {
    scrollTrigger: {
        trigger: ".bfaft_cont",
        start: "top center",
        end: "top top",
        scrub: true
    },
    width: "40vw"
});

// Fade in scroll animation
gsap.from(".subsv_links", {
    scrollTrigger: {
        trigger: ".subsv_links",
        start: "center bottom",
        toggleActions: "play none none reverse"
    },
    x: -150,
    opacity: 0,
    duration: 0.5
});

gsap.from(".individual_value", {
    scrollTrigger: {
        trigger: ".individual_value",
        start: "bottom bottom",
        toggleActions: "play none none reverse"
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