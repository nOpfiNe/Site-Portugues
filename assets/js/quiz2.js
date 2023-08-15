const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Qual trecho é do poema 'Quem sabe em Aruanda'?",
    answers: [
      { text: "Cansei de ser fetiche com minha pele azeviche", correct: false },
      { text: "Decidida a romper com o mundo desigual", correct: false },
      { text: "Deus é uma mulher preta", correct: false },
      { text: "Porque nunca mamei na teta de um Estado ausente", correct: true }
    ]
  },
  {
    question: "Qual poema fala sobre o orgulho da negritude e o racismo no uso de palavras como 'mulata' ou 'morena'?",
    answers: [
      { text: "Quem sou eu", correct: true },
      { text: "Quem sabem em Aruanda", correct: false },
      { text: "Estrelas na boca", correct: false },
      { text: "Viúva Negra", correct: false }
    ]
  },
  {
    question: "Qual poema abaixo apresenta a dor da perda com enfoque em mulheres negras e de outras etnias, consideradas, minorias?",
    answers: [
      { text: "'Barbie' Quebrada", correct: false },
      { text: "Viúva Negra", correct: true },
      { text: "Wanadi", correct: false },
      { text: "Coroa", correct: false }
    ]
  },
  {
    question: "Complemente o poema 'Deus é uma mulher preta ....'?",
    answers: [
      { text: "Com lindos cabelos crespos como cipreste", correct: false },
      { text: "Rosto esculpido com as pedras da lua", correct: false },
      { text: "com coroa, rainha, livre e liberta", correct: false },
      { text: "Sua teta sempre matou a fome do mundo", correct: true }
    ]
  },
  {
    question: "O que o poema 'Barbie' Quebrada fala?",
    answers: [
      { text: "Hipersexualização do corpo negro", correct: true },
      { text: "A paixão avassaladora e a dificuldade de partir", correct: false },
      { text: "O aumento de casais interracias", correct: false },
      { text: "A perda de uma grande amor", correct: false }
    ]
  },
  {
    question: "Sobre o poema Deusdete, a musa, o que é apresentado: ",
    answers: [
      { text: "A personagem quebrando a televisão literalmente.", correct: false },
      { text: "A aceitaçao da personagem Deusdete dos seus traços raciais.", correct: true },
      { text: "Mostrar que o mundo da televisão existe preconceito.", correct: false },
      { text: "Que Deusdete se rebelou contra o mundo desigual.", correct: false }
    ]
  },

  {
    question: "Sobre o poema Deusdete, a musa, o que é apresentado: ",
    answers: [
      { text: "A personagem quebrando a televisão literalmente.", correct: false },
      { text: "A aceitaçao da personagem Deusdete dos seus traços raciais.", correct: true },
      { text: "Mostrar que o mundo da televisão existe preconceito.", correct: false },
      { text: "Que Deusdete se rebelou contra o mundo desigual.", correct: false }
    ]
  },
]