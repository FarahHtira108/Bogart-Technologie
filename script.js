let cart = [];

function addToCart(name, price, imgSrc, button) {
    cart.push({ name, price });
    updateCart();
    animateAddToCart(imgSrc, button);
}

function updateCart() {
    let list = document.getElementById("cart-items");
    let totalText = document.getElementById("total");
    let count = document.getElementById("cart-count");

    list.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        let li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ${item.price} TND
            <button onclick="removeItem(${index})">❌</button>
        `;

        list.appendChild(li);
    });

    totalText.textContent = "Total: " + total + " TND";
    count.textContent = cart.length;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function animateAddToCart(imgSrc, button) {
    if (!imgSrc) return;

    let img = document.createElement("img");
    img.src = imgSrc;
    img.className = "flying-img";
    document.body.appendChild(img);

    let rect = button.getBoundingClientRect();
    let cartRect = document.getElementById("cart-icon").getBoundingClientRect();

    img.style.left = rect.left + "px";
    img.style.top = rect.top + "px";

    setTimeout(() => {
        img.style.left = cartRect.left + "px";
        img.style.top = cartRect.top + "px";
        img.style.width = "20px";
        img.style.height = "20px";
        img.style.opacity = "0.5";
    }, 10);

    setTimeout(() => {
        img.remove();
    }, 800);
}