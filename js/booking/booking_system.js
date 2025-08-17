// Allow parent pages to choose the initial service/size
const serviceAliases = {
    lawn_mowing: 'lawn_mowing',
    soft_house_washing: 'soft_house_washing',
    pressure_washing: 'pressure_washing',
    garden_subscription: 'garden_subscription',
};

function getInitFromURL() {
    const params = new URLSearchParams(window.location.search);
    let service = params.get('service');
    let size = params.get('size');

    if (service) {
        service = serviceAliases[service] || service;
    }

    return { service, size };
}

// Validate and apply init
function applyInitRender(init) {
    let service = init.service || 'lawn_mowing';
    service = serviceAliases[service] || service;

    if (!serviceSizes[service]) {
        service = 'lawn_mowing';
    }

    let size = init.size || Object.keys(serviceSizes[service])[0];

    if (!serviceSizes[service][size]) {
        size = Object.keys(serviceSizes[service])[0];
    }

    const serviceMenu = document.getElementById('serviceMenu');
    const sizeMenu = document.getElementById('sizeMenu');

    if (serviceMenu) {
        serviceMenu.value = service;
    }
    populateSizeMenu(service);

    if (sizeMenu) {
        sizeMenu.value = size;
    }
    renderServices(service, size);
}

// Data: Prices & Sizes
const servicePrices = {
    lawn_mowing: {
        small: { normal_grass: 11, long_grass: 21, overgrown_grass: 31 },
        medium: { normal_grass: 41, long_grass: 51, overgrown_grass: 61 },
        large: { normal_grass: 71, long_grass: 81, overgrown_grass: 91 },
        xLarge: { normal_grass: 101, long_grass: 111, overgrown_grass: 121 },
    },
    soft_house_washing: {
        small: { single_storey: 12, double_storey: 22, triple_storey: 32 },
        medium: { single_storey: 42, double_storey: 52, triple_storey: 62 },
        large: { single_storey: 72, double_storey: 82, triple_storey: 92 },
        xLarge: { single_storey: 102, double_storey: 112, triple_storey: 122 },
    },
    pressure_washing: {
        per_30sqm: { decks_and_driveway: 13, fences_and_walls: 23, patios_and_pavers: 33 },
    },
    garden_subscription: {
        pOA: { bronze_package: 14, silver_package: 24, gold_package: 34 },
    },
};

const serviceSizes = {
    lawn_mowing: {
        small: "Small (1 - 50 sqm)",
        medium: "Medium (51 - 125 sqm)",
        large: "Large (126 - 255 sqm)",
        xLarge: "Extra Large (256 - 350 sqm)",
    },
    soft_house_washing: {
        small: "Small (under 150 sqm)",
        medium: "Medium (151 - 225 sqm)",
        large: "Large (226 - 300 sqm)",
        xLarge: "Extra Large (301 - 400 sqm)",
    },
    pressure_washing: {
        per_30sqm: "Per 30sqm",
    },
    garden_subscription: {
        pOA: "Price on application",
    },
};

// Content (with per-condition support) 
const serviceContent = {
    lawn_mowing: {
        label: "Lawn Mowing",
        cover: "../../assets/booking_system_img/normal_grass.jpg",
        desc: "Professional lawn mowing with neat edging and clippings removal.",
        byCondition: {
            normal_grass: {
                cover: '../../assets/booking_system_img/normal_grass.jpg',
                desc: 'Grass length is manageable. Perfect for routine care.',
            },
            long_grass: {
                cover: '../../assets/booking_system_img/long_grass.jpg',
                desc: 'Grass is longer than usual. Includes slower passes for a clean, even cut.',
            },
            overgrown_grass: {
                cover: '../../assets/booking_system_img/overgrown_grass.jpg',
                desc: 'Heavily overgrown lawn. Includes multiple cuts if needed to restore shape.',
            },
        },
    },
    soft_house_washing: {
        label: "Soft House Washing",
        cover: "../../assets/booking_system_img/soft_housewash.jpg",
        desc: "Soft house washing to remove grime, algae, and dust - gentle on paint, tough on dirt.",
        byCondition: {
            single_storey: { desc: "Single-storey dwelling soft-wash of exterior walls and eaves." },
            double_storey: { desc: "Double-storey exterior soft-wash. Includes careful application and rinse." },
            triple_storey: { desc: "Large/multi-level exterior soft-wash for expansive homes." },
        },
    },
    pressure_washing: {
        label: "Pressure Washing",
        cover: "../../assets/booking_system_img/decks_driveway.jpg",
        desc: "High-pressure clean for hard surfaces.",
        byCondition: {
            decks_and_driveway: {
                cover: '../../assets/booking_system_img/decks_driveway.jpg',
                desc: 'Lift grime and tire marks on decks and driveways.',
            },
            fences_and_walls: {
                cover: '../../assets/booking_system_img/fences_walls.jpg',
                desc: 'Refresh fence lines and boundary walls.',
            },
            patios_and_pavers: {
                cover: '../../assets/booking_system_img/patios_pavers.jpg',
                desc: 'Restore patios and pavers to a brighter finish.',
            },
        },
    },
    garden_subscription: {
        label: "Garden Subscription",
        cover: "../../assets/projects_img/remuera_one-off.jpg",
        desc: "Scheduled garden care to keep everything tidy.",
        byCondition: {
            bronze_package: { desc: 'Bronze package: light tidy and maintenance.' },
            silver_package: { desc: 'Silver package: regular tidy plus seasonal extras.' },
            gold_package: { desc: 'Gold package: comprehensive monthly service.' },
        },
    },
};

// Add-ons (always visible) 
const addOnServices = {
    roof_treatment: {
        price: 551,
        label: "Roof Treatment",
        cover: "../../assets/booking_system_img/roof_treatment.jpg",
        desc: "Moss/mould treatment to extend roof life and improve appearance. Low-pressure application; results develop over weeks.",
    },
    gutter_cleaning: {
        price: 552,
        label: "Gutter Cleaning",
        cover: "../../assets/booking_system_img/gutter_cleaning.jpg",
        desc: "Remove leaves, debris, and blockages. Helps prevent overflow, leaks, and water damage during heavy rain.",
    },
}

// Helpers 
function getCoverFor(service, condition) {
    const meta = serviceContent[service] || {};
    const cond = meta.byCondition?.[condition] || {};
    return cond.cover || meta.cover;
}
function getDescFor(service, condition) {
    const meta = serviceContent[service] || {};
    const cond = meta.byCondition?.[condition] || {};
    return cond.desc || meta.desc || "High-quality service delivered by Elysion.";
}
function capitalize(str) {
    if (!str) return '';
    return str
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Modal wiring 
const overlayEl = document.getElementById("detailsOverlay");
const coverEl   = document.getElementById("detailsCover");
const titleEl   = document.getElementById("detailsTitle");
const priceEl   = document.getElementById("detailsPrice");
const metaEl    = document.getElementById("detailsMeta");
const descEl    = document.getElementById("detailsDesc");
const addBtnEl  = document.getElementById("detailsAddBtn");

function openDetails(service, size, condition, price) {
    const isAddon = !size && !condition;

    const prettyService =
        (serviceContent[service]?.label) ||
        (addOnServices[service]?.label) ||
        capitalize(service);

    const cover = isAddon
        ? addOnServices[service]?.cover
        : getCoverFor(service, condition);

    const description = isAddon
        ? (addOnServices[service]?.desc || "High-quality service delivered by Elysion.")
        : getDescFor(service, condition);

    coverEl.src = cover;
    coverEl.alt = `${prettyService} cover`;
    titleEl.textContent = `${prettyService}`;
    priceEl.textContent = `From $${price}`;
    metaEl.textContent = isAddon
        ? "Add-on service"
        : `${(serviceSizes[service] && serviceSizes[service][size])
            ? serviceSizes[service][size]
            : capitalize(size)}${condition ? " • " + capitalize(condition) : ""}`;
    descEl.textContent = description;

    addBtnEl.onclick = function() {
        if (isAddon) {
            addToCart(`Add-on: ${prettyService}`, "", "", price);
        } else {
            addToCart(service, size, condition, price);
        }
        closeDetails();
    };

    overlayEl.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeDetails(e) {
    overlayEl.style.display = "none";
    document.body.style.overflow = "";
}

// UI renderers 
function populateSizeMenu(service) {
    const sizeMenu = document.getElementById("sizeMenu");
    const sizes = serviceSizes[service];
    sizeMenu.innerHTML = "";

    if (!sizes) return;

    for (const size in sizes) {
        const option = document.createElement("option");
        option.value = size;
        option.textContent = sizes[size];
        sizeMenu.appendChild(option);
    }
};

function renderServices(service, size) {
    const container = document.getElementById("servicesList");
    container.innerHTML = "";

    const options = Object.keys(servicePrices[service][size]);

    options.forEach(condition => {
        const price = servicePrices[service][size][condition];
        const row = document.createElement("div");
        row.className = "service-item";
        row.innerHTML = `
        <div class="service-left">
            <img class="thumb" src="${getCoverFor(service, condition)}" alt="${service} ${condition} cover">
            <div class="service-text">
                <h3 class="quattrocento_bold">${capitalize(condition)}</h3>
                <h2 class="oswald">From $${price}</h2>
            </div>
        </div>
        <div class="service-right">
            <button class="btn btn-ghost" onclick="openDetails('${service}', '${size}', '${condition}', ${price})">View Details</button>
            <button class="btn btn-primary" onclick="addToCart('${service}', '${size}', '${condition}', ${price})">Add</button>
        </div>
        `;
        container.appendChild(row);
    });

    // Add-ons header
    const header = document.createElement("h3");
    header.className = 'oswald';
    header.style.marginTop = "1.1rem";
    header.textContent = "Add-ons";
    container.appendChild(header);

    // Add-ons list
    Object.keys(addOnServices).forEach(key => {
        const { price, label, cover } = addOnServices[key];
        const row = document.createElement("div");
        row.className = "service-item";
        row.innerHTML = `
        <div class="service-left">
            <img class="thumb" src="${cover}" alt="${label} cover">
            <div class="service-text">
                <h3 class="quattrocento_bold">${label}</h3>
                <h2 class="oswald">From $${price}</h2>
            </div>
        </div>
        <div class="service-right">
            <button class="btn btn-ghost" onclick="openDetails('${key}', '', '', ${price})">View Details</button>
            <button class="btn btn-primary" onclick="addToCart('Add-on: ${label}', '', '', ${price})">Add</button>
        </div>
        `;
        container.appendChild(row);
    });
}

// Cart bridge to parent 
function addToCart(service, size, condition, price) {
    window.parent.postMessage({
        type: "ADD_TO_CART",
        service: capitalize(service),
        size: capitalize(size),
        condition: capitalize(condition),
        price
    }, "*");
};

// Event wiring & initial render 
document.getElementById("serviceMenu").addEventListener("change", function() {
    const service = this.value;
    populateSizeMenu(service);
    const size = document.getElementById("sizeMenu").value;
    renderServices(service, size);
});

document.getElementById("sizeMenu").addEventListener("change", function() {
    const service = document.getElementById("serviceMenu").value;
    renderServices(service, this.value);
});

// Initial render
applyInitRender(getInitFromURL());
