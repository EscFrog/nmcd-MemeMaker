const saveBtn = document.getElementById("saveBtn");
const textInput = document.getElementById("textInput");
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const clearBtn = document.getElementById("clear-btn");
const eraserBtn = document.getElementById("eraser-btn");
// forEach 구문은 자바스크립트 배열에만 쓸 수 있다. 그런데
// 그런데 getElementsByClassName() 펑션이 리턴하는 것은 것은 HTML Collection이지 배열이 아니다.
// 그래서 Array.from() 펑션을 이용해 배열로 만들어줘야 함.
const colorOption = Array.from(document.getElementsByClassName("color-option"));
const colorPicker = document.getElementById("colorPicker");
const lineThickness = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineThickness.value;
ctx.lineCap = "round";

let isDrawing = false;
let isFilling = false;

function changeColor(newColor) {
  ctx.strokeStyle = newColor;
  ctx.fillStyle = newColor;
}

function onMove(event) {
  if (isDrawing) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  ctx.beginPath();
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  } else {
    isDrawing = true;
  }
}

function canclePainting() {
  isDrawing = false;
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

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onClearClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraseClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file); // 브라우저에만 저장된 파일의 URL을 생성한다.
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };
}

function onDoubleClick(event) {
  ctx.save();
  const text = textInput.value;
  if (text !== "") {
    ctx.lineWidth = 1;
    ctx.font = "48px serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

function onSaveClick() {
  const url = canvas.toDataURL(); // 캔버스에 있는 그림의 URL을 생성한다.
  const a = document.createElement("a"); // 앵커를 도큐먼트에 추가한다.
  a.href = url; // 앵커에 캔버스 url을 연결해준다.
  a.download = "myDrawing.png"; // 앵커의 다운로드 속성을 추가한다.
  a.click(); // 앵커를 강제로 클릭한다. 앵커는 실제로 웹페이지에 표시되지 않지만 가상의 앵커를 클릭하는 셈이다.
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", canclePainting);
canvas.addEventListener("mouseleave", canclePainting);

lineThickness.addEventListener("change", onLineWidthChange);
colorPicker.addEventListener("change", colorPickerChange);

colorOption.forEach((color) =>
  color.addEventListener("click", onColorOptionPick)
);
modeBtn.addEventListener("click", onModeClick);
clearBtn.addEventListener("click", onClearClick);
eraserBtn.addEventListener("click", onEraseClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
