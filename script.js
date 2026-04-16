// Products Array
let products =[];

function renderProducts(productList) {
  const productGrid = document.querySelector(".product-grid")
  productGrid.innerHTML = ""

  productList.forEach(function(product) {
    productGrid.innerHTML += `
      <div class="product-card">
        <img src="https://plus.unsplash.com/premium_photo-1661577094877-725f859aff3e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="${product.name}"/>
        <h3>${product.name}</h3>
        <p>KSh ${product.retail_price.toLocaleString()}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `
  })
}


///Filtering products based on the category //
function filterProducts(category, clickedButton) {
  const allButtons = document.querySelectorAll(".filter-btn")
  allButtons.forEach(function(btn) {
    btn.classList.remove("active")
  })
  clickedButton.classList.add("active")

  if (category === "all") {
    renderProducts(products)
  } else {
    const filtered = products.filter(function(p) {
      return p.category === category
    })
    renderProducts(filtered)
  }
}


// Add to cart function
function addToCart(productId) {
  const product = products.find(function(p) {
    return p.id === productId
  })

  cart.push({ name: product.name, price: "KSh " + product.price.toLocaleString() })
  document.getElementById("cartCount").textContent = cart.length
  alert(product.name + " added to cart! 🛒")
}

// Cart array to store added products
let cart = []



// Cart Sidebar
const cartSidebar = document.getElementById("cartSidebar")
const overlay = document.getElementById("overlay")
const closeCart = document.getElementById("closeCart")
const cartItems = document.getElementById("cartItems")
const cartTotal = document.getElementById("cartTotal")

// Open cart when icon is clicked
document.getElementById("cartIcon").addEventListener("click", function() {
  cartSidebar.classList.add("open")
  overlay.classList.add("active")
  renderCart()
})

// Close cart
closeCart.addEventListener("click", function() {
  cartSidebar.classList.remove("open")
  overlay.classList.remove("active")
})

overlay.addEventListener("click", function() {
  cartSidebar.classList.remove("open")
  overlay.classList.remove("active")
})

// Render cart items
function renderCart() {
  cartItems.innerHTML = ""
  let total = 0

  cart.forEach(function(item) {
    const price = parseInt(item.price.replace("KSh ", "").replace(",", ""))
    total += price

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>${item.price}</span>
      </div>
    `
  })

  cartTotal.textContent = "KSh " + total.toLocaleString()
}
 




///////////////////TIMER SECTION ///////////
// Set countdown duration (1 hour from now)
let totalSeconds = 3700

const hoursDisplay = document.getElementById("hours")
const minutesDisplay = document.getElementById("minutes")
const secondsDisplay = document.getElementById("seconds")

setInterval(function() {
  // Calculate hours, minutes, seconds
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  // Update the display
  hoursDisplay.textContent = String(hours).padStart(2, "0")
  minutesDisplay.textContent = String(minutes).padStart(2, "0")
  secondsDisplay.textContent = String(seconds).padStart(2, "0")

  // Subtract one second
  totalSeconds--
}, 1000)

///////////////Search Section ///////////////////
// Search functionality
const searchInput = document.getElementById("searchInput")

searchInput.addEventListener("input", function() {
  const searchTerm = searchInput.value.toLowerCase()
  
  const filtered = products.filter(function(p) {
    return p.name.toLowerCase().includes(searchTerm)
  })
  
  renderProducts(filtered)
})

fetch('http://localhost:5000/products')
  .then(response => response.json())
  .then(data => {
    products=data;
    renderProducts(products);
  });