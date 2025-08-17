gsap.registerPlugin(ScrollTrigger);

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