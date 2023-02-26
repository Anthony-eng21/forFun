import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let food = getRandomFoodPosition();
const EXPANSION_RATE = 5;

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement("div");
  //set on the wide positon our segment/body values
  foodElement.style.gridRowStart =
    food.y; /*Changed the x and y values to go L==>R segment.x*/
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

//gets new food postion
function getRandomFoodPosition() {
  let newFoodPositon;
  while (newFoodPositon == null || onSnake(newFoodPositon)) {
    newFoodPositon = randomGridPosition();
  }
  return newFoodPositon; // gets new food position over and over especially to avoid onSnake
  //loops forever until it finds a value/positon
  //that isn't on the snake.
}
