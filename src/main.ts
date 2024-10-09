// Importing styles
import "./style.css";

// Selecting the app container
const app: HTMLDivElement = document.querySelector("#app")!;

// Setting the game name and document title
const gameName = "Min-Maxing Environmental Damage";
document.title = gameName;

// Creating and appending the header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

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
  oilCount.textContent = `${oilCounter} Gallons of Oil `;
});

// Creating the upgradeButton
const upgradeButton = document.createElement("button");
upgradeButton.textContent = "Upgrade";

// Styling the button to be bigger
upgradeButton.style.backgroundColor = "#ffcc00"; // Light Orange
upgradeButton.style.border = "none";
upgradeButton.style.color = "black";
upgradeButton.style.padding = "25px 25px"; // Making it bigger
upgradeButton.style.fontSize = "32px";
upgradeButton.style.cursor = "pointer";

// Upgrade active flag
let upgradeFlag = false;
// Event listener for button click
upgradeButton.addEventListener("click", () => {
  if (oilCounter>=10 && !upgradeFlag){
    upgradeFlag = true;
    upgradeButton.textContent = "Purchased"
    upgradeButton.style.backgroundColor = "gray";
  }
});

// Initializing the oil counter
let oilCounter: number = 0;

// Creating and styling the oil counter display
const oilCount = document.createElement("div");
oilCount.textContent = `${oilCounter} Gallons of Oil `;

// Set an interval for incrementing oilCounter every second
setInterval(() => {
  oilCounter++;
  oilCount.textContent = `${oilCounter} Gallons of Oil `;
}, 1000);

let lastTime = 0; // Variable to store the timestamp from the previous frame

// Function to update the counter using requestAnimationFrame
function incrementCounter(currentTime: number) {
  if (lastTime > 0) {
    // Calculate the time elapsed since the last frame
    const timeElapsed = currentTime - lastTime;

    // Increase the counter by the fractional amount based on elapsed time
    oilCounter += timeElapsed / 1000; // Add based on seconds elapsed
    oilCount.textContent = `Oil counter: ${oilCounter.toFixed(0)}`; // Display with two decimal places
  }

  // Update the lastTime to the current timestamp
  lastTime = currentTime;

  // Request the next frame
  requestAnimationFrame(incrementCounter);
}

function upgradeAvailability(){
    if (oilCounter<10 || upgradeFlag){
        upgradeButton.style.backgroundColor = "gray";
    }else{
        upgradeButton.style.backgroundColor = "#ffcc00"; // Light Orange
    }
    requestAnimationFrame(upgradeAvailability);
}

requestAnimationFrame(upgradeAvailability);
// Start the animation loop with the initial timestamp set to 0
requestAnimationFrame(incrementCounter);
// Append elements to the app container
app.appendChild(header);
app.appendChild(oilButton);
app.appendChild(upgradeButton);
app.appendChild(oilCount);

// Styling the container to position elements
app.style.display = "flex";
app.style.flexDirection = "column";
app.style.alignItems = "center"; // Center elements horizontally
app.style.justifyContent = "center"; // Distribute space evenly
app.style.height = "100vh"; // Full viewport height
app.style.padding = "20px"; // Padding around the edges
app.style.boxSizing = "border-box"; // Includes padding in height

// Styles for header, button, and oilCount after app flex setup
header.style.marginBottom = "auto"; // Place header at the top
oilButton.style.margin = "0"; // Ensure button stays centered without extra margin
oilButton.style.margin = "auto";
oilCount.style.marginTop = "auto"; // Place oil counter at the bottom
