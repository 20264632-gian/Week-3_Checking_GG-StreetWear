


// LOAD CART DATA
let cart = [];

try {
  cart = JSON.parse(localStorage.getItem("ggCart")) || [];
} catch (error) {
  cart = [];
}

// FIX CART QUANTITY
cart = cart.map(item => ({
  ...item,
  price: Number(item.price) || 0,
  quantity: Math.max(1, Number(item.quantity) || 1)
}));

// SAVE CART
function saveCart() {
  localStorage.setItem("ggCart", JSON.stringify(cart));
  updateCartCount();
}

// UPDATE CART COUNTER
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity, 0
  );

  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}

// ADD TO CART
function addToCart(name, price, image) {

  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: Number(price),
      image: image,
      quantity: 1
    });
  }

  saveCart();

  alert(name + " successfully added to cart!");
}

// BUY NOW
function buyNow(name, price, image) {

  addToCart(name, price, image);

  window.location.href = "cart.html";
}

// PRODUCT FILTERS
let selectedGender = "All";
let selectedCategory = "All";

function filterProducts() {

  const products = document.querySelectorAll(".card");
  let visibleCount = 0;

  products.forEach(product => {

    const genderMatch =
      selectedGender === "All" ||
      product.dataset.gender === selectedGender;

    const categoryMatch =
      selectedCategory === "All" ||
      product.dataset.category === selectedCategory;

    if (genderMatch && categoryMatch) {
      product.style.display = "";
      visibleCount++;
    } else {
      product.style.display = "none";
    }

  });

  const noProducts = document.getElementById("no-products");

  if (noProducts) {
    noProducts.hidden = visibleCount !== 0;
  }
}

// GENDER FILTER
document.querySelectorAll("#gender-filter [data-gender]")
.forEach(button => {

  button.addEventListener("click", function() {

    selectedGender = this.dataset.gender;

    document.querySelectorAll("#gender-filter .filter-btn")
    .forEach(btn => btn.classList.remove("active"));

    this.classList.add("active");

    filterProducts();

  });

});

// CATEGORY FILTER
document.querySelectorAll("#category-filter [data-category]")
.forEach(button => {

  button.addEventListener("click", function() {

    selectedCategory = this.dataset.category;

    document.querySelectorAll("#category-filter .filter-btn")
    .forEach(btn => btn.classList.remove("active"));

    this.classList.add("active");

    filterProducts();

  });

});

// INITIALIZE
updateCartCount();
filterProducts();

