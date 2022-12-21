
import { questionPack, ranking } from "./gameObjects.js"

const mainCountDown = 300
let actualTime;
let questions;
let rulo;
let actualLetter = -1
let countDown;
const theQuestion = document.createElement("div")
const userInput = document.createElement("input")
const screen = document.querySelector(".main-content")
const timer = document.querySelector(".title-countdown")
const theInput = document.createElement("input")
const sendButton = document.createElement("div")
const passapalabraButton = document.createElement("div")


const showMenu = () => {

    countDown = mainCountDown
    timer.innerHTML = "PASAPAL-ISDI"
    screen.innerHTML=null
    const menu = document.createElement('ul')
    menu.className = "menu"
    screen.appendChild(menu)
  
  
    const jugarButton = document.createElement('li')
    const instruccionesButton = document.createElement("li")
    const rankingButton = document.createElement("li")
    
    jugarButton.classList= "menu-button play"
    instruccionesButton.classList = "menu-button instrucciones"
    rankingButton.classList = "menu-button ranking"
  
    jugarButton.innerHTML="JUEGO"
    instruccionesButton.innerHTML = "INSTRUCCIONES"
    rankingButton.innerHTML = "RANKING"
    
    menu.appendChild(jugarButton)
    menu.appendChild(instruccionesButton)
    menu.appendChild(rankingButton)
  
    jugarButton.addEventListener("click",showUserInput);
    instruccionesButton.addEventListener("click", showRules);
    rankingButton.addEventListener("click",showRanking)

};
  
const showUserInput = () => {
    screen.innerHTML= null
    const userDescription = document.createElement("p")
    
    const userSumit = document.createElement("p")
    userDescription.className="rules"
    userInput.className="user-input"
    userSumit.className="menu-button"
    userDescription.innerHTML="Introduce tu usuario"
    userInput.value=""
  
    userSumit.innerHTML="ACEPTAR"
    screen.appendChild(userDescription)
    screen.appendChild(userInput)
    screen.appendChild(userSumit)
    
    userSumit.addEventListener("click",userCheck)
}

const userCheck = () => {
    if(userInput.value === ""){
      showUserInput()
    }else{
        screen.innerHTML=null
        showStartGameButton()
    };
};

const showStartGameButton = () => {
    screen.innerHTML=`Tu nick es: "${userInput.value}"`
    const startGameButton = document.createElement("p")
    startGameButton.className="menu-button ready"
    startGameButton.innerHTML="JUGAR"
    screen.appendChild(startGameButton)
    startGameButton.addEventListener("click",startGameButtonPress)
    createReNamePlayerButton()
    createMenuButton()
};

const startGameButtonPress = () => {
    
    createRosco()
    startTimers()
    
};

function createRosco() {
    const circleContainer = document.querySelector('.rulo');
    const abecedario = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    for (let i = 0; i < 26; i++) {
      const element = document.createElement('div');
      if( !(i === 26 )){
        element.innerHTML = abecedario[i];
        element.className = "div"+(i+1) + " circle " + abecedario[i];
      };
      circleContainer.appendChild(element);
    };
};

const showRules = () => {
    screen.innerHTML= null
    const rulesContainer = document.createElement("p")
    rulesContainer.className = "rules"
    rulesContainer.innerHTML = (`BIENVENIDO A PASAPAL-ISDI: <br><br> El objetivo principal del juego es adivinar la palabra que<br> se esconde detras de cada definición:
    <br><br>-Cada acierto sumará dos puntos.<br>-Cada fallo restara un punto.<br>-Puedes pasar a la siguiente palabra sin responder pulsando espacio y dejarla para la segunda vuleta del rosco.<br>-El tiempo maximo de la partida són ${mainCountDown} segundos.`);
    screen.appendChild(rulesContainer)
    createMenuButton()
}

const showRanking = () => {

   screen.innerHTML=""
    createRanking()
    resetGame()
    createMenuButton()

}

const createMenuButton = () => {

    const menuButton = document.createElement("p")
    menuButton.className="menu-button menu-alone"
    menuButton.innerHTML = "MENU PRINCIPAL"
    screen.appendChild(menuButton)
    menuButton.addEventListener("click",showMenu)

}


const createRanking = () => {
    const rankingMenu = document.createElement('div')
    rankingMenu.className = "rankingMenu"
       
    createTableForRanking()
};

const resetGame = () => {
    for (let letters in questions){
        questions[letters].status = 0
    }
}

const createReNamePlayerButton = () => {
    const renamePlayerButton = document.createElement("p")
    renamePlayerButton.className="menu-button menu-alone"
    renamePlayerButton.innerHTML = "CAMBIAR NICK"
    screen.appendChild(renamePlayerButton)
    renamePlayerButton.addEventListener("click",showUserInput)
};

const createTableForRanking = () => {

    const table = document.createElement("table")
    table.className= "rankingTable";
    screen.appendChild(table)

    for (let users in ranking){
        const row = document.createElement("tr")
        row.className= "row";

        for (let values in ranking[0]){
            const column = document.createElement("td");
            column.className="column";
            column.innerHTML= ranking[users][values];
            row.appendChild(column);
        };

        table.appendChild(row);
    };
};

const startTimers =() => {
    let counter = 3
    
    const countThree = () => screen.innerHTML= `El juego empieza en ${counter--}...`;
    
    screen.innerHTML= `Tienes ${countDown} segundos.`
    timer.innerHTML= userInput.value + " " + countDown
    setTimeout(countThree,2000);
    setTimeout(countThree,3000);
    setTimeout(countThree,4000);
    setTimeout(createGameInterface,5000);
};
  
const createGameInterface = () => {
    
    theQuestion.className = "the-question jugo"
    theInput.className = "the-input jugo"
    sendButton.className = "send-Button jugo the-buttons"
    passapalabraButton.className = "passapalabra-button jugo the-buttons"
    screen.innerHTML = ""
    theQuestion.innerHTML = ""
    sendButton.innerHTML = "ENVIAR"
    passapalabraButton.innerHTML = "PASAPAL-ISDI"
  
    screen.appendChild(theQuestion)
    screen.appendChild(theInput)
    screen.appendChild(sendButton)
    screen.appendChild(passapalabraButton)
    game()
}
  
const game = () => {
    questions = questionPack[Math.floor(Math.random() * 3)]
    activateCounter()
    round()
};
const activateCounter = () =>{
    actualTime = 0
    timerGameOver()
};
  const timerGameOver = () =>{
  
      if(timer.innerHTML === userInput.value + " WORDS OVER"){
        return;
      };
      if (timer.innerHTML === "PASAPAL-ISDI"){
        return;
      }
      if(countDown === -1){
        endGame("time")
        return
      }else{
        timer.innerHTML=`${userInput.value} ${countDown--}`;
      };
      setTimeout(drWhoTravelsInTimeAndSpaceLikeThisFunctionDo,500)
    }; 
  const drWhoTravelsInTimeAndSpaceLikeThisFunctionDo = () =>{
      setTimeout(timerGameOver, 500);
      actualTime++
    };
  const endGame = (reason) =>{
    rulo = document.querySelectorAll(".circle")
    for(let each in rulo){
      if(Number.isInteger(+each)){
        rulo[each].remove()
      }
    }
    if (reason === "time"){
      timer.innerHTML = userInput.value + " TIME OVER"
    }else if( reason === "words"){
      timer.innerHTML = userInput.value + " WORDS OVER"
    }else{
      timer.innerHTML = "PASAPAL-ISDI"
    };
    screen.innerHTML= null
    rankUser() 
    showRanking()
    actualLetter = -1
  };
  
  const rankUser = () => {
    let userScore = 0

    for(let letter in questions){
      if (questions[letter].status === 1){
        userScore += 2
      }else if(questions[letter].status === 2){
        userScore --
      };
    };
  
    ranking.push([userInput.value, userScore, actualTime]) 
  };
  
  const round = () => {
    if(checkWordsLeft()){
      showQuestion()
      return;
    }
      endGame("words")
  };
  const checkWordsLeft = () => {
    let count = 0
    for(let letter in questions){
      if (questions[letter].status === 0){
        count ++
      }
    }
    if(count === 0){ 
      return false;
    }else{
      return true;
    }
  } 
  const showQuestion = () => {
    
    if(actualLetter >= questions.length-1){
      actualLetter = -1
    };
    actualLetter++
    if(questions[actualLetter].status === 0){
      theQuestion.innerHTML= `${questions[actualLetter].question}`
      getUserAnswer()
    }else{
      round()
      return;
    ;}
  };
  const enterKey = (event) =>{
    event.preventDefault()
    if (event.code === "Enter"){
      checkAnswer()
    };
  };
  const spaceKey = (event) =>{
    event.preventDefault()
    if(event.code === 'Space'){
      round()
    }
  }
  const getUserAnswer = () => {
    sendButton.addEventListener("click",checkAnswer);
    theInput.addEventListener("keyup", enterKey)
    passapalabraButton.addEventListener("click",round);
    theInput.addEventListener("keyup",spaceKey);
  };
  const checkAnswer = () => {
    manageAnswer()
    clearInput()
    round()
  }
  const manageAnswer = () => {
    
    if(cleanString(theInput.value) === questions[actualLetter].answer){
    questions[actualLetter].status = 1
    changeLettersColors(" green")
    }else{
      questions[actualLetter].status = 2
      changeLettersColors(" red")
    };
  };
  
  const clearInput = () => {
    theInput.value = ""
  }
  const changeLettersColors = (color) => {
    document.querySelector(".circle." + questions[actualLetter].letter.toUpperCase()).className += color;
  };
  
  
  const cleanString = (string) => {
    string = string.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"");
    return string;
  };

showMenu()

