const { filterItems, filterByCategory } = require("../src/filterItems");

describe("filterItems", () => {
  test("returns correct items when matching title (case-insensitive)", () => {
    const items = [
      { title: "Lion", tags: ["animal"] },
      { title: "Paris", tags: ["city"] },
    ];

    const result = filterItems(items, "liOn");

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Lion");
  });

  test("returns correct items when matching tags (case-insensitive)", () => {
    const items = [
      { title: "Lion", tags: ["Animal"] },
      { title: "Paris", tags: ["city"] },
    ];

    const result = filterItems(items, "animal");

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Lion");
  });
});

// Should return no items when search query is empty
test("returns empty array when query is empty", () => {
  const items = [
    { title: "Lion", tags: ["animal"] },
    { title: "Paris", tags: ["city"] },
  ];

  const result = filterItems(items, "");

  expect(result).toHaveLength(0);
});

//should return an empty array when no items match the search query
test("returns empty array when no items match query", () => {
  const items = [
    { title: "Lion", tags: ["animal"] },
    { title: "Paris", tags: ["city"] },
  ];

  const result = filterItems(items, "basket");

  expect(result).toHaveLength(0);
});

// Should match items regardless of uppercase/lowercase in query
test("matches query regardless of case", () => {
  const items = [
    { title: "Lion", tags: ["animal"] },
    { title: "Paris", tags: ["city"] },
  ];

  const result = filterItems(items, "LiOn");

  expect(result).toHaveLength(1);
  expect(result[0].title).toBe("Lion");
});

// Should not crash if item has missing title or tags
test("handles items with missing fields safely", () => {
  const items = [
    { title: "Lion" },                 // no tags
    { tags: ["animal"] },              // no title
    {},                                // completely empty
  ];

  const result = filterItems(items, "lion");

  expect(Array.isArray(result)).toBe(true);
});




// Should return only items that match selected category
test("filters items by category", () => {
  const items = [
    { title: "Lion", category: "Animals" },
    { title: "Basket Shot", category: "Basketball" },
  ];

  const result = filterByCategory(items, "Animals");

  expect(result).toHaveLength(1);
  expect(result[0].title).toBe("Lion");
});

// Should parse JSON data correctly into an array of objects
test("parses JSON data correctly", () => {
  const jsonString = `
    [
      { "title": "Lion", "category": "Animals" },
      { "title": "Paris", "category": "World_cities" }
    ]
  `;

  const data = JSON.parse(jsonString);

  expect(Array.isArray(data)).toBe(true);
  expect(data).toHaveLength(2);
  expect(data[0].title).toBe("Lion");
});



