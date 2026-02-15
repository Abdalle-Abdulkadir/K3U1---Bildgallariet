function filterItems(items, query) {
  const q = (query || "").toLowerCase();

  if (q === "") {
    return [];
  }

  return items.filter((item) => {
    const title = String(item.title ?? "").toLowerCase();
    const tags = Array.isArray(item.tags) ? item.tags : [];

    const inTitle = title.includes(q);
    const inTags = tags.some((t) => String(t).toLowerCase().includes(q));

    return inTitle || inTags;
  });
}



//filters items by selected category (returns all if category is "All")
function filterByCategory(items, category) {
  if (category === "All") return items;

  return items.filter(item => item.category === category);
}

module.exports = { filterItems, filterByCategory };


 

  

  

