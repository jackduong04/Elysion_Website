gsap.registerPlugin(ScrollTrigger);

// Animate preloader
gsap.to(".preloader_cont", {
    y: "100%",
    opacity: 0.2,
    duration: 1,
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

// Before after comparision on hover
// const bfaft_cont = document.querySelector(".bfaft_cont");
// const img_bf = document.querySelector(".img_bf");
// bfaft_cont.addEventListener("mousemove", (e) => {
//     img_bf.style.width = `${e.layerX}px`;
// });

// Before after comparison on scroll
let matchMedia = gsap.matchMedia();

matchMedia.add({
    normalViewPort: "(min-width: 1251px)",
    is1250: "(max-width: 1250px)",
    is1000: "(max-width: 1000px)",
    is750: "(max-width: 750px)",
    is500: "(max-width: 500px)"
}, (i) => {
    let {normalViewPort, is1250, is1000, is750, is500} = i.conditions;

    gsap.to(".img_bf", {
        scrollTrigger: {
            trigger: ".bfaft_cont",
            start: "top center",
            end: "top top",
            scrub: true
        },
        width: () => {
            if(normalViewPort) {
                return "40vw"
            } else if (is1250) {
                return "55vw"
            } else if (is1000) {
                return "65vw"
            } else if (is750) {
                return "70vw"
            } else if (is500) {
                return "75vw"
            }
        }
    });
});

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
var subsvDescConts = gsap.utils.toArray(".subsv_desc_cont");
subsvDescConts.forEach((subsvDescConts) => {
    gsap.from(subsvDescConts, {
    scrollTrigger: {
        trigger: subsvDescConts,
        start: "top bottom",
        toggleActions: "play none none reverse"
    },
    x: -150,
    opacity: 0,
    duration: 0.5
    });
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