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

// Cart-related JS
let cart = {};

function renderCart() {
    const cartItemsDiv = document.getElementById("cartItems");
    const cartTotalDiv = document.getElementById("cartTotal");
    const cartBadge = document.getElementById("cartBadge");
    cartItemsDiv.innerHTML = "";

    let total = 0;
    let totalQty = 0;

    const keys = Object.keys(cart);
    if (keys.length === 0) {
        cartItemsDiv.innerHTML = '<div class="empty">Your cart is empty.</div>';
    } else {
        keys.forEach(key => {
            const item = cart[key];
            const line = item.price * item.quantity;
            total += line;
            totalQty += item.quantity;

            const row = document.createElement("div");
            row.className = "cart-row";
            row.innerHTML = `
                <div class="cart-main">
                <div class="cart-line">
                    <span class="cart-name">${item.service}</span>
                    <span class="price">$${line}</span>
                </div>
                <div class="cart-line">
                    <span class="cart-meta">${item.size}${item.size && item.condition? " • " : ""}${item.condition}</span>
                    <span class="qty">
                    <button aria-label="Decrease" onclick="updateQuantity('${key}', -1)">−</button>
                    <strong>${item.quantity}</strong>
                    <button aria-label="Increase" onclick="updateQuantity('${key}', 1)">+</button>
                    </span>
                </div>
                </div>
            `;
            cartItemsDiv.appendChild(row);
        });
    }

    cartTotalDiv.textContent = `Total: $${total}`;
    // Badge
    if (totalQty > 0) {
        cartBadge.style.display = "inline-flex";
        cartBadge.textContent = totalQty;
    } else {
        cartBadge.style.display = "none";
    }
    // Persist
    localStorage.setItem('elysion_cart', JSON.stringify(cart));
}

function updateQuantity(key, change) {
    if(!cart[key]) return;
    cart[key].quantity += change;
    if (cart[key].quantity <= 0) delete cart[key];
    renderCart();
}

// Load from localStorage
window.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem('elysion_cart');
    if (saved) {
        try { cart = JSON.parse(saved) || {}; } catch(e){ cart = {}; }
    }
    renderCart();
});

// Popup show/hide
const cartPopup = document.getElementById("navbarCartPopup");
const cartToggle = document.getElementById("cartToggleBtn");
const cartClose = document.getElementById("cartCloseBtn");

function toggleCart(force) {
    const show = typeof force === "boolean" ? force : (cartPopup.style.display === "none" || cartPopup.style.display === "");
    cartPopup.style.display = show ? "block" : "none";
}
cartToggle.addEventListener("click", () => toggleCart());
cartClose.addEventListener("click", () => toggleCart(false));

// Receive items from iframe and auto-open
window.addEventListener("message", (event) => {
    const { type, service, size, condition, price } = event.data || {};
    if (type === "ADD_TO_CART") {
        const key = `${service}-${size}-${condition}`;
        if (cart[key]) {
            cart[key].quantity += 1;
        } else {
            cart[key] = { service, size, condition, price, quantity: 1 };
        }
        renderCart();
        toggleCart(true);
    }
});

// Checkout
document.getElementById("checkoutBtn").addEventListener("click", () => {
    localStorage.setItem('elysion_checkout_intent', 'true');
    localStorage.setItem("elysion_checkout_cart", JSON.stringify(cart));
    window.location.href = '/pages/main/contact.html';
});
