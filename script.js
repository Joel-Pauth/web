// Dataset de productos estático
const products = [
  {
    id: 1,
    name: "Sérum Hidratante Ácido Hialurónico",
    category: "skincare",
    categoryLabel: "Cuidado Facial",
    price: "$28.00",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
    description: "Sérum intensivo de rápida absorción que hidrata profundamente las capas de la piel, reduciendo líneas de expresión y aportando un brillo natural."
  },
  {
    id: 2,
    name: "Labial Mate Velvet Nude",
    category: "makeup",
    categoryLabel: "Maquillaje",
    price: "$18.50",
    badge: "Nuevo",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600",
    description: "Labial líquido de larga duración con acabado aterciopelado. Fórmula no resecante enriquecida con vitamina E."
  },
  {
    id: 3,
    name: "Aceite Capilar Reparador de Argán",
    category: "haircare",
    categoryLabel: "Cuidado Capilar",
    price: "$24.00",
    badge: null,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFla18SGCPNJmLuKHu1jN1hJpFL6jrsy7W3sbaR2rSzA&s",
    description: "Tratamiento nutritivo para puntas abiertas que elimina el encrespamiento y devuelve el brillo sin dejar sensación grasa."
  },
  {
    id: 4,
    name: "Crema Limpiadora Suave",
    category: "skincare",
    categoryLabel: "Cuidado Facial",
    price: "$22.00",
    badge: null,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600",
    description: "Limpiador facial diario para pieles sensibles. Elimina impurezas y restos de maquillaje respetando la barrera cutánea."
  },
  {
    id: 5,
    name: "Paleta de Sombras 'Warm Earth'",
    category: "makeup",
    categoryLabel: "Maquillaje",
    price: "$35.00",
    badge: "Edición Limitada",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600",
    description: "12 tonos altamente pigmentados entre acabados mate y satinados, ideales para looks de día y de noche."
  },
  {
    id: 6,
    name: "Mascara Hidratante de Coco",
    category: "haircare",
    categoryLabel: "Cuidado Capilar",
    price: "$26.50",
    badge: null,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600",
    description: "Mascarilla intensiva que restaura el cabello dañado por calor o tintes, dejando una textura suave y sedosa."
  }
];

// Referencias al DOM
const productGrid = document.getElementById("productGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");

const modal = document.getElementById("productModal");
const closeModalBtn = document.getElementById("closeModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");

let currentCategory = "all";
let currentSearch = "";

// Renderizar tarjetas de productos
function renderProducts() {
  productGrid.innerHTML = "";

  const filteredProducts = products.filter(product => {
    const matchesCategory = currentCategory === "all" || product.category === currentCategory;
    const matchesSearch = product.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                          product.categoryLabel.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">No se encontraron productos que coincidan.</p>`;
    return;
  }

  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <div class="product-image-container">
        ${product.badge ? `<span class="badge">${product.badge}</span>` : ""}
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-category">${product.categoryLabel}</span>
        <h3 class="product-title">${product.name}</h3>
        <span class="product-price">${product.price}</span>
      </div>
    `;

    card.addEventListener("click", () => openModal(product));
    productGrid.appendChild(card);
  });
}

// Abrir Modal de Producto
function openModal(product) {
  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalTitle.textContent = product.name;
  modalCategory.textContent = product.categoryLabel;
  modalPrice.textContent = product.price;
  modalDescription.textContent = product.description;

  modal.classList.add("active");
}

// Cerrar Modal
function closeModal() {
  modal.classList.remove("active");
}

closeModalBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Eventos de Filtro por Categoría
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    renderProducts();
  });
});

// Evento de Búsqueda
searchInput.addEventListener("input", (e) => {
  currentSearch = e.target.value;
  renderProducts();
});

// Inicializar la vista
renderProducts();