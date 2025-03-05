const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const size = 30;

const snake = [
  { x: 300, y: 300 },
  { x: 330, y: 300 },
];
const food = { x: 30, y: 30, color: "red" };

let direction;
let loopId;

const drawSnake = () => {
  ctx.fillStyle = "#f1f1f1";
  snake.forEach((pos, index) => {
    if (index == snake.length - 1) ctx.fillStyle = "#dfdd00";
    ctx.fillRect(pos.x, pos.y, size, size);
  });
};

const drawFood = () => {
  const { x, y } = food;
  ctx.fillStyle = "red";

  ctx.fillRect(x, y, size, size);
};

const moveSnake = () => {
  if (!direction) return;
  const head = snake.at(-1);
  snake.shift();
  if (direction == "right") {
    snake.push({ x: head.x + size, y: head.y });
  }
  if (direction == "left") {
    snake.push({ x: head.x - size, y: head.y });
  }
  if (direction == "up") {
    snake.push({ x: head.x, y: head.y - size });
  }
  if (direction == "down") {
    snake.push({ x: head.x, y: head.y + size });
  }
};

const drawGrid = () => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#fff";

  for (let i = size; i < canvas.width; i += size) {
    console.log(i);
    ctx.beginPath();
    ctx.lineTo(i, 0);
    ctx.lineTo(i, 600);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineTo(0, i);
    ctx.lineTo(600, i);
    ctx.stroke();
  }
};

const gameLoop = () => {
  clearInterval(loopId);
  ctx.clearRect(0, 0, 600, 600);

  drawGrid();
  moveSnake();
  drawSnake();
  drawFood();

  loopId = setTimeout(() => gameLoop(), 300);
};

document.addEventListener("keydown", (evt) => {
  console.log(evt.key);

  switch (evt.key) {
    case "ArrowRight":
      if (direction !== "left") direction = "right";
      break;
    case "ArrowLeft":
      if (direction !== "right") direction = "left";
      break;
    case "ArrowUp":
      if (direction !== "down") direction = "up";
      break;
    case "ArrowDown":
      if (direction !== "up") direction = "down";
      break;
  }
});
gameLoop();
