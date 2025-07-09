<script>
  const menuOpenBtn = document.getElementById('menu-open-button');
  const menuCloseBtn = document.getElementById('menu-close-button');
  const navMenu = document.querySelector('.nav-menu');

  menuOpenBtn.addEventListener('click', () => {
    navMenu.style.display = 'block';
    menuOpenBtn.style.display = 'none';
    menuCloseBtn.style.display = 'inline';
  });

  menuCloseBtn.addEventListener('click', () => {
    navMenu.style.display = 'none';
    menuOpenBtn.style.display = 'inline';
    menuCloseBtn.style.display = 'none';
  });


  // 🛒 Cart badge update
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElem = document.getElementById("cart-count");
    if (cartCountElem) {
      cartCountElem.textContent = count;
      cartCountElem.style.display = count > 0 ? 'inline-block' : 'none';
    }
  }

  // 🧠 Helper: Unique ID generator
  function generateId(name, price, image) {
    return `${name}-${price}-${image}`;
  }

  // 🟢 Handle Add to Cart buttons
  document.querySelectorAll(".product-item").forEach(product => {
    const name = product.getAttribute("data-name");
    const price = parseFloat(product.getAttribute("data-price"));
    const image = product.getAttribute("data-image");
    const id = generateId(name, price, image);

    const addBtn = product.querySelector(".add-to-cart-btn");
    addBtn.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find(i => i.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ id, name, price, image, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert(`${name} added to cart!`);
    });
  });

  // ➖➕ Quantity buttons (if used on index.html)
  document.querySelectorAll(".product-item").forEach(product => {
    const name = product.getAttribute("data-name");
    const price = parseFloat(product.getAttribute("data-price"));
    const image = product.getAttribute("data-image");
    const id = generateId(name, price, image);

    const minusBtn = product.querySelector(".minus");
    const plusBtn = product.querySelector(".plus");
    const quantitySpan = product.querySelector(".quantity");

    if (minusBtn && plusBtn && quantitySpan) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(i => i.id === id);
      let quantity = existing ? existing.quantity : 0;
      quantitySpan.textContent = quantity;

      plusBtn.addEventListener("click", e => {
        e.stopPropagation();
        quantity++;
        quantitySpan.textContent = quantity;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const item = cart.find(i => i.id === id);
        if (item) {
          item.quantity++;
        } else {
          cart.push({ id, name, price, image, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
      });

      minusBtn.addEventListener("click", e => {
        e.stopPropagation();
        if (quantity > 0) {
          quantity--;
          quantitySpan.textContent = quantity;

          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          const index = cart.findIndex(i => i.id === id);
          if (index !== -1) {
            cart[index].quantity--;
            if (cart[index].quantity <= 0) {
              cart.splice(index, 1);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
          }
        }
      });
    }
  });

  // 🧾 Render Cart Items on Cart Page (if <ul id="cart-items"> exists)
  const container = document.getElementById("cart-items");
  if (container) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    container.innerHTML = "";

    if (cartItems.length === 0) {
      container.innerHTML = "<p style='padding: 40px; font-size: 18px;'>Your cart is empty.</p>";
    } else 
      cartItems.forEach(item => {
        const li = document.createElement("li");
        li.className = "product-item";
        li.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="product-image" />
          <h3 class="name">${item.name}</h3>
          <p class="text">Price: ৳${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
          <div class="cart-controls">
            <button class="remove-from-cart-btn" data-id="${item.id}">Remove One</button>
          </div>
        `;
        container.appendChild(li);
      });

      // 🗑️ Remove buttons
      container.querySelectorAll(".remove-from-cart-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const idToRemove = btn.getAttribute("data-id");
          let cart = JSON.parse(localStorage.getItem("cart")) || [];

          const index = cart.findIndex(i => i.id === idToRemove);
          if (index !== -1) {
            cart[index].quantity -= 1;
            if (cart[index].quantity <= 0) {
              cart.splice(index, 1);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload(); // রিফ্রেশ করলে cart রিরেন্ডার হয়
          }
        });
      });
    }
  

  // Initial count update
  updateCartCount();
</script>
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cart-items");

container.innerHTML = ''; // Clear previous items

if (cartItems.length === 0) {
  container.innerHTML = "<p style='padding: 40px; font-size: 18px;'>Your cart is empty.</p>";
} else {
  cartItems.forEach(item => {
    const li = document.createElement("li");
    li.className = "product-item";
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="product-image" />
      <h3 class="name">${item.name}</h3>
      <p class="text">Price: ৳${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
      <div class="cart-controls">
        <button class="remove-from-cart-btn" data-id="${item.id}">Remove One</button>
      </div>
    `;
    container.appendChild(li);
  });
}
