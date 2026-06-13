let cart = JSON.parse(localStorage.getItem("cart")) || [];

const products = [
    { id: 1, name: "iPhone 14", brand: "iphone", price: 2500, stock: 5, img: "images/iphone.jpg" },
    { id: 2, name: "iPhone 13", brand: "iphone", price: 2000, stock: 3, img: "images/iphone.jpg" },
    { id: 3, name: "Samsung S23", brand: "samsung", price: 1800, stock: 4, img: "images/samsung.jpg" }
];

let currentFilter = "all";

const container = document.getElementById("products");

function renderProducts() {
    container.innerHTML = "";

    products
    .filter(p => currentFilter === "all" || p.brand === currentFilter)
    .forEach(p => {

        container.innerHTML += `
        <div class="card">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>${p.price} TND</p>
            <p>Stock: ${p.stock}</p>

            <button onclick="addToCart(${p.id})" ${p.stock === 0 ? "disabled" : ""}>
                Ajouter
            </button>
        </div>
        `;
    });
}

function addToCart(id) {
    let product = products.find(p => p.id === id);

    if (!product || product.stock <= 0) return;

    product.stock--;

    let item = cart.find(i => i.id === id);

    if (item) item.qty++;
    else cart.push({ ...product, qty: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
    renderProducts();

    // ✨ effet premium
    document.body.style.transform = "scale(1.01)";
    setTimeout(() => document.body.style.transform = "scale(1)", 120);
}

function updateCart() {
    document.getElementById("cart-count").innerText =
        cart.reduce((a,b)=>a+b.qty,0);
}

function filter(type) {
    currentFilter = type;
    renderProducts();
}
function searchProduct() {
    const value =
    document.getElementById("search")
    .value.toLowerCase();

    document.querySelectorAll(".card")
    .forEach(card => {

        const name =
        card.querySelector("h3")
        .innerText.toLowerCase();

        card.style.display =
        name.includes(value)
        ? "block"
        : "none";
    });
}

renderProducts();
updateCart();