const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let currentPos = { xPos: null, yPos: null };

canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = 2;

const colors = [
  "#ff3838",
  "#ffb8b8",
  "#c56cf0",
  "#ff9f1a",
  "#fff200",
  "#32ff7e",
  "#7efff5",
  "#18dcff",
  "#7d5fff",
];

function drawLine(event) {
  if (currentPos.xPos === null || currentPos.yPos === null) {
    currentPos.xPos = event.offsetX;
    currentPos.yPos = event.offsetY;
    return;
  }

  ctx.beginPath();
  ctx.moveTo(currentPos.xPos, currentPos.yPos);
  const color = colors[Math.floor(Math.random() * colors.length)];
  ctx.strokeStyle = color;
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();

  currentPos.xPos = event.offsetX;
  currentPos.yPos = event.offsetY;
}

canvas.addEventListener("mousemove", drawLine);
