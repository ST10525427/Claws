/*
*Project : Claws 
* Student Name : Snenjabulo Mtetwa
* Students Number : st10525427
* *Code attribution and Reference:
* GitHub : Super Simple Dev , Javascript Lesson 13
 */

//CART SAVED IN BROWSER (localStorage)
const CART_KEY = "claws_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "{}");
  } catch(e) {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
  updateStockIndicators();
}

// How many still available to buy
function unitsLeft(id) {
  var p = getProduct(id);
  if (!p) return 0;
  var cart = getCart();
  var inCart = cart[id] || 0;
  return Math.max(0, p.stock - inCart);
}

function cartTotal() {
  var cart = getCart();
  var total = 0;
  for (var id in cart) {
    var p = getProduct(id);
    if (p) total += p.price * cart[id];
  }
  return total;
}

function addToCart(id) {
  id = Number(id);
  var p = getProduct(id);
  if (!p) return "soldout";
  
  var cart = getCart();
  var currentQty = cart[id] || 0;
  
  if (currentQty >= p.stock) {
    return p.stock === 0 ? "soldout" : "max";
  }
  
  cart[id] = currentQty + 1;
  saveCart(cart);
  return "added";
}
//change's the quantity of a product in the cart, if qty is 0 or less, removes it from the cart
function setQuantity(id, qty) {
  id = Number(id);
  var p = getProduct(id);
  if (!p) return;
  
  qty = Number(qty);
  var cart = getCart();
  
  if (qty <= 0) {
    delete cart[id];
  } else {
    if (qty > p.stock) qty = p.stock;
    cart[id] = qty;
  }
  saveCart(cart);
}

function removeFromCart(id) {
  var cart = getCart();
  delete cart[Number(id)];
  saveCart(cart);
}
// Clear the cart completely after going to check out 
function clearCart(){
  localStorage.removeItem(CART_KEY);
  saveCart({});
}

function updateCartCount() {
  var cart = getCart();
  var count = 0;
  for (var id in cart) count += cart[id];
  
  document.querySelectorAll(".cart-count").forEach(function(el) {
    el.textContent = count;
  });
}
//Show how many products are left in stock for each item in the cart
function updateStockIndicators() {
  var cart = getCart();
  document.querySelectorAll("[data-units-for]").forEach(function(el) {
    var id = el.dataset.unitsFor;
    var p = getProduct(id);
    if(!p) return;
    var remaining = Math.max(0, p.stock - (cart[id] || 0));
    el.textContent = remaining + (remaining === 1 ? " unit left" : " units left");
  });
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  updateStockIndicators();
});