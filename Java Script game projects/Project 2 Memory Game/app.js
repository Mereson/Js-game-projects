const cardArray = [
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
]

cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector("#grid")
const resultDisplay = document.querySelector("#result")
let cardsChosen = []
let cardsChosenId = []
const cardsWon = []

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img")
    card.setAttribute("src", "images/blank.png")
    card.setAttribute("data-id", i)
    card.addEventListener("click", flipCard)
    gridDisplay.appendChild(card)
  }
}

createBoard()

function checkMatch() {
  const cards = document.querySelectorAll("#grid img")
  const optionOneId = cardsChosenId[0]
  const optionTwoId = cardsChosenId[1]

  console.log("Check for match!")

  if (optionOneId == optionTwoId) {
    cards[optionOneId].setAttribute("src", "blank/white.png")
    cards[optionTwoId].setAttribute("src", "blank/white.png")
    alert("You clicked the same Card!")
  }

  if (cardsChosen[0] == cardsChosen[1] && optionOneId != optionTwoId) {
    alert("You found a match!")
    cards[optionOneId].setAttribute("src", "images/white.png")
    cards[optionTwoId].setAttribute("src", "images/white.png")
    cards[optionOneId].removeEventListener("click", flipCard)
    cards[optionTwoId].removeEventListener("click", flipCard)
    cardsWon.push(cardsChosen)
  } else {
    cards[optionOneId].setAttribute("src", "images/blank.png")
    cards[optionTwoId].setAttribute("src", "images/blank.png")
    alert("Sorry Try again!")
  }
  resultDisplay.textContent = cardsWon.length

  if (cardsWon.length == cardArray.length / 2) {
    resultDisplay.textContent = "Congratulations You have Finished!"
  }
  cardsChosen = []
  cardsChosenId = []
}

function flipCard() {
  const cardId = this.getAttribute("data-id")
  cardsChosen.push(cardArray[cardId].name)
  cardsChosenId.push(cardId)
  this.setAttribute("src", cardArray[cardId].img)
  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 500)
  }
}
