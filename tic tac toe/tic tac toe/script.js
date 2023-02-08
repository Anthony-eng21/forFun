const X_CLASS = 'x'

const CIRCLE_CLASS = 'circle'
//WINNING LOGIC 
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // horizontal wins
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // vertical wins 
    [0, 4, 8],
    [2, 4, 6]
    // diagonal wins
]

const cellElements = document.querySelectorAll('[data-cell]')

const board = document.getElementById('board')

const winningMessageElement = document.getElementById
('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

let circleTurn
restartButton.addEventListener('click', startGame)

startGame()

// cellElements.forEach(cell => {
    // const image1 = document.createElement('img')
    // image1.src = '/img/scrim.jpg'
    // document.querySelector('.board-circle').appendChild(image1)
    // cell.addEventListener('click',  handleClick, { once: true})
// })



function startGame() {
    circleTurn = true;
    cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click',  handleClick, { once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}


function handleClick(e) {
    const cell = e.target
    const img1 = document.createElement('div')
    const currrentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    img1.classList.add(currrentClass)
    placeMark(cell, currrentClass)
    //check for win
    if (checkWin(currrentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
    //check for draw
    //switch turns 
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Nobody win$ ;/ '
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "Ruby Da Cherry" : "Yung Chri$t"} Win$!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currrentClass) {
    cell.classList.add(currrentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
board.classList.remove(X_CLASS)
board.classList.remove(CIRCLE_CLASS)
if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currrentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currrentClass)
            //if current class is in any of the combinations we are a winner 
        })
    })
};