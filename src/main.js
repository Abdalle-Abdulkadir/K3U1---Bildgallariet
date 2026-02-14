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
  modalImg.src = item.full || item.src;      // ✅ use full if exists, otherwise fallback
  modalImg.alt = item.alt || "";             // accessibility
  modalCaption.textContent = item.title || item.alt || "";
  modal.showModal();
}


// Close actions
closeModalBtn.addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.close(); // click outside content closes
});

function renderCategoryTabs(categories) {
  const tabs = document.querySelector("#category-tabs");
  tabs.innerHTML = "";

    // Create "All" tab
    const liAll = document.createElement("li");
    const btnAll = document.createElement("button");

    btnAll.type = "button";
    btnAll.textContent = "All";

    btnAll.addEventListener("click", () => {
        renderGallery(allItems);
        document.querySelector("#gallery-title").textContent = "Gallery (All)";
    });

    liAll.appendChild(btnAll);
    tabs.appendChild(liAll);


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

    img.src = item.thumb || item.src;             // thumbnail src (your current image path)
    img.alt = item.alt || "";       // alt text
    img.loading = "lazy";           // performance

    img.addEventListener("click", () => openModal(item)); // ✅ left click opens modal

    li.appendChild(img);
    gallery.appendChild(li);
  }
}

    let allItems = [];

// --- Search (tags + title) ---
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const q = searchInput.value.trim().toLowerCase();

  if (!q) {
    document.querySelector("#gallery").innerHTML = "";
    document.querySelector("#gallery-title").textContent = "Gallery";
    return;
  }

  const results = allItems.filter(item => {

    const inTags = (item.tags || [])
      .some(t => String(t).toLowerCase().includes(q));

    const inTitle = item.title
      ? item.title.toLowerCase().includes(q)
      : false;

    return inTags || inTitle;
  });

  renderGallery(results);
  document.querySelector("#gallery-title").textContent = `Search: ${q}`;
});

async function init() {
  const data = await loadData();

  renderCategoryTabs(data.categories);
  allItems = data.categories.flatMap(c => c.items);
}

init();





