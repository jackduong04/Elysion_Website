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

// Navbar hide on down scroll
navbar = document.querySelector(".navbar_cont");
navbar.classList.add("active");
var lastScrollTop = 0;
window.addEventListener("scroll", (e) => {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        navbar.classList.add("active");
    }
    else {
        navbar.classList.remove("active");
    }
    lastScrollTop = scrollTop;
});

// Scroll box
var scrollBoxActive = gsap.utils.toArray(".scroll_box_active");

scrollBoxActive.forEach((scrollBoxActive) => {
    gsap.to(scrollBoxActive, {
        scrollTrigger: {
            trigger: scrollBoxActive,
            start: "top bottom",
            end: "center top",
            scrub: 1
        },
        height: "150%"
    })
});

// Footer color change
gsap.to(".aboutpg_body", {
    scrollTrigger: {
        trigger: ".footer",
        start: "top bottom",
        toggleActions: "play none none reverse"
    },
    backgroundColor: "#fff",
    duration: 0.2
});

gsap.to(".aboutpg_fixed_bg", {
    scrollTrigger: {
        trigger: ".footer",
        start: "top bottom",
        toggleActions: "play none none reverse"
    },
    display: "none",
    duration: 0.2
});
