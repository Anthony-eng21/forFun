import { getInputDirection } from "./input.js";

let counterText = document.querySelector(".counter-text");

export const SNAKE_SPEED = 14.5;
const snakeBody = [
  { x: 11, y: 11 },
  /*{ x: 11, y: 11 },
    { x: 12, y: 11 },
    { x: 13, y: 11 },
    { x: 14, y: 11 } */
];
let newSegments = 0; //default value
//want snake body at the center of the grid/screen to begin game (x,y) (0, 0)
//take postion of a given segment
//and the segment after that will then move into that new position
export function update() {
  addSegments();
  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
    //added a counter in the console
    counterText.textContent =
      snakeBody.length >= 5 ? snakeBody.length + " Segments" : 0;
  }
  //as y increases the snakeBody moves down ==>
  //good to know for input system functionality
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

//looping through eaach snake segment/piece and drawing(gameBoard)
export function draw(gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    //set on the wide positon our segment/body values
    snakeElement.style.gridRowStart =
      /*Changed the x and y values to go L==>Rsegment.x*/ segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
}
//snake expansion
export function expandSnake(amount) {
  newSegments += amount;
}

//determines if this position is on our snake
export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositons(segment, position); //compare segments and position to see if they're on our snake
  });
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  //determines if the head of the snake[0] touches [...snakeBody[i]]
  return onSnake(snakeBody[0], { ignoreHead: true });
}

function equalPositons(pos1, pos2) {
  return (
    //foods position moves to next pos once eaten
    pos1.x === pos2.x && pos1.y === pos2.y
  );
}

//takes the last segment of our snake and duplicattes toward the end of the snake
//may be the best spot to add a counter
function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 2] });
  }

  newSegments = 0;
}
