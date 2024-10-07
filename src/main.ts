import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Leif's amazing game and node JS sucks";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
