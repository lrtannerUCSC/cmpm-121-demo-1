import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Leif's amazing game and node JS sucks";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const oilButton = document.createElement("button");
oilButton.textContent = "🏗️";

oilButton.style.backgroundColor = "#ffcc00"; // Light Orange
oilButton.style.border = "none";
oilButton.style.color = "white";
oilButton.style.padding = "10px 20px";
oilButton.style.fontSize = "16px";
oilButton.style.cursor = "pointer";

oilButton.addEventListener("click", () => {});

document.body.appendChild(oilButton);
