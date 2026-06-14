let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let products = [

{
id:1,
name:"iPhone 14",
type:"iphone",
price:2500,
stock:5,
img:"images/iphone14.jpg.webp.webp"
},

{
id:2,
name:"iPhone 13",
type:"iphone",
price:2000,
stock:4,
img:"images/iphone13.jpg"
},

{
id:3,
name:"Samsung S23",
type:"samsung",
price:1800,
stock:6,
img:"images/samsung.jpg"
},

{
id:4,
name:"MacBook Air M2",
type:"macbook",
price:4200,
stock:2,
img:"images/macbook.jpg"
},

{
id:5,
name:"AirPods Pro",
type:"accessoire",
price:850,
stock:10,
img:"images/airpods.jpg"
}

];

function displayProducts(list){

let container=document.getElementById("products");

container.innerHTML="";

list.forEach(p=>{

container.innerHTML+=`

<div class="card">

<img src="${p.img}" class="product-img">

<h3>${p.name}</h3>

<p>${p.price} TND</p>

<p>Stock : ${p.stock}</p>

<button class="cart-btn"
onclick="addToCart('${p.name}',${p.price})">
🛒 Ajouter
</button>

<button class="wish-btn"
onclick="addToWishlist('${p.name}')">
❤️ Favori
</button>

</div>

`;

});

}

function addToCart(name,price){

let item=cart.find(p=>p.name===name);

if(item){
item.qty++;
}else{
cart.push({
name,
price,
qty:1
});
}

saveCart();

}

function saveCart(){

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateUI();

}

function addToWishlist(name){

if(!wishlist.includes(name)){
wishlist.push(name);
}else{
wishlist=wishlist.filter(
p=>p!==name
);
}

localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);

updateUI();

}

function updateUI(){

document.getElementById(
"cart-count"
).innerText=
cart.reduce((s,i)=>s+i.qty,0);

document.getElementById(
"wish-count"
).innerText=
wishlist.length;

showCart();

}

function showCart(){

let cartDiv=document.getElementById("cart");

let total=0;

cartDiv.innerHTML="";

cart.forEach((item,index)=>{

total+=item.price*item.qty;

cartDiv.innerHTML+=`

<div class="card">

<h3>${item.name}</h3>

<p>${item.price} TND</p>

<p>Quantité : ${item.qty}</p>

<button onclick="plus(${index})">➕</button>

<button onclick="minus(${index})">➖</button>

</div>

`;

});

cartDiv.innerHTML+=`
<h2>Total : ${total} TND</h2>
`;

}

function plus(i){
cart[i].qty++;
saveCart();
}

function minus(i){

cart[i].qty--;

if(cart[i].qty<=0){
cart.splice(i,1);
}

saveCart();

}

function searchProducts(){

let value=
document.getElementById("search")
.value
.toLowerCase();

displayProducts(
products.filter(p=>
p.name.toLowerCase()
.includes(value)
)
);

}

function filterProducts(type){

if(type==="all"){
displayProducts(products);
}else{
displayProducts(
products.filter(
p=>p.type===type
)
);
}

}

window.onload=()=>{

setTimeout(()=>{
document.getElementById(
"loader"
).style.display="none";
},1000);

displayProducts(products);

updateUI();

};