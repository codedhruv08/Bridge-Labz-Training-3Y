// Q6: E-Commerce Dashboard - Product Card Fetcher (Fake Store API)
// Works in Node.js 18+ (console output) and in the browser (console + bonus cards).

const API_URL = "https://fakestoreapi.com/products";

async function loadProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);   // fetch does not reject on 404/500
    }
    const products = await response.json();

    // Log each product in the required format
    products.forEach((product) => {
      console.log(`Product: ${product.title}`);
      console.log(`Price: $${product.price}`);
      console.log(`Image: ${product.image}`);
      console.log("");
    });

    // Bonus: build HTML cards when running in a browser page
    if (typeof document !== "undefined") {
      renderCards(products);
    }
  } catch (error) {
    console.log("Failed to load products. Please try again.");
    if (typeof document !== "undefined") {
      document.getElementById("products").textContent = "Failed to load products. Please try again.";
    }
  }
}

// Bonus: create cards with document.createElement()
function renderCards(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.title;

    const title = document.createElement("h3");
    title.textContent = product.title;

    const price = document.createElement("p");
    price.textContent = `$${product.price}`;

    card.append(image, title, price);
    container.appendChild(card);
  });
}

loadProducts();
