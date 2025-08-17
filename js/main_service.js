gsap.registerPlugin(ScrollTrigger);

const featuredSection = document.querySelector(".section_cont");
const featuredItem = document.querySelectorAll(".section_item");

// Set the initial background color
const firstColor = featuredItem[0].getAttribute("data-bg");
featuredSection.style.backgroundColor = firstColor;

// Create an array of colors
const colors = Array.from(featuredItem).map(info => info.getAttribute("data-bg"));

// Background changing animation
const bgColorAnimate = gsap.timeline({
    scrollTrigger: {
        trigger: ".section_cont",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: self => {
            let index = Math.floor(self.progress * (colors.length - 1));
            let nextindex = Math.ceil(self.progress * (colors.length - 1));
            let blend = self.progress * (colors.length - 1) - index;
            gsap.to(featuredSection, {
                backgroundColor: gsap.utils.interpolate(colors[index], colors[nextindex], blend),
                overwrite: "auto",
                duration: 0.1
            });
        }
    }
});

// Fade in scroll animation
gsap.from(".section_cont", {
    scrollTrigger: {
        trigger: ".section_cont",
        start: "top center"
    },
    opacity: 0,
    duration: 0.3
});

gsap.from(".navbar_cont", {
    scrollTrigger: {
        trigger: ".section_cont",
        start: "top center"
    },
    opacity: 0,
    duration: 0.3
});

var sections = gsap.utils.toArray(".section_item");
sections.forEach((sections) => {
    gsap.from(sections, {
        scrollTrigger: {
            trigger: sections,
            start: "top bottom"
        },
        y: 50,
        opacity: 0,
        duration: 0.3
    })
});
