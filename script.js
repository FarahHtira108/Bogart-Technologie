let cart = JSON.parse(localStorage.getItem("cart")) || [];

let products = [
    { id: 1, name: "iPhone 14", brand: "iphone", price: 2500, stock: 5, img: "images/iphone.jpg" },
    { id: 2, name: "iPhone 13", brand: "iphone", price: 2000, stock: 3, img: "images/iphone.jpg" },
    { id: 3, name: "Samsung S23", brand: "samsung", price: 1800, stock: 4, img: "images/samsung.jpg" }
];

let currentFilter = "all";

const container = document.getElementById("products");

// 🔥 AFFICHAGE AVEC FILTRE
function renderProducts() {
    container.innerHTML = "";

    let filtered = products.filter(p => {
        return currentFilter === "all" || p.brand === currentFilter;
    });

    filtered.forEach((p, index) => {
        container.innerHTML += `
            <div class="card">
                <img src="${p.img}">
                <h3>${p.name}</h3>
                <p>${p.price} TND</p>
                <p class="stock">Stock: ${p.stock}</p>
                <button onclick="addToCart(${index}, this)" ${p.stock <= 0 ? "disabled" : ""}>
                    Ajouter
                </button>
            </div>
        `;
    });
}

// 🔥 FILTRE
function filterProducts(type) {
    currentFilter = type;
    renderProducts();
}

// 🔥 AJOUT PANIER
function addToCart(index, btn) {
    let product = products[index];

    if (product.stock <= 0) {
        alert("Rupture de stock !");
        return;
    }

    product.stock--;

    let existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
    animate(btn, product.img);

    renderProducts(); // refresh stock UI
}

// 🔥 UPDATE PANIER
function updateCart() {
    let total = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById("cart-count").innerText = total;
}

// 🔥 ANIMATION
function animate(btn, imgSrc) {
    let img = document.createElement("img");
    img.src = imgSrc;
    img.className = "flying-img";
    document.body.appendChild(img);

    let rect = btn.getBoundingClientRect();
    let cartIcon = document.getElementById("cart-icon").getBoundingClientRect();

    img.style.position = "absolute";
    img.style.left = rect.left + "px";
    img.style.top = rect.top + "px";

    setTimeout(() => {
        img.style.transition = "all 0.7s ease";
        img.style.left = cartIcon.left + "px";
        img.style.top = cartIcon.top + "px";
        img.style.width = "20px";
        img.style.height = "20px";
    }, 10);

    setTimeout(() => img.remove(), 800);
}

// INIT
renderProducts();
updateCart();