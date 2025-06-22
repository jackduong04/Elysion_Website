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

// Auto scroll after inactivity

function autoScroll() {
    const scrollTarget = document.querySelector(".homepg_hero");
    const scrollDuration = 1500;
    let hasScrolled = false;
    let inactivityTimer;

    function autoScroll() {
        if (!hasScrolled) {
            smoothScrollTo(scrollTarget, scrollDuration);
            cleanup();
        }
    }

    function smoothScrollTo(target, duration) {
        const targetY = target.getBoundingClientRect().bottom + window.pageYOffset;
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        let startTime = null;

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            window.scrollTo(0, startY + distance * easeInOutQuad(progress));

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    // Easing function for smooth effect
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function cleanup() {
        window.removeEventListener("scroll", onScroll, { passive: true });
        clearTimeout(inactivityTimer);
    }

    function onScroll() {
        if (!hasScrolled) {
            hasScrolled = true;
            cleanup();
        }
    }

    // Initial setup only if user is at top
    if (window.scrollY === 0) {
        inactivityTimer = setTimeout(autoScroll, 1500);
        window.addEventListener("scroll", onScroll, { passive: true });
    }
}
autoScroll();

// Fade in scroll animation
gsap.from(".blog_list_cont", {
    scrollTrigger: {
        trigger: ".blog_item_img_cont",
        start: "top center"
    },
    opacity: 0,
    duration: 0.3
});

gsap.from(".navbar_cont", {
    scrollTrigger: {
        trigger: ".blog_item_img_cont",
        start: "top center"
    },
    opacity: 0,
    duration: 0.3
});