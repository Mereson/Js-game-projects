const squares = document.querySelectorAll(".square")
const mole = document.querySelector(".mole")
const timeLeft = document.querySelector("#time-left")
const score = document.querySelector("#score")
const startBtn = document.getElementById("start_btn")
const endBtn = document.getElementById("end_btn")

let result = 0
let hitPosition
let currentTime = 60
const timerCount = currentTime
let timerId = null
let countDownTimerId

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole")
  })

  let randomSquare = squares[Math.floor(Math.random() * 9)]
  randomSquare.classList.add("mole")

  hitPosition = randomSquare.id
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id == hitPosition) {
      result++
      score.textContent = result
      hitPosition = null
    }
  })
})

function moveMole() {
  timerId = setInterval(randomSquare, 500)
  countDownTimerId = setInterval(countDown, 1000)
}

function stopMole() {
  currentTime = 0
  clearInterval(timerId)
  clearInterval(countDownTimerId)
  timeLeft.textContent = 60
  score.textContent = 0
  currentTime = timerCount

  squares.forEach((square) => {
    square.classList.remove("mole")
  })
}

function startGame() {
  startBtn.addEventListener("click", moveMole)
}

startGame()

function endGame() {
  endBtn.addEventListener("click", stopMole)
}

endGame()

function countDown() {
  currentTime--
  timeLeft.textContent = currentTime

  if (currentTime == 0) {
    clearInterval(countDownTimerId)
    clearInterval(timerId)
    alert("Game Over! Your Final Score is " + result)
    result = 0
    score.textContent = 0
    currentTime = timerCount
  }
}
