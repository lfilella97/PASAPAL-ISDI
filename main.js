
import { questionPack, ranking } from "./gameObjects.js";

const mainCountDown = 300;
let actualTime;
let questions;
let rulo;
let actualLetter = -1;
let countDown;
const theQuestion = document.createElement("div");
const userInput = document.createElement("input");
const screen = document.querySelector(".main-content");
const timer = document.querySelector(".title-countdown");
const theInput = document.createElement("input");
const sendButton = document.createElement("button");
const passapalabraButton = document.createElement("button");

theInput.addEventListener("keyup", (event) =>{
  event.preventDefault();
  if (event.code === "Enter"){
    checkAnswer();
  }
  if(event.code === 'Space'){
    round();
  };
});


const showMenu = () => {

    countDown = mainCountDown
    timer.innerHTML = "PASAPAL-ISDI"
    screen.innerHTML = null
    const menu = document.createElement('ul')
    menu.className = "menu"
    screen.appendChild(menu)
  
  
    const jugarButton = document.createElement('button')
    const instruccionesButton = document.createElement("button")
    const rankingButton = document.createElement("button")
    
    jugarButton.classList= "menu-button play"
    instruccionesButton.classList = "menu-button instrucciones"
    rankingButton.classList = "menu-button ranking"

    jugarButton.setAttribute("tabindex",0)
    instruccionesButton.setAttribute("tabindex",0)
    rankingButton.setAttribute("tabindex",0)

    jugarButton.innerHTML="JUEGO"
    instruccionesButton.innerHTML = "INSTRUCCIONES"
    rankingButton.innerHTML = "RANKING"

    menu.appendChild(jugarButton)
    menu.appendChild(instruccionesButton)
    menu.appendChild(rankingButton)

    jugarButton.focus()

    jugarButton.addEventListener("click",showUserInput);
    instruccionesButton.addEventListener("click", showRules);
    rankingButton.addEventListener("click",showRanking)

};
  
const showUserInput = () => {
    screen.innerHTML= null
    const userDescription = document.createElement("p")
    const userSumit = document.createElement("button")
    userDescription.className="rule"
    userInput.className="user-input"
    userSumit.className="menu-button"
    userDescription.innerHTML="Introduce tu usuario"
    
  
    userSumit.innerHTML="ACEPTAR"
    screen.appendChild(userDescription)
    screen.appendChild(userInput)
    screen.appendChild(userSumit)
    
    setTimeout(() => userInput.focus(), 500)
   
    userInput.addEventListener("keyup", (event) =>{
  
      event.preventDefault()
      if (event.code === "Enter"){
        userCheck()
      };
    })
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
    const startGameButton = document.createElement("button")
    startGameButton.className="menu-button ready"
    startGameButton.innerHTML="JUGAR"
    screen.appendChild(startGameButton)
    startGameButton.focus()
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
    const abecedario = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
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
    const rulesContainer = document.createElement("div")
    rulesContainer.className = "rules"
    rulesContainer.innerHTML = (`BIENVENIDO A PASAPAL-ISDI: <br><br> El objetivo principal del juego es adivinar la palabra que se esconde detras de cada definición:
    <br><br>-Cada acierto sumará dos puntos.<br>-Cada fallo restara un punto.<br>-El tiempo maximo de la partida són ${mainCountDown} segundos. <br>-Puedes pasar a la siguiente palabra sin responder pulsando espacio y dejarla para la segunda vuleta del rosco.`);
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

    const menuButton = document.createElement("button")
    menuButton.className="menu-button menu-alone"
    menuButton.innerHTML = "MENU"
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
    const renamePlayerButton = document.createElement("button")
    renamePlayerButton.className="menu-button menu-alone"
    renamePlayerButton.innerHTML = "CAMBIAR USUARIO"
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
    
    const countThree = () => timer.innerHTML= `Empieza en ${counter--}...`;
    
    timer.innerHTML= `Tienes ${countDown} segundos.`
    screen.innerHTML= null
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
    console.log(theInput)
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
      theInput.focus()
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
  

  const getUserAnswer = () => {
    sendButton.addEventListener("click",checkAnswer);
    
    passapalabraButton.addEventListener("click",round);
    
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

