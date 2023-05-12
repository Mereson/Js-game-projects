const grid = document.querySelector(".grid")
const scoreDisplay = document.querySelector("#score")
const buttonOne = document.getElementById("1x")
const buttonTwo = document.getElementById("2x")
const buttonThree = document.getElementById("3x")
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardheight = 300
const ballDiameter = 20
let timerid
let xDirection
let yDirection = 2
let score = 0

const userStart = [230, 10]
let userCurrentPosition = userStart

const ballStart = [270, 40]
let ballCurrentPosition = ballStart

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topLeft = [xAxis, yAxis + blockHeight]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
  }
}

const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
]

// draw all th blocks
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div")
    block.classList.add("block")
    block.style.left = blocks[i].bottomLeft[0] + "px"
    block.style.bottom = blocks[i].bottomLeft[1] + "px"
    grid.appendChild(block)
  }
}

addBlocks()

function drawUser() {
  user.style.left = userCurrentPosition[0] + "px"
  user.style.bottom = userCurrentPosition[1] + "px"
}

function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px"
  ball.style.bottom = ballCurrentPosition[1] + "px"
}

// add user
const user = document.createElement("div")
user.classList.add("user")
drawUser()
grid.appendChild(user)

function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (userCurrentPosition[0] > 0) {
        userCurrentPosition[0] -= 10
        drawUser()
      }
      break

    case "ArrowRight":
      if (userCurrentPosition[0] < boardWidth - blockWidth) {
        userCurrentPosition[0] += 10
        drawUser()
      }
      break
  }
}

document.addEventListener("keydown", moveUser)

// add ball
const ball = document.createElement("div")
ball.classList.add("ball")
drawBall()
grid.appendChild(ball)

// change the ball direction on start
function xDirections() {
  let randomNumber = Math.floor(Math.random() * 2)
  console.log(randomNumber)
  if (randomNumber == 0) {
    xDirection = 2
  }
  if (randomNumber == 1) {
    xDirection = -2
  }
}
xDirections()

// move ball
function moveBall() {
  ballCurrentPosition[0] += xDirection
  ballCurrentPosition[1] += yDirection
  drawBall()
  checkForCollisions()
}


// check for collision
function checkForCollisions() {
  // check for block collisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"))
      allBlocks[i].classList.remove("block")
      blocks.splice(i, 1)
      changeDirection()
      score++
      scoreDisplay.textContent = score

      // check for win
      if (blocks.length === 0) {
        scoreDisplay.innerHTML = "You Win! Your score is " + score
        clearInterval(timerid)
        document.removeEventListener("keydown", moveUser)
      }
    }
  }

  // check for wall collisions
  if (
    ballCurrentPosition[1] >= boardheight - ballDiameter ||
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection()
  }

  // check for user collisions
  if (
    ballCurrentPosition[0] > userCurrentPosition[0] &&
    ballCurrentPosition[0] < userCurrentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > userCurrentPosition[1] &&
    ballCurrentPosition[1] < userCurrentPosition[1] + blockHeight
  ) {
    changeDirection()
  }
  if (ballCurrentPosition[1] <= 0) {
    // check for game over
    clearInterval(timerid)
    scoreDisplay.textContent = "Game Over! You lose, Your score is " + score
    document.removeEventListener("keydown", moveUser)
    ballCurrentPosition = ballStart
    userCurrentPosition = userStart
  }
}

// change ball direction
function changeDirection() {
  if ((xDirection === 2) && yDirection === 2) {
    xDirection = 2
    yDirection = -2
    return
  }
  if ((xDirection === 2) && yDirection === -2) {
    xDirection = -2
    return
  }
  if ((xDirection === -2)&& yDirection === -2) {
    xDirection = -2
    yDirection = 2
    return
  }
  if ((xDirection === -2) && yDirection === 2) {
    xDirection = 2
    return
  }
}

//change speed
function oneX() {
  if (blocks.length !== 0 && !(ballCurrentPosition[1] <= 0)) {
    clearInterval(timerid)
    timerid = setInterval(moveBall, 25)
  }
}

buttonOne.addEventListener("click", oneX)

function twoX() {
  if (blocks.length !== 0 && !(ballCurrentPosition[1] <= 0)) {
    clearInterval(timerid)
    timerid = setInterval(moveBall, 15)
  }
}

buttonTwo.addEventListener("click", twoX)

function threeX() {
  if (blocks.length !== 0 && !(ballCurrentPosition[1] <= 0)) {
    clearInterval(timerid)
    timerid = setInterval(moveBall, 10)
  }
}

buttonThree.addEventListener("click", threeX)
