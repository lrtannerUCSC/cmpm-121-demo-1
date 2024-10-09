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

// Creating the button
const oilButton = document.createElement("button");
oilButton.textContent = "🏗️";

// Styling the button to be bigger
oilButton.style.backgroundColor = "#ffcc00"; // Light Orange
oilButton.style.border = "none";
oilButton.style.color = "white";
oilButton.style.padding = "25px 25px"; // Making it bigger
oilButton.style.fontSize = "64px";
oilButton.style.cursor = "pointer";

// Event listener for button click
oilButton.addEventListener("click", () => {
    oilCounter++;
    oilCount.textContent = `Oil counter: ${oilCounter}`;
});

// Initializing the oil counter
let oilCounter: number = 0;

// Creating and styling the oil counter display
const oilCount = document.createElement("div");
oilCount.textContent = `${oilCounter} Gallons of Oil `;

// Append elements to the app container
app.appendChild(header);
app.appendChild(oilButton);
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
oilCount.style.marginTop = "auto"; // Place oil counter at the bottom