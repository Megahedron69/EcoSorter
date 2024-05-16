export const colorScale = [
  "#64B5F6",
  "#81C784",
  "#FFD54F",
  "#E57373",
  "#9575CD",
  "#4DB6AC",
  "#FF8A65",
  "#A1887F",
];
export const catos = [
  "Tech",
  "Baggy",
  "Metal",
  "Plastic",
  "Food",
  "Leaf",
  "Paper",
  "Wood",
];
export const classNames = [
  "E-Waste",
  "Plastic bags",
  "Metal cans",
  "Plastic bottles",
  "Food waste",
  "Leaf waste",
  "Paper waste",
  "Wood waste",
];
export const vals = [64, 47, 83, 67, 62, 67, 95, 73];
export const characterData = [
  {
    toxicity: 8,
    biodegradability: 2,
    recyclability: 7,
    durability: 5,
    carbonFootprint: 6,
  },
  {
    toxicity: 7,
    biodegradability: 1,
    recyclability: 3,
    durability: 8,
    carbonFootprint: 5,
  },
  {
    toxicity: 4,
    biodegradability: 3,
    recyclability: 9,
    durability: 9,
    carbonFootprint: 3,
  },
  {
    toxicity: 6,
    biodegradability: 2,
    recyclability: 6,
    durability: 7,
    carbonFootprint: 4,
  },
  {
    toxicity: 2,
    biodegradability: 9,
    recyclability: 1,
    durability: 2,
    carbonFootprint: 8,
  },
  {
    toxicity: 1,
    biodegradability: 10,
    recyclability: 2,
    durability: 3,
    carbonFootprint: 7,
  },
  {
    toxicity: 3,
    biodegradability: 8,
    recyclability: 8,
    durability: 4,
    carbonFootprint: 5,
  },
  {
    toxicity: 2,
    biodegradability: 7,
    recyclability: 5,
    durability: 6,
    carbonFootprint: 4,
  },
];

const wittyStringsMap = new Map([
  [
    "title",
    [
      "Recycle like a pro!",
      "Turn trash into treasure!",
      "Trash talking... about recycling!",
      "Sorting your waste? You're a superhero!",
      "Waste wizardry at its finest!",
    ],
  ],
  [
    "body",
    [
      "♻️ Don't let your trash go to waste!",
      "Trash-tastic! Scan your items for a green surprise!",
      "Greenify your day—scan your waste away! 🌿",
      "Recycle now, avoid the landfill frown!",
      "Be a recycling rockstar—scan and roll!",
    ],
  ],
]);

export const getRandomWittyString = (type) => {
  const strings = wittyStringsMap.get(type) || [];
  const randomIndex = Math.floor(Math.random() * strings.length);
  return strings[randomIndex];
};

const classNamesToCatosMap = {};
classNames.forEach((className, index) => {
  classNamesToCatosMap[className] = catos[index];
});

export const mapClassNameToCato = (className) => {
  return classNamesToCatosMap[className] || null;
};
