// Cart array to store added products
let cart = []

// Get all Add to Cart buttons
const cartButtons = document.querySelectorAll(".product-card button")

// Loop through each button and add a click listener
cartButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    const card = button.parentElement
    const productName = card.querySelector("h3").textContent
    const productPrice = card.querySelector("p").textContent

    cart.push({ name: productName, price: productPrice })//adds to the array 

    alert(productName + " added to cart! 🛒")
    console.log("Cart:", cart) //displays output
    //console.log(cart[0].name)
  })
})

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