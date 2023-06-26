const colorOption = Array.from(document.getElementsByClassName("color-option"))
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
canvas.width = 600;
canvas.height = 600;
let isPainting = false;
ctx.lineWidth = lineWidth.value;

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
}

canvas.addEventListener("mousemove", onMove)
canvas.addEventListener("mousedown", onStart)
canvas.addEventListener("mouseup", onStop)
canvas.addEventListener("mouseleave", onStop)
lineWidth.addEventListener("change", onlinewidthChange)
color.addEventListener("change", changeColor)
colorOption.forEach(color => color.addEventListener("click", colorClicked)); // add eventListner to all color in color Array
