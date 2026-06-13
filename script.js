let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const products = [
  {name:"iPhone 14", price:2500, type:"iphone", img:"images/iphone14.jpg"},
  {name:"iPhone 13", price:2000, type:"iphone", img:"images/iphone13.jpg"},
  {name:"iPhone 15", price:3200, type:"iphone", img:"images/iphone15.jpg"},

  {name:"Samsung S23", price:1800, type:"samsung", img:"images/s23.jpg"},
  {name:"Samsung S22", price:1500, type:"samsung", img:"images/s22.jpg"},
  {name:"Samsung A54", price:900, type:"samsung", img:"images/a54.jpg"},
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
function displayProducts(list){
  let container = document.getElementById("products");
  if(!container) return;

  container.innerHTML = "";

  list.forEach((p, index)=>{

    let liked = wishlist.includes(p.name) ? "❤️" : "🤍";

    container.innerHTML += `
      <div class="card" style="animation:fadeIn 0.3s ease ${index*0.05}s both;">

        <img src="${p.img}" class="product-img">

        <h3>${p.name}</h3>
        <p>${p.price} TND</p>

        <button onclick="addToCart('${p.name}',${p.price})">
          🛒 Add
        </button>

        <button onclick="addToWishlist('${p.name}')">
          ${liked} Wishlist
        </button>

      </div>
    `;
  });
}


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