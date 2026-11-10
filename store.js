/*
*Project : Claws 
* Student Name : Snenjabulo Mtetwa
* Students Number : st10525427
* *Code attribution and Reference:
* GitHub : Super Simple Dev , Javascript 
 */



//All of the products

// AI DISCLOSURE:
// Meta AI (2026) was used to help debug the search/filter/sort logic
// decisions were written / reviewed by the author.


const PRODUCTS = [
  { id: 1, name: "Savage Royalty",
     desc: "stilleto nails",
      price: 250,
     image: "images/nails.png", stock: 10 },

  { id: 2, name: "Parisian purr",
     desc: "classic french tip",
      price: 180,
       image: "images/pexels-svliiim-34997575.jpg", stock: 10 },


  { id: 3, name: "love letter",
     desc: "Almond nails with heart design",
      price: 180, image: "images/pexels-linda-markaj-449376348-15491630.jpg",
       stock: 8 },


  { id: 4, name: "Polka Bloom",
     desc: "polka dot stilleto", 
     price: 270,
     image: "images/nails 2.png", stock: 10 },


  { id: 5, name: "Strawberry Picnic",
    desc: "Almond nails",
    price: 200,
    image: "images/ari-kurniawan-qVZNmigGmFE-unsplash.jpg",
    stock: 10 },


  { id: 6, name: "Tropical Temptation",
    desc: "stilleto",
    price: 280,
    image: "images/nail 3.png",
    stock: 5 },


  { id: 7, name: "fall Blossom",
    desc: "Square nails with flower design",
    price: 300,
    image: "images/nails 6.png",
    stock: 7 },   


  { id: 8, name: "Candy cane swirl",
    desc: "Almond nails with candy cane design",
    price: 185,
    image: "images/pexels-svliiim-34871734.jpg",
    stock: 10 },


  { id: 9, name: "Midnight dragon",
    desc: "Long stiletto, high-gloss jet black with 3D chrome abstract art",
    price: 195, image: "images/de-aura-Y5P9SyEEQWM-unsplash.jpg",
    stock: 6 },


  { id: 10, name: "Silver serpent",
    desc: "Short almond nails, 3D chrome abstract art",
    price: 280, image: "images/de-aura-p4vthnb-INw-unsplash.jpg",
    stock: 10 },

    
  { id: 11, name: "Choco Swirl",
     desc: "Square nails, chocolate brown, caramel swirl",
      price: 280, image: "images/thu-n-minh-O-BJbUgZRuk-unsplash.jpg",
       stock: 10 },


  { id: 12, name: "Vampire kiss", 
    desc: "Stiletto nails, 3D art, with a touch of red",
     price: 280, image: "images/de-aura-NtDhTLXEonc-unsplash.jpg",
      stock: 10 },
  { id: 13, name: "Silver Fang",
     desc: "Stiletto nails, with a chrome design and a touch of silver",
      price: 250, image: "images/nail 10.png",
       stock: 10 },


  { id: 14, name: "pink petal Royalty",
     desc: "3D embossed white daisy petals with gold studs",
      price: 220, image: "images/nails 11.png",
       stock: 10 },
  { id: 15, name: "Cherry wine",
     desc: "long stiletto, glossy nude with burgundy aura fade",
      price: 240, image: "images/nails 12.png",
       stock: 10 },


  { id: 16, name: "Jungle Blush",
     desc: "long stiletto, zebra print with gold studs",
      price: 240, image: "images/nails 13.png",
       stock: 10 },


  { id: 17, name: "Candy Croc", 
    desc: "long stiletto, pink and lime-yellow croc-print",
     price: 300, image: "images/nails 14.png",
      stock: 8 },


  { id: 18, name: "Sunset leopard",
     desc: "long stiletto, black and orange leopard-print",
      price: 270, image: "images/nails 15.png",
       stock: 10 },


  { id: 19, name: "Vegas Baby",
     desc: "Extra-long tapered square, mixed art", 
     price: 450, image: "images/nails 16.png",
      stock: 4 },


  { id: 20, name: "Hibiscus Cutie", 
    desc: "Medium almond, zebra-print French tips",
     price: 320, image: "images/nails 17.png", 
     stock: 10 },


  { id: 21, name: "Ocean Petal",
     desc: "Long almond, white French with blue flowers",
      price: 320, image: "images/nails 18.png",
       stock: 10 },

       { id: 22, name: "Scarlet fever",
     desc: "Red stiletto nails",
      price: 150, image: "images/nails 7.png",
       stock: 4 },

       { id: 23, name: "hot chocolate",
     desc: "Square long dark brown nails",
      price: 150, image: "images/nails 8.png",
       stock: 6 },

       { id: 24, name: "hot cocoa",
      desc: "almond short  dark brown nails",
      price: 150, image: "images/nails 9.png",
       stock: 10 }

];



function getProduct(id) {
  id = Number(id);
  for (var i = 0; i < PRODUCTS.length; i++) {
    if (PRODUCTS[i].id === id) return PRODUCTS[i];
  }
  return null;
}
//Code attribution and Reference:
//REFERENCE - Search & Filter idea adapted from:
// Rahmati, A. (n.d.) Product-Filter-and-Search. Available at:
// https://github.com/rhmti01/Product-Filter-and-Search/blob/main/src/js/app.js
// (Accessed: 9 November 2026)
// The code below was rewritten for CLAWS products, shapes and prices.


// Get the search box, shape filter 

const searchInput = document.getElementById("searchInput");
const filterShape = document.getElementById("filterShape");
const sortList = document.getElementById("sortList");
const grid = document.querySelector(".shop-grid");

if (searchInput && filterShape && sortList && grid) {
  const figures = [...grid.querySelectorAll("figure")];
  const originalOrder = new Map(figures.map((figure, index) => [figure, index]));
  const noResults = document.getElementById("noResults");

  function filterAndSort() {
    const search = searchInput.value.toLowerCase().trim();
    const shape = filterShape.value;

    // Find which nails match BOTH search and  shape
    const matchingFigures = new Set(figures.filter(figure => {
      const text = figure.textContent.toLowerCase().replace(/stilleto/g, "stiletto");
      const imageAlt = figure.querySelector("img")?.alt.toLowerCase() || "";
      const matchesSearch = text.includes(search) || imageAlt.includes(search);
      const matchesShape = shape === "all" || text.includes(shape);
      return matchesSearch && matchesShape;
    }));

    // Sort the nails based on the selected  option

    const orderedFigures = [...figures];
    if (sortList.value === "cheapest" || sortList.value === "expensive") {
      const direction = sortList.value === "cheapest" ? 1 : -1;
      orderedFigures.sort((a, b) => {
        const priceFor = figure => {
          const units = figure.querySelector("[data-units-for]");
          const product = units && getProduct(units.dataset.unitsFor);
          return product ? product.price : 0;
        };
        return direction * (priceFor(a) - priceFor(b));
      });
    } else {
      orderedFigures.sort((a, b) => originalOrder.get(a) - originalOrder.get(b));
    }

    orderedFigures.forEach(figure => {
      figure.style.display = matchingFigures.has(figure) ? "" : "none";
      grid.appendChild(figure);
    });

    if (noResults) noResults.hidden = matchingFigures.size > 0;
  }

  searchInput.addEventListener("input", filterAndSort);
  filterShape.addEventListener("change", filterAndSort);
  sortList.addEventListener("change", filterAndSort);
  filterAndSort();
}

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

(function initializeCheckout() {
  var checkoutForm = document.getElementById("checkoutForm");
  if (!checkoutForm) return;

  var checkoutFields = [
    { input: "fullName", error: "errName" },
    { input: "email", error: "errEmail" },
    { input: "phone", error: "errPhone" },
    { input: "address", error: "errAddress" },
    { input: "city", error: "errCity" },
    { input: "postal", error: "errPostal" },
    { input: "delivery", error: "errDelivery" },
    { input: "terms", error: "errTerms" }
  ];
  var orderSummary = document.getElementById("summaryItems");
  var deliverySelect = document.getElementById("delivery");
  var attemptedSubmit = false;

  function money(amount) {
    return "R" + amount.toFixed(2);
  }

  function fieldIsValid(fieldId) {
    var field = document.getElementById(fieldId);
    var value = field.value.trim();

    if (fieldId === "fullName") return value.length >= 3;
    if (fieldId === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (fieldId === "phone") {
      var digits = value.replace(/\D/g, "");
      return /^0\d{9}$/.test(digits) || /^27\d{9}$/.test(digits);
    }
    if (fieldId === "address") return value.length >= 5;
    if (fieldId === "city") return value.length >= 2;
    if (fieldId === "postal") return /^\d{4}$/.test(value);
    if (fieldId === "delivery") return value !== "";
    if (fieldId === "terms") return field.checked;
    return true;
  }

  function showFieldError(field, showError) {
    var input = document.getElementById(field.input);
    var error = document.getElementById(field.error);
    error.classList.toggle("is-visible", showError);
    if (input.type !== "checkbox") {
      input.setAttribute("aria-invalid", showError ? "true" : "false");
    }
    return !showError;
  }

  function updateSummary() {
    var cart = getCart();
    var subtotal = 0;
    var itemCount = 0;
    orderSummary.replaceChildren();

    Object.keys(cart).forEach(function (id) {
      var product = getProduct(id);
      var quantity = Number(cart[id]);
      if (!product || !Number.isInteger(quantity) || quantity < 1) return;

      subtotal += product.price * quantity;
      itemCount += quantity;

      var item = document.createElement("li");
      item.className = "summary-item";

      var details = document.createElement("span");
      details.className = "summary-item-name";
      details.textContent = product.name + " ";
      var quantityLabel = document.createElement("span");
      quantityLabel.className = "summary-item-quantity";
      quantityLabel.textContent = "× " + quantity;
      details.appendChild(quantityLabel);

      var price = document.createElement("span");
      price.className = "summary-item-price";
      price.textContent = money(product.price * quantity);
      item.append(details, price);
      orderSummary.appendChild(item);
    });

    var deliveryCost = deliverySelect.value === "" ? null : Number(deliverySelect.value);
    var total = subtotal + (deliveryCost || 0);
    document.getElementById("summarySubtotal").textContent = money(subtotal);
    document.getElementById("summaryDelivery").textContent =
      deliveryCost === null ? "Choose an option" : money(deliveryCost);
    document.getElementById("summaryTotal").textContent = money(total);
    document.getElementById("summaryEmpty").hidden = itemCount > 0;
    checkoutForm.querySelector('[type="submit"]').disabled = itemCount === 0;
  }

  checkoutFields.forEach(function (field) {
    var input = document.getElementById(field.input);
    input.setAttribute("aria-describedby", field.error);
    input.addEventListener(input.tagName === "SELECT" || input.type === "checkbox" ? "change" : "input", function () {
      if (attemptedSubmit) showFieldError(field, !fieldIsValid(field.input));
      if (field.input === "delivery") updateSummary();
      document.getElementById("successMessage").classList.remove("is-visible");
    });
    input.addEventListener("blur", function () {
      if (input.value.trim() || input.type === "checkbox" || input.tagName === "SELECT") {
        showFieldError(field, !fieldIsValid(field.input));
      }
    });
  });

  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();
    attemptedSubmit = true;
    var firstInvalid = null;
    var isValid = true;

    checkoutFields.forEach(function (field) {
      var fieldValid = showFieldError(field, !fieldIsValid(field.input));
      if (!fieldValid) {
        isValid = false;
        if (!firstInvalid) firstInvalid = document.getElementById(field.input);
      }
    });

    if (!isValid) {
      document.getElementById("successMessage").classList.remove("is-visible");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    document.getElementById("successMessage").classList.add("is-visible");
  });

  updateSummary();
})();