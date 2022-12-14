
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
  for(each in rulo){
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
  //refreshGame-Object() //Inside not just rank user, refresh all word stats to 0.
  showRanking()
  actualLetter = -1
};

const rankUser = () => {
  userScore = 0
  for(letter in questions){
    if (questions[letter].status === 1){
      userScore++
    }else if(questions[letter].status === 2){
      userScore -= 2
    };
  };

  ranking.push({user: userInput.value, score: userScore, timeUsed: actualTime  }) 
};

const round = () => {
  if(checkWordsLeft()){
    turn()
  }else{
    endGame("words")
  };
};
const checkWordsLeft = () => {
  let count = 0
  for(letter in questions){
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
const turn = () => {
  
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
  sendButton.addEventListener("click",nextRound);
  passapalabraButton.addEventListener("click",round);
};
const nextRound = () => {
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
  string = string.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"");
  return string;
};

showMenu()