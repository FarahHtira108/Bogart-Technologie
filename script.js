let cart = JSON.parse(localStorage.getItem("cart")) || [];

const products = [
  {name:"iPhone 14", price:2500, type:"iphone", img:"images/iphone14.jpg"},
  {name:"iPhone 13", price:2000, type:"iphone", img:"images/iphone13.jpg"},
  {name:"iPhone 15", price:3200, type:"iphone", img:"images/iphone15.jpg"},

  {name:"Samsung S23", price:1800, type:"samsung", img:"images/s23.jpg"},
  {name:"Samsung S22", price:1500, type:"samsung", img:"images/s22.jpg"},
  {name:"Samsung A54", price:900, type:"samsung", img:"images/a54.jpg"},
];

// CART
function addToCart(name,price){
  cart.push({name,price});
  localStorage.setItem("cart",JSON.stringify(cart));
  updateCart();
}

// UPDATE COUNTER
function updateCart(){
  let c = document.getElementById("cart-count");
  if(c) c.innerText = cart.length;
}

// DISPLAY PRODUCTS
function displayProducts(list){
  let container = document.getElementById("products");
  if(!container) return;

  container.innerHTML="";

  list.forEach(p=>{
    container.innerHTML += `
      <div class="card">
        <img src="${p.img}" class="product-img">
        <h3>${p.name}</h3>
        <p>${p.price} TND</p>
        <button onclick="addToCart('${p.name}',${p.price})">Add</button>
      </div>
    `;
  });
}

// FILTER
function filterProducts(type){
  if(type=="all") displayProducts(products);
  else displayProducts(products.filter(p=>p.type==type));
}

// CART PAGE
function showCart(){
  let container = document.getElementById("cart");
  if(!container) return;

  let total=0;
  container.innerHTML="";

  cart.forEach(item=>{
    total += item.price;

    container.innerHTML += `
      <div class="card">
        <h3>${item.name}</h3>
        <p>${item.price} TND</p>
      </div>
    `;
  });

  container.innerHTML += `<h2>Total: ${total} TND</h2>`;
}

// SEARCH
function searchProducts(){
  let value=document.getElementById("search").value.toLowerCase();
  let filtered=products.filter(p=>p.name.toLowerCase().includes(value));
  displayProducts(filtered);
}

// INIT
updateCart();
displayProducts(products);

// LOADER
window.onload = ()=>{
  document.getElementById("loader").style.display="none";
};