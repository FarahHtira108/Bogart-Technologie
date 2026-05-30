let cart = JSON.parse(localStorage.getItem("cart")) || [];

let products = [
    {name:"iPhone 14", price:2500, stock:5, img:"images/iphone.jpg"},
    {name:"iPhone 13", price:2000, stock:3, img:"images/iphone.jpg"},
    {name:"Samsung S23", price:1800, stock:4, img:"images/samsung.jpg"}
];

// AFFICHAGE PRODUITS (IPHONE PAGE)
if(document.getElementById("products")) {
    let container = document.getElementById("products");

    products.forEach((p, index) => {
        container.innerHTML += `
        <div class="card">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>${p.price} TND</p>
            <p class="stock">Stock: ${p.stock}</p>
            <button onclick="addToCart(${index}, this)">Ajouter</button>
        </div>`;
    });
}

// AJOUT PANIER
function addToCart(index, btn) {
    let p = products[index];

    if(p.stock <= 0){
        alert("Rupture de stock !");
        return;
    }

    p.stock--;

    cart.push(p);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
    animate(btn);
}

// UPDATE PANIER
function updateCart() {
    document.getElementById("cart-count").innerText = cart.length;
}

// ANIMATION
function animate(btn){
    let img = document.createElement("img");
    img.src = "images/iphone.jpg";
    img.className = "flying-img";
    document.body.appendChild(img);

    let rect = btn.getBoundingClientRect();
    let cart = document.getElementById("cart-icon").getBoundingClientRect();

    img.style.left = rect.left + "px";
    img.style.top = rect.top + "px";

    setTimeout(()=>{
        img.style.left = cart.left + "px";
        img.style.top = cart.top + "px";
        img.style.width = "20px";
        img.style.height = "20px";
    }, 10);

    setTimeout(()=>img.remove(), 800);
}

// INIT
updateCart();