// Importing styles
import "./style.css";

// Selecting the app container
const app: HTMLDivElement = document.querySelector("#app")!;

// Setting the game name and document title
const gameName = "Capitalism.";
document.title = gameName;

// Create and style the game title element
const titleElement = document.createElement("h1");
titleElement.textContent = gameName;
titleElement.style.marginBottom = "200px"; // Add some space below the title

// Append the titleElement as the first element in the app container
app.appendChild(titleElement);

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

// Event listener for oilButton click
oilButton.addEventListener("click", () => {
  oilCounter++;
  oilCountText.textContent = `${oilCounter.toFixed(0)} Gallons of Oil `;
});

// Initialize the oil counter and growth speed
let oilCounter: number = 0;
let oilGrowthRate = 1; // Initial rate of oil increment in oil per second

let lastTime = 0; // Variable to store the timestamp from the previous frame

// Function to update the counter and growth rate display using requestAnimationFrame
function incrementCounter(currentTime: number) {
  if (lastTime > 0) {
    // Calculate the time elapsed since the last frame
    const timeElapsed = currentTime - lastTime;

    // Increase the counter by the fractional amount based on elapsed time
    oilCounter += (timeElapsed / 1000) * oilGrowthRate; // Convert milliseconds to seconds
    oilCountText.textContent = `Oil counter: ${oilCounter.toFixed(0)}`;
  }

  // Update growth rate text
  growthRateText.textContent = `${oilGrowthRate.toFixed(1)} Oil/s`;

  // Update the lastTime to the current timestamp
  lastTime = currentTime;

  // Request the next frame
  requestAnimationFrame(incrementCounter);
}

// Interface for items
interface Item {
  name: string;
  cost: number;
  rate: number;
}

// List of available items
const availableItems: Item[] = [
  { name: "Drill Manager", cost: 10, rate: 0.1 },
  { name: "Price Stabilizer", cost: 100, rate: 2 },
  { name: "Cartel Collaborator", cost: 1000, rate: 50 }
];

// Function to create an upgrade button with dynamic cost
function createUpgradeButton(item: Item) {
  const button = document.createElement("button");

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

  button.style.backgroundColor = "#ffcc00"; // Light Orange
  button.style.border = "none";
  button.style.color = "black";
  button.style.padding = "5px 5px"; // Making it bigger
  button.style.cursor = "pointer";
  button.style.marginBottom = "10px"; // Add space between buttons
  button.style.textAlign = "center"; // Center the text

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
      currentCost *= 1.15;  // Increase cost for the next purchase
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

// Create the upgrade buttons from the available items
const upgradeContainer = document.createElement("div");
upgradeContainer.style.position = "absolute";
upgradeContainer.style.bottom = "0"; // Align to the bottom
upgradeContainer.style.left = "0"; // Align to the left
upgradeContainer.style.display = "flex";
upgradeContainer.style.flexDirection = "column"; // Stack buttons vertically
upgradeContainer.style.margin = "10px"; // Optional: for padding from the edge

availableItems.forEach(item => {
  const upgradeButton = createUpgradeButton(item);
  upgradeContainer.appendChild(upgradeButton);
});

// Create stat display texts
const oilCountText = document.createElement("div");
oilCountText.textContent = `${oilCounter.toFixed(0)} Gallons of Oil `;

const growthRateText = document.createElement("div");
growthRateText.textContent = `${oilGrowthRate.toFixed(1)} Oil/s `;
growthRateText.style.fontSize = "32px";

// Create a container for Stat display texts
const statContainer = document.createElement("div");
statContainer.style.position = "absolute";
statContainer.style.top = "0"; // Align to the top
statContainer.style.right = "0"; // Align to the right
statContainer.style.display = "flex";
statContainer.style.flexDirection = "column"; // Stack texts vertically
statContainer.style.alignItems = "flex-end"; // Align texts to the right
statContainer.style.margin = "25px"; // Optional: for padding from the edge

// Append text elements to the statContainer
statContainer.appendChild(growthRateText);

// Append containers to the app container
app.appendChild(oilCountText);
app.appendChild(oilButton);
app.appendChild(statContainer);
app.appendChild(upgradeContainer);

// Styling the main container
app.style.display = "flex";
app.style.flexDirection = "column";
app.style.alignItems = "center"; // Center elements horizontally
app.style.justifyContent = "center"; // Distribute space evenly
app.style.height = "100vh"; // Full viewport height
app.style.padding = "20px"; // Padding around the edges
app.style.boxSizing = "border-box"; // Includes padding in height

// Start the animation loop
requestAnimationFrame(incrementCounter);