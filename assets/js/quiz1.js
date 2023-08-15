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
    question: "O livro Bom dia, Camarada foi escrito por qual autor?",
    answers: [
      { text: "José Eduardo Agualusa", correct: false },
      { text: "Maria", correct: false },
      { text: "Ondjaki", correct: true },
      { text: "Mia Couto", correct: false }
    ]
  },
  {
    question: "Quantos minutos o camarada Antônio dizia faltar para qualquer coisa ficar pronta? ",
    answers: [
      { text: "10 minuto", correct: false },
      { text: "12 minuto", correct: false },
      { text: "20 minuto", correct: true },
      { text: "21 minuto", correct: false }
    ]
  },
  {
    question: "Qual a nacionalidade dos professores do protagonista? ",
    answers: [
      { text: "Brasileira", correct: false },
      { text: "Cubana", correct: true },
      { text: "Mexicana", correct: false },
      { text: "Africana", correct: false }
    ]
  },
  {
    question: "O que é o caixão vazio?",
    answers: [
      { text: "Um grupo que ajudava as escolas africanas", correct: false },
      { text: "Um caixão que não tem nada dentro.", correct: false },
      { text: "Um grupo que supostamente atacava escolas e cometia atrocidades.", correct: true },
      { text: "Um grupo que protestava contra escolas e cometia crimes.", correct: false }
    ]
  },
  {
    question: "Qual animal um tanto quanto inusitado, Maxando possuía?",
    answers: [
      { text: "Jacaré", correct: true },
      { text: "Elefante", correct: false },
      { text: "Girrafa", correct: false },
      { text: "Chita", correct: false }
    ]
  },
  {
    question: "Em que cidade se passam os acontecimentos? ",
    answers: [
      { text: "Luanda", correct: true },
      { text: "Lagos", correct: false },
      { text: "Nairóbi", correct: false },
      { text: "Cairo", correct: false }
    ]
  },
  {
    question: "Qual momento politico e histórico passa a narrativa?",
    answers: [
      { text: "País passando por uma guerra civil contra os comunistas.", correct:false },
      { text: "País livre passando por um momento decadas após a independência.", correct: false },
      { text: "País colônia de Portugal passando por uma guerra civil.", correct: false },
      { text: "País independente passando por uma guerra civil.", correct: true }
    ]
  },


  {
    question: "Além do protagonista, 'Bom Dia, Camarada' apresenta uma variedade de personagens secundários que desempenham papéis importantes na trama. Como esses personagens contribuem para a construção do enredo e do ambiente do livro?",
    answers: [
      { text: "Representam arquétipos literários tradicionais para criar uma sensação de familiaridade.", correct:false },
      { text: "Servem como símbolos alegóricos para temas universais da condição humana.", correct: false },
      { text: "Refletem as diferentes facetas da sociedade angolana e suas contradições.", correct: true },
      { text: "Desempenham papéis puramente decorativos para adicionar complexidade visual.", correct: false }
    ]
  },

  {
    question: "A história é contada sob a perspectiva de uma criança. Como essa escolha narrativa contribui para a compreensão mais profunda das questões abordadas no livro?",
    answers: [
      { text: "Oferece um olhar inocente que contrasta com os eventos turbulentos.", correct: true },
      { text: "Facilita a exploração das complexidades políticas e econômicas de Angola.", correct: false },
      { text: "Permite uma visão crua e realista das dificuldades da vida infantil.", correct: false },
      { text: "Amplifica a narrativa de ficção científica através da imaginação infantil.", correct: false }
    ]
  },

  {
    question: "No dialogo inicial do livro 'Mas, camarada António, tu não preferes que o país seja assim livre?' é possivel ver ao longo desse dialogo que a colonização Portuguesa era:",
    answers: [
      { text: "Vantajosa para a economia e para a comunicação entre os povos.", correct:false },
      { text: "Importante para as tradições locais e para a língua das colônias.", correct: false },
      { text: "Autoritária e impositiva, oposta à autonomia das nações dominadas.", correct: true },
      { text: "Repressora dos direitos à liberdade de pensamento e expressão. ", correct: false }
    ]
  },

]