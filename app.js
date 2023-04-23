// forEach 구문은 자바스크립트 배열에만 쓸 수 있다. 그런데
// 그런데 getElementsByClassName() 펑션이 리턴하는 것은 것은 HTML Collection이지 배열이 아니다.
// 그래서 Array.from() 펑션을 이용해 배열로 만들어줘야 함.
const colorOption = Array.from(document.getElementsByClassName("color-option"));
const colorPicker = document.getElementById("colorPicker");
const lineThickness = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = lineThickness.value;

let isPainting = false;

function changeColor(newColor) {
  ctx.strokeStyle = newColor;
  ctx.fillStyle = newColor;
}

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
  ctx.beginPath();
}

function canclePainting() {
  isPainting = false;
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function colorPickerChange(event) {
  changeColor(event.target.value);
}

function onColorOptionPick(event) {
  let newColor = event.target.dataset.color;
  changeColor(newColor);
  colorPicker.value = newColor;
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", canclePainting);
canvas.addEventListener("mouseleave", canclePainting);

lineThickness.addEventListener("change", onLineWidthChange);
colorPicker.addEventListener("change", colorPickerChange);

colorOption.forEach((color) =>
  color.addEventListener("click", onColorOptionPick)
);
