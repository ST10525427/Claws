/*
*Project : Claws
* Student Name : Snenjabulo Mtetwa
* Students Number : st10525427
* GitHub : Super Simple Dev, JavaScript
*/

// AI DISCLOSURE:
// Meta AI (2026) was used to help debug the search/filter/sort logic.
// Decisions were written and reviewed by the author.

const PRODUCTS = [
  { id: 1, name: "Savage Royalty", 
    desc: "stilleto nails",
     price: 250,
      image: "images/nails.png", 
      stock: 10 },


  { id: 2, name: "Parisian purr",
     desc: "classic french tip",
      price: 180,
       image: "images/pexels-svliiim-34997575.jpg", 
       stock: 10 },


  { id: 3, name: "love letter",
     desc: "Almond nails with heart design",
      price: 180, image: "images/pexels-linda-markaj-449376348-15491630.jpg",
       stock: 8 },


  { id: 4, name: "Polka Bloom", 
    desc: "polka dot stilleto", 
    price: 270, 
    image: "images/nails 2.png",
     stock: 10 },


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
     price: 185, image: "images/pexels-svliiim-34871734.jpg", 
     stock: 10 },
  { id: 9, name: "Midnight dragon",
     desc: "Long stiletto, high-gloss jet black with 3D chrome abstract art",
      price: 195, image: "images/de-aura-Y5P9SyEEQWM-unsplash.jpg",
       stock: 6 },


  { id: 10, name: "Silver serpent",
     desc: "Short almond nails, 3D chrome abstract art",
      price: 280, 
      image: "images/de-aura-p4vthnb-INw-unsplash.jpg",
       stock: 10 },

  { id: 11, name: "Choco Swirl",
     desc: "Square nails, chocolate brown, caramel swirl",
      price: 280, image: "images/thu-n-minh-O-BJbUgZRuk-unsplash.jpg",
       stock: 10 },

  { id: 12, name: "Vampire kiss",
     desc: "Stiletto nails, 3D art, with a touch of red",
      price: 280, 
      image: "images/de-aura-NtDhTLXEonc-unsplash.jpg", 
      stock: 10 },


  { id: 13, name: "Silver Fang",
     desc: "Stiletto nails, with a chrome design and a touch of silver", 
     price: 250,
      image: "images/nail 10.png",
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
     price: 300, 
     image: "images/nails 14.png",
      stock: 8 },


  { id: 18, name: "Sunset leopard",
     desc: "long stiletto, black and orange leopard-print",
      price: 270, image: "images/nails 15.png", 
      stock: 10 },


  { id: 19, name: "Vegas Baby",
     desc: "Extra-long tapered square, mixed art",
      price: 450,
       image: "images/nails 16.png",
        stock: 4 },


  { id: 20, name: "Hibiscus Cutie",
     desc: "Medium almond, zebra-print French tips",
      price: 320,
       image: "images/nails 17.png", 
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
      price: 150, 
      image: "images/nails 8.png",
       stock: 6 },


  { id: 24, name: "hot cocoa",
     desc: "almond short dark brown nails", 
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

const searchInput = document.getElementById("searchInput");
const filterShape = document.getElementById("filterShape");
const sortList = document.getElementById("sortList");
const grid = document.querySelector(".shop-grid");

if (searchInput && filterShape && sortList && grid) {
  const figures = Array.from(grid.querySelectorAll("figure"));
  const originalOrder = new Map(figures.map(function (figure, index) {
    return [figure, index];
  }));
  const noResults = document.getElementById("noResults");

  function filterAndSort() {
    const search = searchInput.value.toLowerCase().trim();
    const shape = filterShape.value;
    const matchingFigures = new Set(figures.filter(function (figure) {
      const text = figure.textContent.toLowerCase().replace(/stilleto/g, "stiletto");
      const image = figure.querySelector("img");
      const imageAlt = image ? image.alt.toLowerCase() : "";
      return (text.includes(search) || imageAlt.includes(search)) &&
        (shape === "all" || text.includes(shape));
    }));

    const orderedFigures = figures.slice();
    if (sortList.value === "cheapest" || sortList.value === "expensive") {
      const direction = sortList.value === "cheapest" ? 1 : -1;
      orderedFigures.sort(function (a, b) {
        function priceFor(figure) {
          const units = figure.querySelector("[data-units-for]");
          const product = units ? getProduct(units.dataset.unitsFor) : null;
          return product ? product.price : 0;
        }
        return direction * (priceFor(a) - priceFor(b));
      });
    } else {
      orderedFigures.sort(function (a, b) {
        return originalOrder.get(a) - originalOrder.get(b);
      });
    }

    orderedFigures.forEach(function (figure) {
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

const CART_KEY = "claws_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "{}");
  } catch (error) {
    console.error("Unable to read the saved cart.", error);
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
  updateStockIndicators();
}

function unitsLeft(id) {
  var product = getProduct(id);
  if (!product) return 0;
  return Math.max(0, product.stock - (getCart()[id] || 0));
}

function cartTotal() {
  var cart = getCart();
  var total = 0;
  Object.keys(cart).forEach(function (id) {
    var product = getProduct(id);
    var quantity = Number(cart[id]);
    if (product && Number.isInteger(quantity) && quantity > 0) {
      total += product.price * quantity;
    }
  });
  return total;
}

function addToCart(id) {
  id = Number(id);
  var product = getProduct(id);
  if (!product) return "soldout";

  var cart = getCart();
  var currentQty = Number(cart[id]) || 0;
  if (currentQty >= product.stock) {
    return product.stock === 0 ? "soldout" : "max";
  }

  cart[id] = currentQty + 1;
  saveCart(cart);
  return "added";
}

function setQuantity(id, qty) {
  id = Number(id);
  var product = getProduct(id);
  if (!product) return;

  qty = Number(qty);
  var cart = getCart();
  if (qty <= 0) {
    delete cart[id];
  } else {
    cart[id] = Math.min(qty, product.stock);
  }
  saveCart(cart);
}

function removeFromCart(id) {
  var cart = getCart();
  delete cart[Number(id)];
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
  updateStockIndicators();
}

function updateCartCount() {
  var cart = getCart();
  var count = Object.keys(cart).reduce(function (total, id) {
    return total + (Number(cart[id]) || 0);
  }, 0);
  document.querySelectorAll(".cart-count").forEach(function (element) {
    element.textContent = count;
  });
}

function updateStockIndicators() {
  var cart = getCart();
  document.querySelectorAll("[data-units-for]").forEach(function (element) {
    var id = element.dataset.unitsFor;
    var product = getProduct(id);
    if (!product) return;
    var remaining = Math.max(0, product.stock - (Number(cart[id]) || 0));
    element.textContent = remaining + (remaining === 1 ? " unit left" : " units left");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  updateStockIndicators();
});

(function initializeCheckout() {
  var checkoutForm = document.getElementById("checkoutForm");
  if (!checkoutForm) return;

  var customOrderCode = localStorage.getItem("claws_custom_order_code");
  if (customOrderCode) {
    document.getElementById("customOrderCode").value = customOrderCode;
  }

  var cardFields = document.getElementById("cardFields");
  var cardNumber = document.getElementById("cardNumber");
  var expiry = document.getElementById("expiry");
  var cvv = document.getElementById("cvv");
  var hasSubmitted = false;

  function money(amount) {
    return "R" + amount.toFixed(2);
  }

  function checkoutItems() {
    var cart = getCart();
    return Object.keys(cart).reduce(function (items, id) {
      var product = getProduct(id);
      var quantity = Number(cart[id]);
      if (product && Number.isInteger(quantity) && quantity > 0) {
        items.push({ product: product, quantity: quantity });
      }
      return items;
    }, []);
  }

  function renderPaymentSummary() {
    var items = checkoutItems();
    var itemsList = document.getElementById("summaryItems");
    var subtotal = items.reduce(function (sum, item) {
      return sum + item.product.price * item.quantity;
    }, 0);
    var deliveryValue = document.getElementById("delivery").value;
    var deliveryFee = deliveryValue === "" ? 0 : Number(deliveryValue);
    var selectedPayment = document.querySelector('input[name="payment"]:checked');

    itemsList.replaceChildren();
    items.forEach(function (item) {
      var row = document.createElement("li");
      row.className = "summary-item";
      row.textContent = item.product.name + " × " + item.quantity + " — " +
        money(item.product.price * item.quantity);
      itemsList.appendChild(row);
    });

    document.getElementById("summaryEmpty").hidden = items.length > 0;
    document.getElementById("summarySubtotal").textContent = money(subtotal);
    document.getElementById("summaryDelivery").textContent =
      deliveryValue === "" ? "Choose delivery option" : money(deliveryFee);
    document.getElementById("summaryPayment").textContent =
      selectedPayment ? selectedPayment.value : "Choose payment method";
    document.getElementById("summaryTotal").textContent = money(subtotal + deliveryFee);
  }

  function setError(errorId, field, invalid) {
    var error = document.getElementById(errorId);
    error.hidden = !invalid;
    if (field) {
      if (invalid) field.setAttribute("aria-invalid", "true");
      else field.removeAttribute("aria-invalid");
    }
    return invalid;
  }

  function passesLuhn(value) {
    var digits = value.replace(/\D/g, "");
    if (!/^[\d\s-]+$/.test(value) || !/^\d{16}$/.test(digits)) return false;
    var sum = 0;
    var shouldDouble = false;
    for (var i = digits.length - 1; i >= 0; i--) {
      var digit = Number(digits[i]);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }

  function validExpiry(value) {
    var match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(value);
    if (!match) return false;
    var month = Number(match[1]);
    var year = 2000 + Number(match[2]);
    var today = new Date();
    return year > today.getFullYear() ||
      (year === today.getFullYear() && month >= today.getMonth() + 1);
  }

  function validateCheckout() {
    var firstInvalid = null;
    function check(errorId, field, invalid) {
      if (setError(errorId, field, invalid) && !firstInvalid) firstInvalid = field;
    }

    var fullName = document.getElementById("fullName");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var address = document.getElementById("address");
    var city = document.getElementById("city");
    var postal = document.getElementById("postal");
    var delivery = document.getElementById("delivery");
    var terms = document.getElementById("terms");
    var nameParts = fullName.value.trim().split(/\s+/);
    var phoneDigits = phone.value.replace(/\D/g, "");
    var payment = document.querySelector('input[name="payment"]:checked');

    check("errName", fullName, nameParts.length < 2 || !nameParts[0]);
    check("errEmail", email, !email.value.trim() || !email.validity.valid);
    check("errPhone", phone, !/^\+?[\d\s()-]+$/.test(phone.value.trim()) ||
      phoneDigits.length < 10 || phoneDigits.length > 15);
    check("errAddress", address, address.value.trim().length < 5);
    check("errCity", city, city.value.trim().length < 2);
    check("errPostal", postal, !/^\d{4}$/.test(postal.value.trim()));
    check("errDelivery", delivery, delivery.value === "");

    var cardSelected = payment && payment.value === "Card";
    cardFields.hidden = !cardSelected;
    var cardInvalid = cardSelected &&
      (!passesLuhn(cardNumber.value) || !validExpiry(expiry.value.trim()) ||
        !/^\d{3}$/.test(cvv.value.trim()));
    setError("errCard", null, cardInvalid);
    [cardNumber, expiry, cvv].forEach(function (field) {
      if (cardInvalid) field.setAttribute("aria-invalid", "true");
      else field.removeAttribute("aria-invalid");
    });
    if (cardInvalid && !firstInvalid) firstInvalid = cardNumber;

    check("errTerms", terms, !terms.checked);
    var cartEmpty = checkoutItems().length === 0;
    setError("errCart", null, cartEmpty);
    if (cartEmpty && !firstInvalid) firstInvalid = document.getElementById("errCart");

    return { valid: !firstInvalid, firstInvalid: firstInvalid };
  }

  function dismissSuccessMessage() {
    document.getElementById("successMessage").style.display = "none";
    document.getElementById("checkoutInvoice").hidden = true;
  }

  function createInvoice() {
    var items = checkoutItems();
    var subtotal = items.reduce(function (sum, item) {
      return sum + item.product.price * item.quantity;
    }, 0);
    var delivery = document.getElementById("delivery");
    var deliveryFee = Number(delivery.value);
    var payment = document.querySelector('input[name="payment"]:checked').value;
    var reference = "CLAWS-" + Date.now().toString(36).toUpperCase() + "-" +
      Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    var address = [
      document.getElementById("address").value.trim(),
      document.getElementById("city").value.trim(),
      document.getElementById("postal").value.trim()
    ].join(", ");
    var invoiceItems = document.getElementById("invoiceItems");

    document.getElementById("invoiceReference").textContent = reference;
    document.getElementById("invoiceCustomer").textContent =
      document.getElementById("fullName").value.trim();
    document.getElementById("invoiceEmail").textContent =
      document.getElementById("email").value.trim();
    document.getElementById("invoicePhone").textContent =
      document.getElementById("phone").value.trim();
    document.getElementById("invoiceAddress").textContent = address;
    document.getElementById("invoiceDelivery").textContent =
      delivery.options[delivery.selectedIndex].text;
    document.getElementById("invoicePayment").textContent = payment;
    document.getElementById("invoiceCustomReference").textContent =
      document.getElementById("customOrderCode").value || "Not applicable";
    document.getElementById("invoiceSubtotal").textContent = money(subtotal);
    document.getElementById("invoiceDeliveryFee").textContent = money(deliveryFee);
    document.getElementById("invoiceTotal").textContent = money(subtotal + deliveryFee);

    invoiceItems.replaceChildren();
    items.forEach(function (item) {
      var row = document.createElement("li");
      row.textContent = item.product.name + " × " + item.quantity + " — " +
        money(item.product.price * item.quantity);
      invoiceItems.appendChild(row);
    });

    document.getElementById("checkoutInvoice").hidden = false;
    document.getElementById("checkoutInvoice").scrollIntoView({ behavior: "smooth" });
  }

  document.getElementById("delivery").addEventListener("change", function () {
    dismissSuccessMessage();
    renderPaymentSummary();
    if (hasSubmitted) validateCheckout();
  });
  document.querySelectorAll('input[name="payment"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
      dismissSuccessMessage();
      cardFields.hidden = radio.value !== "Card";
      renderPaymentSummary();
      if (hasSubmitted) validateCheckout();
    });
  });
  checkoutForm.addEventListener("input", function () {
    dismissSuccessMessage();
    if (hasSubmitted) validateCheckout();
  });
  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();
    hasSubmitted = true;
    var result = validateCheckout();
    if (!result.valid) {
      if (result.firstInvalid && result.firstInvalid.focus) result.firstInvalid.focus();
      return;
    }
    createInvoice();
    document.getElementById("successMessage").style.display = "block";
  });

  document.getElementById("printInvoice").addEventListener("click", function () {
    window.print();
  });

  cardFields.hidden = document.querySelector('input[name="payment"]:checked').value !== "Card";
  renderPaymentSummary();
})();
