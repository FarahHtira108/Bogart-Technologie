const iphones = [
    { name: "iPhone 15 Pro", price: "1200€", img: "image/iphone15.jpg" },
    { name: "iPhone 15", price: "1000€", img: "image/iphone15.jpg" },
    { name: "iPhone 14 Pro", price: "950€", img: "image/iphone14.jpg" },
    { name: "iPhone 14", price: "800€", img: "image/iphone14.jpg" },
    { name: "iPhone 13", price: "650€", img: "image/iphone13.jpg" },
    { name: "iPhone 12", price: "500€", img: "image/iphone12.jpg" }
];

const container = document.getElementById("iphone-list");

iphones.forEach(phone => {
    container.innerHTML += `
        <div class="card">
            <img src="${phone.img}" alt="${phone.name}">
            <h3>${phone.name}</h3>
            <p>${phone.price}</p>
            <button onclick="addToCart('${phone.name}', '${phone.price}')">
                Ajouter au panier
            </button>
        </div>
    `;
});