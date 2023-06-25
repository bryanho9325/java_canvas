const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
canvas.width = 600;
canvas.height = 600;

ctx.fillRect(210, 200, 15, 100);
ctx.fillRect(350, 200, 15, 100);
ctx.fillRect(260, 200, 60, 200);
ctx.arc(290, 150, 40, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "yellow";
ctx.arc(270, 150, 5, 3.14, 2 * Math.PI); // angle is pie.
ctx.arc(310, 150, 5, 3.14, 2 * Math.PI);
ctx.fill();

