//All of the products


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
