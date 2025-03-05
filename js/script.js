const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const size = 30;

const snake = [
  { x: 300, y: 300 },
  { x: 330, y: 300 },
];

const randomNumber = () => {
  let nX, nY;
  do {
    nX = Math.floor(Math.random() * 20) * 30; // Gera múltiplos de 30 entre 0 e 570
    nY = Math.floor(Math.random() * 20) * 30;
  } while (snake.some((segment) => segment.x === nX && segment.y === nY));

  return { x: nX, y: nY };
};

let direction;
let loopId;

const drawSnake = () => {
  ctx.fillStyle = "#f1f1f1";
  snake.forEach((pos, index) => {
    if (index == snake.length - 1) ctx.fillStyle = "#dfdd00";
    ctx.fillRect(pos.x, pos.y, size, size);
  });
};

let food = randomNumber();
const drawFood = () => {
  ctx.fillStyle = "red";

  ctx.fillRect(food.x, food.y, size, size);
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

const checkEat = () => {
  const head = snake.at(-1);

  if (head.x == food.x && head.y == food.y) {
    snake.push(head);
    food = randomNumber();
    console.log(food);
  }
};

const gameLoop = () => {
  clearInterval(loopId);
  ctx.clearRect(0, 0, 600, 600);

  drawGrid();
  checkEat();
  moveSnake();
  drawSnake();
  drawFood();

  loopId = setTimeout(() => gameLoop(), 300);
};

document.addEventListener("keydown", (evt) => {
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
