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

// Testimonial carousel logic
const testimonialCards = document.getElementsByClassName("testimonial_card");
const sliderIndicator = document.getElementsByClassName("slider_single_indicator");
const numOfSlides = 4;

// Auto carousel
function autoSlider(index) {
    for(let i = 0; i < numOfSlides; i++) {
        sliderIndicator[i].classList.remove("indicate_current");
        testimonialCards[i].classList.remove("testimonial_current");
    }
    sliderIndicator[index].classList.add("indicate_current");
    testimonialCards[index].classList.add("testimonial_current");
}

let sliderCurrentIndex = 0;
let intervalId = null; // Hold the setInterval reference

function sliderStartLoop() {
    if(!intervalId) {
        autoSlider(sliderCurrentIndex);
        intervalId = setInterval(() => {
            sliderCurrentIndex = (sliderCurrentIndex + 1) % numOfSlides;
            autoSlider(sliderCurrentIndex);
        }, 4000);
    }
}

function sliderStopLoop() {
    if(intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

// Observe if slider enters viewport
const testimonialCont = document.querySelector(".testimonial_cont");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            sliderStartLoop();
        } else {
            sliderStopLoop();
        }
    });
});

if(testimonialCont) {
    observer.observe(testimonialCont);
}

// On-click logic
sliderIndicator[0].onclick = function() {
    for(let i = 0; i < numOfSlides; i++) {
        sliderIndicator[i].classList.remove("indicate_current");
        testimonialCards[i].classList.remove("testimonial_current");
    }
    this.classList.add("indicate_current");
    testimonialCards[0].classList.add("testimonial_current");
    sliderStopLoop();
}
sliderIndicator[1].onclick = function() {
    for(let i = 0; i < numOfSlides; i++) {
        sliderIndicator[i].classList.remove("indicate_current");
        testimonialCards[i].classList.remove("testimonial_current");
    }
    this.classList.add("indicate_current");
    testimonialCards[1].classList.add("testimonial_current");
    sliderStopLoop();
}
sliderIndicator[2].onclick = function() {
    for(let i = 0; i < numOfSlides; i++) {
        sliderIndicator[i].classList.remove("indicate_current");
        testimonialCards[i].classList.remove("testimonial_current");
    }
    this.classList.add("indicate_current");
    testimonialCards[2].classList.add("testimonial_current");
    sliderStopLoop();
}
sliderIndicator[3].onclick = function() {
    for(let i = 0; i < numOfSlides; i++) {
        sliderIndicator[i].classList.remove("indicate_current");
        testimonialCards[i].classList.remove("testimonial_current");
    }
    this.classList.add("indicate_current");
    testimonialCards[3].classList.add("testimonial_current");
    sliderStopLoop();
}

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

gsap.from(".contact_form_cont", {
    scrollTrigger: {
        trigger: ".contact_form_cont",
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

gsap.from(".testimonial_cont", {
    scrollTrigger: {
        trigger: ".testimonial_cont",
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
