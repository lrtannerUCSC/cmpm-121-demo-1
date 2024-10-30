// Importing styles
import "./style.css";

// Constants and Initial Setup
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Capitalism.";
document.title = gameName;

// Styling the main container
app.style.display = "flex";
app.style.flexDirection = "column";
app.style.alignItems = "center"; // Center elements horizontally
app.style.justifyContent = "center"; // Distribute space evenly
app.style.height = "100vh"; // Full viewport height
app.style.padding = "20px"; // Padding around the edges
app.style.boxSizing = "border-box"; // Includes padding in height

// Data Structures
interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Drill Manager",
    cost: 10,
    rate: 0.1,
    description:
      "Automates basic drilling operations to increase output and reduce manpower.",
  },
  {
    name: "Price Stabilizer",
    cost: 100,
    rate: 2,
    description:
      "Employs economic tactics to manage and influence oil prices subtly within the market.",
  },
  {
    name: "Regulatory Loophole",
    cost: 300,
    rate: 10,
    description:
      "Exploits legal gray areas to bypass regulations and maximize extraction rates.",
  },
  {
    name: "Cartel Collaborator",
    cost: 1000,
    rate: 50,
    description:
      "Forms influential and shadowy alliances with major players to control market movements and suppress competition.",
  },
  {
    name: "Bribery",
    cost: 5000,
    rate: 500,
    description:
      "Ensures favorable legislation and market conditions through strategic distribution of resources to key figures.",
  },
];

// Game State Variables
let oilCounter: number = 0;
let oilGrowthRate = 1;
let lastTime = 0;

// UI Elements and Initialization
const titleElement = document.createElement("h1");
titleElement.textContent = gameName;
titleElement.style.marginBottom = "200px"; // Add some space below the title
app.appendChild(titleElement);

// UI Stat Initilization
// Create a container for Stat display texts
const statContainer = document.createElement("div");
statContainer.style.position = "absolute";
statContainer.style.top = "0"; // Align to the top
statContainer.style.right = "0"; // Align to the right
statContainer.style.display = "flex";
statContainer.style.flexDirection = "column"; // Stack texts vertically
statContainer.style.alignItems = "flex-end"; // Align texts to the right
statContainer.style.margin = "25px"; // Optional: for padding from the edge
app.appendChild(statContainer);

const oilCountText = document.createElement("div");
oilCountText.textContent = `${oilCounter.toFixed(0)} Gallons of Oil `;
app.appendChild(oilCountText);

const growthRateText = document.createElement("div");
growthRateText.textContent = `${oilGrowthRate.toFixed(1)} Oil/s `;
growthRateText.style.fontSize = "32px";
statContainer.appendChild(growthRateText);

// Creating the oilButton
const oilButton = document.createElement("button");
oilButton.textContent = "🏗️";

// Styling the oilButton to be bigger
oilButton.style.backgroundColor = "#ffcc00"; // Light Orange
oilButton.style.border = "none";
oilButton.style.color = "white";
oilButton.style.padding = "25px 25px"; // Making it bigger
oilButton.style.fontSize = "64px";
oilButton.style.cursor = "pointer";
app.appendChild(oilButton);

// Utility Functions

// Apply button styling
function styleButton(button: HTMLElement, isAvailable: boolean = true) {
  button.style.backgroundColor = isAvailable ? "#ffcc00" : "gray";
  button.style.border = "none";
  button.style.color = "black";
  button.style.padding = "5px 5px";
  button.style.cursor = "pointer";
  button.style.textAlign = "center";
  button.style.marginBottom = "10px"; 
}

// Function to create an upgrade button with dynamic cost
function createUpgradeButton(item: Item) {
  const button = document.createElement("button");
  button.title = item.description; // Set description as the title for tooltip

  // Creating a main text element that displays the upgrade text and cost
  const mainText = document.createElement("div");
  mainText.textContent = `${item.name} (${item.cost.toFixed(2)} oil)`;
  mainText.style.fontSize = "20px"; // Large font size for main text

  // Creating a small text element for the purchase count
  const upgradeGrowthText = document.createElement("div");
  upgradeGrowthText.textContent = `${item.rate} Oil/s`;
  upgradeGrowthText.style.fontSize = "14px"; // Smaller font size for purchase count
  upgradeGrowthText.style.marginTop = "5px"; // Space above the purchase count

  // Creating a small text element for the purchase count
  const purchaseCountText = document.createElement("div");
  purchaseCountText.textContent = "0 purchased"; // Initial purchase count
  purchaseCountText.style.fontSize = "14px"; // Smaller font size for purchase count
  purchaseCountText.style.marginTop = "5px"; // Space above the purchase count

  styleButton(button);

  // Append text elements to the button
  button.appendChild(mainText);
  button.appendChild(upgradeGrowthText);
  button.appendChild(purchaseCountText);

  let purchaseCount = 0;
  let currentCost = item.cost;

  button.addEventListener("click", () => {
    if (oilCounter >= currentCost) {
      oilCounter -= currentCost;
      oilCountText.textContent = `Oil counter: ${oilCounter.toFixed(0)}`;
      oilGrowthRate += item.rate;
      currentCost *= 1.15; // Increase cost for the next purchase
      purchaseCount++;
      mainText.textContent = `${item.name} (${currentCost.toFixed(2)} oil)`;
      purchaseCountText.textContent = `${purchaseCount} purchases`;
    }
  });

  function checkAvailability() {
    if (oilCounter < currentCost) {
      button.style.backgroundColor = "gray";
    } else {
      button.style.backgroundColor = "#ffcc00"; // Light Orange
    }
    requestAnimationFrame(checkAvailability);
  }

  requestAnimationFrame(checkAvailability);
  return button;
}

// Event Handlers
// Event for oilButton click
oilButton.addEventListener("click", () => {
  oilCounter++;
  oilCountText.textContent = `${oilCounter.toFixed(0)} Gallons of Oil `;
});

// Dynamic UI Initilization
const upgradeContainer = document.createElement("div");
upgradeContainer.style.position = "absolute";
upgradeContainer.style.bottom = "0"; // Align to the bottom
upgradeContainer.style.left = "0"; // Align to the left
upgradeContainer.style.display = "flex";
upgradeContainer.style.flexDirection = "column"; // Stack buttons vertically
upgradeContainer.style.margin = "10px"; // Optional: for padding from the edge

availableItems.forEach((item) => {
  const upgradeButton = createUpgradeButton(item);
  upgradeContainer.appendChild(upgradeButton);
});
app.appendChild(upgradeContainer);

// Game Loop and Animation Functions
// Function to update the counter and growth rate display using requestAnimationFrame
function incrementCounter(currentTime: number) {
  // Extracted function to handle oil counter updates
  const updateOilCounter = (timeElapsed: number) => {
      oilCounter += (timeElapsed / 1000) * oilGrowthRate; // Convert milliseconds to seconds
      updateOilCounterText();
  };

  // Extracted function to update oil counter text
  const updateOilCounterText = () => {
      oilCountText.textContent = `Oil counter: ${oilCounter.toFixed(0)}`;
  };

  // Extracted function to update growth rate text
  const updateGrowthRateText = () => {
      growthRateText.textContent = `${oilGrowthRate.toFixed(1)} Oil/s`;
  };

  if (lastTime > 0) {
      const timeElapsed = currentTime - lastTime;
      updateOilCounter(timeElapsed);
  }

  updateGrowthRateText();
  lastTime = currentTime;

  requestAnimationFrame(incrementCounter);
}
requestAnimationFrame(incrementCounter);
