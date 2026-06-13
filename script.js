let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let products = [
  {
    id: 1,
    name: "iPhone 14",
    brand: "iphone",
    price: 2500,
    stock: 5,
    img: "images/iphone14.jpg"
  },
  {
    id: 2,
    name: "iPhone 13",
    brand: "iphone",
    price: 2000,
    stock: 3,
    img: "images/iphone13.jpg"
  },
  {
    id: 3,
    name: "Samsung S23",
    brand: "samsung",
    price: 1800,
    stock: 4,
    img: "images/samsung.jpg"
  }
];

// 🛒 ADD TO CART (WITH QUANTITY)
function addToCart(name, price){
  let item = cart.find(p => p.name === name);

  if(item){
    item.qty += 1;
  } else {
    cart.push({name, price, qty:1});
  }

  saveCart();
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


// 💾 SAVE CART
function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
  updateUI();
}


// 🔄 UPDATE COUNTERS
function updateUI(){

  let c = document.getElementById("cart-count");
  if(c){
    c.innerText = cart.reduce((sum,item)=>sum + item.qty, 0);
  }

  let w = document.getElementById("wish-count");
  if(w){
    w.innerText = wishlist.length;
  }
}


// 📦 DISPLAY PRODUCTS
function displayProducts(list) {
  let container = document.getElementById("products");

  container.innerHTML = "";

  list.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.img}" alt="${p.name}" class="product-img">
        <h3>${p.name}</h3>
        <p>${p.price} TND</p>
        <button onclick="addToCart(${p.id})">Ajouter au panier</button>
      </div>
    `;
  });
}

displayProducts(products);


// 🔍 FILTER
function filterProducts(type){
  if(type === "all"){
    displayProducts(products);
  } else {
    displayProducts(products.filter(p => p.type === type));
  }
}


// 🛒 CART PAGE (FULL UPGRADE)
function showCart(){
  let container = document.getElementById("cart");
  if(!container) return;

  let total = 0;
  container.innerHTML = "";

  cart.forEach((item, index)=>{

    let itemTotal = item.price * item.qty;
    total += itemTotal;

    container.innerHTML += `
      <div class="card">

        <h3>${item.name}</h3>
        <p>${item.price} TND</p>

        <div>
          <button onclick="minus(${index})">➖</button>
          <span>${item.qty}</span>
          <button onclick="plus(${index})">➕</button>
        </div>

        <p><b>${itemTotal} TND</b></p>

        <button onclick="removeItem(${index})">❌ Remove</button>

      </div>
    `;
  });

  container.innerHTML += `<h2>💰 Total: ${total} TND</h2>`;
}


// ➕ INCREASE
function plus(i){
  cart[i].qty += 1;
  saveCart();
  showCart();
}


// ➖ DECREASE
function minus(i){
  cart[i].qty -= 1;

  if(cart[i].qty <= 0){
    cart.splice(i,1);
  }

  saveCart();
  showCart();
}


// ❌ REMOVE
function removeItem(i){
  cart.splice(i,1);
  saveCart();
  showCart();
}


// 🔍 SEARCH
function searchProducts(){
  let value = document.getElementById("search").value.toLowerCase();

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  displayProducts(filtered);
}
function showSummary(){
  let container = document.getElementById("summary");
  let totalBox = document.getElementById("total");

  if(!container) return;

  let total = 0;
  container.innerHTML = "";

  cart.forEach(item=>{
    let itemTotal = item.price * item.qty;
    total += itemTotal;

    container.innerHTML += `
      <p>${item.name} x ${item.qty} = ${itemTotal} TND</p>
    `;
  });

  totalBox.innerText = "Total: " + total + " TND";
}


// 🚀 INIT
updateUI();
displayProducts(products);


// ⏳ LOADER
window.onload = ()=>{
  let l = document.getElementById("loader");
  if(l) l.style.display = "none";
};