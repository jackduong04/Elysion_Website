gsap.registerPlugin(ScrollTrigger);

// Animate preloader
gsap.to(".preloader_cont", {
    y: "100%",
    opacity: 0.2,
    duration: 1,
    ease: "expo.in"
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

// Image scale animation
function addImageScaleAnimation() {
    gsap.utils.toArray(".aboutpg_individual_header_cont").forEach((aboutpg_individual_header_cont, index) => {
        const image = document.querySelector(`#about-img-${index + 1} img`);
        gsap.to(image, {
            scrollTrigger: {
                trigger: aboutpg_individual_header_cont,
                start: "top top",
                end: "+=400% top",
                scrub: 1
            },
            scale: 1.2,
            ease: "none"
        });
    });
}
addImageScaleAnimation();

// Modify image clip-path on scroll
function animateClipPath (
    headerId,
    imageId,
    startClipPath,
    endClipPath,
    start = "top center",
    end = "bottom top"
) {
    let header = document.querySelector(headerId);
    let image = document.querySelector(imageId);
    ScrollTrigger.create({
        trigger: header,
        start: start,
        end: end,
        onEnter: () => {
            gsap.to(image, {
                scrollTrigger: {
                    trigger: header,
                    start: start,
                    end: end,
                    scrub: true
                },
                clipPath: endClipPath,
                ease: "none"
            });
        }
    });
};
animateClipPath(
    "#header-1",
    "#about-img-1",
    "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
);

const totalHeaders = 7;
for (let i = 2; i <= totalHeaders; i++) {
    let currentHeader = `#header-${i}`;
    let prevImage = `#about-img-${i - 1}`;
    let currentImage = `#about-img-${i}`;
    animateClipPath(
        currentHeader,
        prevImage,
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        "top bottom",
        "center center"
    );
    if (i < totalHeaders) {
        animateClipPath(
            currentHeader,
            currentImage,
            "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            "center center",
            "bottom top"
        );
    }
}

// Footer color change
gsap.to(".aboutpg_body", {
    scrollTrigger: {
        trigger: ".footer",
        start: "top bottom",
        toggleActions: "play none none reverse"
    },
    backgroundColor: "#fff",
    duration: 0.5
});

gsap.to(".sticky_bg_text", {
    scrollTrigger: {
        trigger: ".footer",
        start: "top bottom",
        toggleActions: "play none none reverse"
    },
    display: "none",
    duration: 0.5
});

gsap.to(".aboutpg_img_list", {
    scrollTrigger: {
        trigger: ".footer",
        start: "top bottom",
        toggleActions: "play none none reverse"
    },
    display: "none"
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