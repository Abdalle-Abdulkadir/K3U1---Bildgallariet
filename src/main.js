async function loadData() {
  const response = await fetch("./src/images.json");
  return response.json();
}

// --- Modal (dialog) elements ---
const modal = document.querySelector("#image-modal");
const modalImg = document.querySelector("#modal-image");
const modalCaption = document.querySelector("#modal-caption");
const closeModalBtn = document.querySelector("#close-modal");

function openModal(item) {
  modalImg.src = item.src;          // show the clicked image in large view
  modalImg.alt = item.alt || "";    // keep accessibility text
  modalCaption.textContent = item.title || item.alt || ""; // caption text
  modal.showModal();                // open the dialog modal
}

// Close actions
closeModalBtn.addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.close(); // click outside content closes
});

function renderCategoryTabs(categories) {
  const tabs = document.querySelector("#category-tabs");
  tabs.innerHTML = "";

  for (const c of categories) {
    const li = document.createElement("li");
    const btn = document.createElement("button");

    btn.type = "button";
    btn.textContent = c.title;
    btn.addEventListener("click", () => {
      renderGallery(c.items);
      document.querySelector("#gallery-title").textContent = `Gallery (${c.title})`;
    });

    li.appendChild(btn);
    tabs.appendChild(li);
  }
}

function renderGallery(items) {
  const gallery = document.querySelector("#gallery");
  gallery.innerHTML = "";

  for (const item of items) {
    const li = document.createElement("li");
    const img = document.createElement("img");

    img.src = item.src;             // thumbnail src (your current image path)
    img.alt = item.alt || "";       // alt text
    img.loading = "lazy";           // performance

    img.addEventListener("click", () => openModal(item)); // ✅ left click opens modal

    li.appendChild(img);
    gallery.appendChild(li);
  }
}

async function init() {
  const data = await loadData();
  renderCategoryTabs(data.categories);
}

init();
