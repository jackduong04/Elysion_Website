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

// Before after img
let matchMedia = gsap.matchMedia();

matchMedia.add({
    normalViewPort: "(min-width: 1251px)",
    is1250: "(min-width: 1001px) and (max-width: 1250px)",
    is1000: "(min-width: 751px) and (max-width: 1000px)",
    is750: "(min-width: 501px) and (max-width: 750px)",
    is500: "(max-width: 500px)"
}, (i) => {
    let {normalViewPort, is1250, is1000, is750, is500} = i.conditions;

    gsap.to(".img_bf", {
        scrollTrigger: {
            trigger: ".bfaft_cont",
            start: "bottom bottom",
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

// Fade in scroll animation
var subsvDescConts = gsap.utils.toArray(".subsv_desc_cont");
subsvDescConts.forEach((subsvDescConts) => {
    gsap.from(subsvDescConts, {
    scrollTrigger: {
        trigger: subsvDescConts,
        start: "top bottom"
    },
    y: 50,
    opacity: 0,
    duration: 0.3
    });
});

gsap.from(".individual_value", {
    scrollTrigger: {
        trigger: ".individual_value",
        start: "bottom bottom"
    },
    y: 50,
    opacity: 0,
    duration: 0.3
});
