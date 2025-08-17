gsap.registerPlugin(ScrollTrigger);

// Checkout logic (only works if users use Checkout button)
document.addEventListener("DOMContentLoaded", () => {
    const fromCheckout = localStorage.getItem("elysion_checkout_intent");
    if (fromCheckout === "true") {
        // Reset the flag so a normal visit later won’t trigger
        localStorage.removeItem("elysion_checkout_intent");

        const cartData = JSON.parse(localStorage.getItem("elysion_checkout_cart") || "{}");
        let messageText = "Booking Details:\n";
        let total = 0;

        Object.keys(cartData).forEach(key => {
            const item = cartData[key];
            total += item.price * item.quantity;
            messageText +=
                `• ${item.service} ${item.size ? "- " + item.size : ""} ${item.condition ? "- " + item.condition : ""}\n  Qty: ${item.quantity}, Price: From $${item.price}\n`;
        });

        messageText += `Total: From $${total}`;

        // Prefill the textarea
        const textarea = document.querySelector("textarea[name='message']");
        if (textarea) {
            textarea.value = messageText;
        }
    }

    const form = document.querySelector('#contactForm');
    if (form) {
        form.addEventListener('submit', () => {
            localStorage.removeItem('elysion_cart');
            localStorage.removeItem('elysion_checkout_cart');
        });
    }
});

// Fade in scroll animation
gsap.from(".contact_form_cont", {
    scrollTrigger: {
        trigger: ".contact_form_cont",
        start: "top center"
    },
    opacity: 0,
    duration: 0.3
});

gsap.from(".navbar_cont", {
    scrollTrigger: {
        trigger: ".contact_form_cont",
        start: "top center"
    },
    opacity: 0,
    duration: 0.3
});

gsap.from(".contact_info_cont", {
    scrollTrigger: {
        trigger: ".contact_info_cont",
        start: "top bottom"
    },
    y: 50,
    opacity: 0,
    duration: 0.3
});
