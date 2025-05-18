gsap.registerPlugin(ScrollTrigger);

// Animate preloader
gsap.to(".preloader_cont", {
    y: "100%",
    opacity: 0.2,
    duration: 1,
    ease: "expo.in"
});

// Dark theme change
const aioServiceAnimate = gsap.timeline({
    scrollTrigger: {
        trigger: ".aio_banner",
        start: "center center",
        end: "bottom top",
        toggleActions: "play reverse play reverse"
    }
});
aioServiceAnimate
    .to(".body", {
        backgroundColor: "#333333",
        duration: 0.15
    })
    .to(".aiotext", {
        color: "#f5f5f5",
        duration: 0.15
    })
    .to(".aio_support_text p", {
        color: "#f5f5f5",
        duration: 0.15
    })
    .to(".homepg_sublogo", {
        opacity: 1,
        duration: 0.15
    }, 0.1);

const haveAProject = gsap.timeline({
    scrollTrigger: {
        trigger: ".cta_cont",
        start: "bottom bottom",
        end: "bottom center",
        toggleActions: "play reverse play reverse"
    }
});
haveAProject
    .to(".body", {
        backgroundColor: "#3c8989",
        duration: 0.15
    })
    .to(".cta_title", {
        color: "#f5f5f5",
        duration: 0.15
    })
    .from(".cta_link", {
        opacity: 0,
        duration: 0.15
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

