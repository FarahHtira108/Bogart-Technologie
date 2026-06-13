let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let products = [
  { id: 1, name: "iPhone 14", brand: "iphone", type:"iphone", price: 2500, stock: 5, img: "images/iphone14.jpg" },
  { id: 2, name: "iPhone 13", brand: "iphone", type:"iphone", price: 2000, stock: 3, img: "images/iphone13.jpg" },
  { id: 3, name: "Samsung S23", brand: "samsung", type:"samsung", price: 1800, stock: 4, img: "images/samsung.jpg" }
];

// 🛒 ADD TO CART
function addToCart(name, price){
  let item = cart.find(p => p.name === name);

  if(item){
    item.qty += 1;
  } else {
    cart.push({name, price, qty:1});
  }

  saveCart();
}

// 💾 SAVE CART
function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
  updateUI();
}

// ❤️ WISHLIST
function addToWishlist(name){
  if(!wishlist.includes(name)){
    wishlist.push(name);
  } else {
    wishlist = wishlist.filter(p => p !== name);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateUI();
}

// 🔄 UI
function updateUI(){

  let c = document.getElementById("cart-count");
  if(c){
    c.innerText = cart.reduce((sum,i)=>sum+i.qty,0);
  }

  let w = document.getElementById("wish-count");
  if(w){
    w.innerText = wishlist.length;
  }
}

// 📦 DISPLAY PRODUCTS (FIXED)
function displayProducts(list){

  let container = document.getElementById("products");

  if(!container) return;

  container.innerHTML = "";

  list.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.img}" class="product-img">
        <h3>${p.name}</h3>
        <p>${p.price} TND</p>

        <button onclick="addToCart('${p.name}', ${p.price})">
          Ajouter
        </button>
      </div>
    `;
  });
}

// 🔍 SEARCH
function searchProducts(){
  let value = document.getElementById("search").value.toLowerCase();

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  displayProducts(filtered);
}

// 🛒 CART PAGE
function showCart(){

  let container = document.getElementById("cart");
  if(!container) return;

  let total = 0;
  container.innerHTML = "";

  cart.forEach((item,i)=>{
    let itemTotal = item.price * item.qty;
    total += itemTotal;

    container.innerHTML += `
      <div class="card">
        <h3>${item.name}</h3>
        <p>${item.price} TND</p>

        <p>${item.qty}</p>

        <button onclick="plus(${i})">➕</button>
        <button onclick="minus(${i})">➖</button>
        <button onclick="removeItem(${i})">❌</button>

        <p><b>${itemTotal} TND</b></p>
      </div>
    `;
  });

  container.innerHTML += `<h2>Total: ${total} TND</h2>`;
}

// ➕
function plus(i){
  cart[i].qty++;
  saveCart();
  showCart();
}

// ➖
function minus(i){
  cart[i].qty--;
  if(cart[i].qty <= 0) cart.splice(i,1);
  saveCart();
  showCart();
}

// ❌
function removeItem(i){
  cart.splice(i,1);
  saveCart();
  showCart();
}

// 🔍 FILTER
function filterProducts(type){
  if(type === "all"){
    displayProducts(products);
  } else {
    displayProducts(products.filter(p => p.type === type));
  }
}

// 🚀 INIT SAFE
window.onload = () => {
  let loader = document.getElementById("loader");
  if(loader) loader.style.display = "none";

  displayProducts(products);
  updateUI();
};