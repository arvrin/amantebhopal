const XLSX = require("xlsx");
const fs = require("fs");

const workbook = XLSX.readFile("/Users/aaryavar/Downloads/Amante_Complete_Menu_12-04 zomato (1).xlsx");
const sheet = workbook.Sheets["Food Menu"];
const data = XLSX.utils.sheet_to_json(sheet);

const items = data.filter(item => item["Item Name"] && item["Price (₹)"]).map((item, index) => ({
  id: "nye-" + String(index + 1).padStart(3, "0"),
  name: item["Item Name"].trim(),
  description: item["Description"] || "",
  price: item["Price (₹)"],
  category: item["Category"] || "Specials",
  dietary: item["Dietary"] === "veg" ? ["veg"] : item["Dietary"] === "non-veg" ? ["non-veg"] : [],
  spiceLevel: item["Spice Level"] ? parseInt(item["Spice Level"]) : null,
  isAvailable: true
}));

const categories = {};
items.forEach(item => {
  if (!categories[item.category]) {
    categories[item.category] = [];
  }
  categories[item.category].push(item);
});

const categoryOrder = [
  "Appetizers & Starters",
  "Soups, Broth & Ramen",
  "Salads",
  "Dim Sums, Bao & Gyoza",
  "Sushi",
  "Pizza",
  "Pasta, Ravioli & Risotto",
  "Burgers & Sandwiches",
  "Noodle Bowls",
  "Grills & Mains",
  "Indian Main Course",
  "Hot Clay Pot & Tandoor",
  "Rice, Pulao & Biryani",
  "Specials"
];

const menuData = {
  venue: "nye",
  name: "New Year Special Menu",
  description: "A la carte dining for New Year 2026",
  tagline: "Ring in the New Year with exquisite flavors",
  validFrom: "2025-12-31",
  validTo: "2026-01-01",
  categories: categoryOrder.filter(cat => categories[cat]).map((catName, idx) => ({
    id: catName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""),
    name: catName,
    description: "",
    displayOrder: idx + 1,
    items: categories[catName]
  }))
};

fs.writeFileSync("src/data/menus/nye.json", JSON.stringify(menuData, null, 2));
console.log("Created src/data/menus/nye.json with", items.length, "items");
