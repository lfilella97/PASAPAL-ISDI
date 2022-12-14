
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
  
const createMenuButton = () => {

    menuButton = document.createElement("p")
    menuButton.className="menu-button menu-alone"
    menuButton.innerHTML = "MENU PRINCIPAL"
    screen.appendChild(menuButton)
    menuButton.addEventListener("click",showMenu)

}

const showRanking = () => {
   screen.innerHTML=""
    createRanking()
    resetGame()
    createMenuButton()

}

const createRanking = () => {
    const rankingMenu = document.createElement('div')
    rankingMenu.className = "rankingMenu"
       
    for (let i = 0; i <= ranking.length-1; i++) {
        const element = document.createElement('p');
          
        element.innerHTML = `|-(${ranking[i].user})  ${ranking[i].score}  (${ranking[i].timeUsed})-|`
        element.className = "user"+(i+1) + " ranking";
        rankingMenu.appendChild(element);
    };
    screen.appendChild(rankingMenu)
};

const resetGame = () => {
    for (letters in questions){
        questions[letters].status = 0
    }
}

const showRules = () => {
    screen.innerHTML= null
    const rulesContainer = document.createElement("p")
    rulesContainer.className = "rules"
    rulesContainer.innerHTML = (`BIENVENIDO A PASAPAL-ISDI: <br><br> El objetivo principal del juego es adivinar la palabra que<br> se esconde detras de cada definición:
    <br><br>-Cada acierto sumará un punto.<br>-Cada fallo restara dos puntos.<br>-Puedes pasar a la siguiente palabra sin responder y <br> dejarla para la segunda vuleta del rosco.<br>-El tiempo maximo de la partida són 130 segundos.`);
    screen.appendChild(rulesContainer)
    createMenuButton()
}

const showUserInput = () => {
    screen.innerHTML= null
    const userDescription = document.createElement("p")
    
    const userSumit = document.createElement("p")
    userDescription.className="rules"
    userInput.className="user-input"
    userSumit.className="menu-button"
    userDescription.innerHTML="Introduce tu usuario"
    userInput.value="user"
  
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
        console.log(userInput.value)
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
  
const createReNamePlayerButton = () => {
    const renamePlayerButton = document.createElement("p")
    renamePlayerButton.className="menu-button menu-alone"
    renamePlayerButton.innerHTML = "CAMBIAR NICK"
    screen.appendChild(renamePlayerButton)
    renamePlayerButton.addEventListener("click",showUserInput)
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