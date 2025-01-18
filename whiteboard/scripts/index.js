const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
const brushSize = document.getElementById('brushSize');
const clearBoard = document.getElementById('clearBoard');

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.8;

const socket = new WebSocket('ws://localhost:18346/ws');

let drawing = false;
let currentColor = '#000000';
let currentBrushSize = 5;

socket.onmessage = (message) => {
  const data = JSON.parse(message.data);
  if (data.clear) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw(data.x, data.y, data.color, data.size, false);
};

canvas.addEventListener('mousedown', () => (drawing = true));
canvas.addEventListener('mouseup', () => (drawing = false));
canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  draw(x, y, currentColor, currentBrushSize, true);
});

function draw(x, y, color, size, send = true) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
  ctx.fill();

  if (send) {
    socket.send(JSON.stringify({ x, y, color, size }));
  }
}

brushSize.addEventListener('input', (e) => (currentBrushSize = e.target.value));

clearBoard.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  socket.send(JSON.stringify({ clear: true }));
});
