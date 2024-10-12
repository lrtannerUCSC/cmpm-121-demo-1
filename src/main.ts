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

// Function to create an upgrade button with dynamic cost
function createUpgradeButton(
  text: string,
  cost: number,
  upgradeAction: () => void,
) {
  const button = document.createElement("button");

  // Creating a main text element that displays the upgrade text and cost
  const mainText = document.createElement("div");
  mainText.textContent = `${text} (${cost} oil)`;
  mainText.style.fontSize = "32px"; // Large font size for main text

  // Creating a small text element for the purchase count
  const purchaseCountText = document.createElement("div");
  purchaseCountText.textContent = "0 purchased"; // Initial purchase count
  purchaseCountText.style.fontSize = "14px"; // Smaller font size for purchase count
  purchaseCountText.style.marginTop = "5px"; // Space above the purchase count

  button.style.backgroundColor = "#ffcc00"; // Light Orange
  button.style.border = "none";
  button.style.color = "black";
  button.style.padding = "25px 25px"; // Making it bigger
  button.style.cursor = "pointer";
  button.style.marginBottom = "10px"; // Add space between buttons
  button.style.textAlign = "center"; // Center the text

  // Append text elements to the button
  button.appendChild(mainText);
  button.appendChild(purchaseCountText);

  let purchaseCount = 0;

  button.addEventListener("click", () => {
    if (oilCounter >= cost) {
      oilCounter -= cost;
      oilCountText.textContent = `Oil counter: ${oilCounter.toFixed(0)}`;
      upgradeAction();
      purchaseCount++;
      purchaseCountText.textContent = `${purchaseCount} purchases`;
    }
  });

  function checkAvailability() {
    if (oilCounter < cost) {
      button.style.backgroundColor = "gray";
    } else {
      button.style.backgroundColor = "#ffcc00"; // Light Orange
    }
    requestAnimationFrame(checkAvailability);
  }

  requestAnimationFrame(checkAvailability);
  return button;
}

const upgrade1Growth = 0.1; // 0.1 oil/s
const upgrade2Growth = 2.0; // 2.0 oil/s
const upgrade3Growth = 50.0; // 50.0 oil/s



// Example upgrade actions
function upgradeAction1() {
  oilGrowthRate += upgrade1Growth;

}

function upgradeAction2() {
  oilGrowthRate += upgrade2Growth;

}

function upgradeAction3() {
  oilGrowthRate += upgrade3Growth;

}

// Creating 3 different upgrade buttons with their respective costs
const upgradeButton1 = createUpgradeButton(
  "0.1 Oil/s",
  10,
  upgradeAction1,
);
const upgradeButton2 = createUpgradeButton(
  "2.0 Oil/s",
  100,
  upgradeAction2,
);
const upgradeButton3 = createUpgradeButton(
  "50 Oil/s",
  1000,
  upgradeAction3,
);

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

// Create a container for upgrade buttons
const upgradeContainer = document.createElement("div");
upgradeContainer.style.position = "absolute";
upgradeContainer.style.bottom = "0"; // Align to the bottom
upgradeContainer.style.left = "0"; // Align to the left
upgradeContainer.style.display = "flex";
upgradeContainer.style.flexDirection = "column"; // Stack buttons vertically
upgradeContainer.style.margin = "10px"; // Optional: for padding from the edge

// Append upgrade buttons to the upgradeContainer
upgradeContainer.appendChild(upgradeButton1);
upgradeContainer.appendChild(upgradeButton2);
upgradeContainer.appendChild(upgradeButton3);

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
