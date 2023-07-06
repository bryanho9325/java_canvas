const saveBtn = document.getElementById("save-image")
const inputText = document.getElementById("text")
const fileImage = document.getElementById("file")
const eraserBtn = document.getElementById("eraser-btn");
const clearBtn = document.getElementById("clear-btn");
const modeBtn = document.getElementById("mode-btn");
const colorOption = Array.from(document.getElementsByClassName("color-option"))
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
let isPainting = false;
let isFilling = false;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round"
let canvasColor = "white";

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY)
    ctx.stroke();
    return;
  }
  coordinate = ctx.moveTo (event.offsetX, event.offsetY)
}

function onStart () {
  isPainting = true;
}

function onStop () {
  isPainting = false;
  ctx.beginPath();
}

function onlinewidthChange (event) {
  ctx.lineWidth = event.target.value; 
}

function changeColor (event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function colorClicked (event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;    
  color.value = colorValue;
  return canvasColor = colorValue;
}

function onModeBtn () {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "🛢️ Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "🎨 Draw";
  }
}

function onCanvasClick () {
  if (isFilling) {
    ctx.fillRect (0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }
}

function onClear () {
  ctx.fillStyle = "white";
  ctx.fillRect (0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
  ctx.beginPath()
  ctx.fillStyle = canvasColor;
}
function onEraser () {
  ctx.strokeStyle = "white";
  isFilling = false ;
  modeBtn.innerText = "Fill"
}

function onImageUpload (event) {
  const file = event.target.files[0]
  const url = URL.createObjectURL(file)
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage (image, 0,0, CANVAS_WIDTH, CANVAS_HEIGHT );
    fileImage.value = null;
  }
}

function OnDoubleClick (event) {
  const text = inputText.value;
  if (inputText !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "36px serif"
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

function onSave () {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "MycreatedImage.png";
  a.click();
}

canvas.addEventListener("dblclick", OnDoubleClick)
canvas.addEventListener("mousemove", onMove)
canvas.addEventListener("mousedown", onStart)
canvas.addEventListener("mouseup", onStop)
canvas.addEventListener("mouseleave", onStop)
canvas.addEventListener("click", onCanvasClick)
lineWidth.addEventListener("change", onlinewidthChange)
color.addEventListener("change", changeColor)
colorOption.forEach(color => color.addEventListener("click", colorClicked)); // add eventListner to all color in color Array
modeBtn.addEventListener("click", onModeBtn)
clearBtn.addEventListener("click", onClear)
eraserBtn.addEventListener("click", onEraser)
fileImage.addEventListener("change", onImageUpload)
saveBtn.addEventListener("click", onSave)