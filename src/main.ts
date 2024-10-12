// Importing styles
import "./style.css";

// Selecting the app container
const app: HTMLDivElement = document.querySelector("#app")!;

// Setting the game name and document title
const gameName = "Min-Maxing Environmental Damage";
document.title = gameName;

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
  oilCount.textContent = `${oilCounter.toFixed(0)} Gallons of Oil `;
});

// Initializing the oil counter
let oilCounter: number = 0;

// Initialize the oil growth speed
let oilGrowthSpeed = 1; // Initial rate of oil increment in oil per second

// Creating and styling the oil counter display
const oilCount = document.createElement("div");
oilCount.textContent = `${oilCounter.toFixed(0)} Gallons of Oil `;
oilCount.style.marginTop = "auto"; // Place oil counter at the bottom

let lastTime = 0; // Variable to store the timestamp from the previous frame

// Function to update the counter using requestAnimationFrame
function incrementCounter(currentTime: number) {
  if (lastTime > 0) {
    // Calculate the time elapsed since the last frame
    const timeElapsed = currentTime - lastTime;

    // Increase the counter by the fractional amount based on elapsed time
    oilCounter += (timeElapsed / 1000) * oilGrowthSpeed; // Convert milliseconds to seconds
    oilCount.textContent = `Oil counter: ${oilCounter.toFixed(0)}`; 
  }

  // Update the lastTime to the current timestamp
  lastTime = currentTime;

  // Request the next frame
  requestAnimationFrame(incrementCounter);
}

// Function to create an upgrade button with dynamic cost
function createUpgradeButton(text: string, cost: number, upgradeAction: () => void) {
  const button = document.createElement("button");
  button.textContent = `${text} (${cost} oil)`;
  button.style.backgroundColor = "#ffcc00"; // Light Orange
  button.style.border = "none";
  button.style.color = "black";
  button.style.padding = "25px 25px"; // Making it bigger
  button.style.fontSize = "32px";
  button.style.cursor = "pointer";

  button.addEventListener("click", () => {
    if (oilCounter >= cost) {
      oilCounter -= cost;
      oilCount.textContent = `Oil counter: ${oilCounter.toFixed(0)}`; 
      upgradeAction();
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
  oilGrowthSpeed += upgrade1Growth;
}

function upgradeAction2() {
  oilGrowthSpeed += upgrade2Growth;
}

function upgradeAction3() {
  oilGrowthSpeed += upgrade3Growth;
}

// Creating 3 different upgrade buttons with their respective costs
const upgradeButton1 = createUpgradeButton("0.1 Oil/s", 10, upgradeAction1);
const upgradeButton2 = createUpgradeButton("2.0 Oil/s", 20, upgradeAction2);
const upgradeButton3 = createUpgradeButton("50 Oil/s", 30, upgradeAction3);

// Append elements to the app container
app.appendChild(oilButton);
app.appendChild(upgradeButton1);
app.appendChild(upgradeButton2);
app.appendChild(upgradeButton3);
app.appendChild(oilCount);

// Styling the container to position elements
app.style.display = "flex";
app.style.flexDirection = "column";
app.style.alignItems = "center"; // Center elements horizontally
app.style.justifyContent = "center"; // Distribute space evenly
app.style.height = "100vh"; // Full viewport height
app.style.padding = "20px"; // Padding around the edges
app.style.boxSizing = "border-box"; // Includes padding in height

// Styles for the header (removed here for brevity)
// Start the animation loop
requestAnimationFrame(incrementCounter);