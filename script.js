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