'use strict';
var PAPER = 'papier';
var ROCK = 'kamien';
var SCISSORS = 'nozyce';

var PLAYER = 'Gracz';
var REMIS = 'Remis';
var COMPUTER = 'Komputer';


// Parametry rozgrywki
var params = {
  pcScore: 0,
  playerScore: 0,
  numberOfRounds: 1
};

// Parametry zmienne
var playerName;
var numberOfRoundsToWin;

//Odwołania do poszczególnych elementów
var elemOutput = document.querySelector('#output'); // pierwszy znaleziony
var playerResult = document.querySelector('#playerResultContainer');
var pcResult = document.querySelector('#pcResultContainer');
var result = document.querySelector('#result');

// Nasłuchiwanie przycisków za pomocą pętli
var playerChoice = document.getElementsByClassName('player-move')

for (var i = 0; i < playerChoice.length; i++) {
  playerChoice[i].addEventListener('click', function(){
    playerMove(this.getAttribute('data-move'))
  });
}

// OPIS DZIAŁANIA PRZYCISKU NEWGAME

document.querySelector('#newGame_layer button')
  .addEventListener('click', function(){
    var inputEl = document.querySelector('#newGame_layer input')
    playerName = inputEl.value
    var inputRoundss = document.querySelector('#NumberOfRoundsToWinn')
    numberOfRoundsToWin = inputRoundss.value
    var gameLayer = document.querySelector('#game')
    gameLayer.style.display = 'block'
    var nameSelectLayer = document.querySelector('#newGame_layer')
    nameSelectLayer.style.display = 'none'
    document.querySelector('#new-game').style.display= 'none'
    console.log('Utworzenie nowej gry', inputEl, inputEl.value, inputRoundss.value)
  });
document.querySelector('#new-game')
  .addEventListener('click', function(){
    var gameLayer = document.querySelector('#game')
    gameLayer.style.display = 'none'
    var nameSelectLayer = document.querySelector('#newGame_layer')
    nameSelectLayer.style.display = 'block'
    params = {
      pcScore: 0,
      playerScore: 0,
      numberOfRounds: 1
    }
    elemOutput.innerHTML = ''
    playerResult.innerHTML = ''
    pcResult.innerHTML = ''
    result.innerHTML = ''
  
    result.appendChild (playerResult)
    result.appendChild (pcResult)
    document.querySelector('.dismiss')
    .style.display = 'flex'
    document.querySelector('#output')
    .style.display = 'block'
})


// Opis funkcji pcMove
function getPCMove() {
  var rand = Math.floor((Math.random() * 10) % 3);
  // 0 1 2
  switch(rand) {
    case 0: return ROCK;
    case 1: return SCISSORS;
    case 2: return PAPER;
  }
}
// OPiS FUNKCJI SPRAWDZAJĄCEJ WYNIK ROZGRYWKI
function resultOfTheGame(){
  if (params.pcScore == numberOfRoundsToWin){
  result.innerHTML = 'Wygrał komputer';
  document.querySelector('#new-game')
    .style.display = 'block'
  document.querySelector('.dismiss')
    .style.display = 'none'
  document.querySelector('#output')
    .style.display = 'none'
  }
  else if (params.playerScore == numberOfRoundsToWin){
  result.innerHTML = 'Wygrał ' + playerName;
  document.querySelector('#new-game')
    .style.display = 'block'
  document.querySelector('.dismiss')
    .style.display = 'none'
  document.querySelector('#output')
    .style.display = 'none'
  }
}

// Opis funkcji playerMove
var playerMove = function(playerPick) {
  var winner = COMPUTER;
  var winnerLabel = 'wygrał Komputer'
  var pcPick = getPCMove();
  
  console.clear();
  console.log(playerPick + ' vs. ' + pcPick);
  
  if (playerPick === pcPick) {
    winner = REMIS;
    winnerLabel = REMIS;
  } else {
    // GRACZ WYGRA GDY
    if (
      (playerPick === ROCK && pcPick === SCISSORS)
      || (playerPick === SCISSORS && pcPick === PAPER)
      || (playerPick === PAPER && pcPick === ROCK)
    ) {
      winner = PLAYER;
      winnerLabel = 'wygrał ' + playerName;
    }
    
  }
  
  
  console.log('winner ' + winner);
  
  elemOutput.innerHTML = 'Wynik: ' + winnerLabel + '<br>' + playerName + ' wybrał: ' + playerPick + '<br>Komputer wybrał: ' + pcPick 
  + '<br>' + 'Liczba rozegranych rund:' + params.numberOfRounds;
  
  if (winner === COMPUTER){
  params.pcScore += 1
  }
  else if (winner === PLAYER){
    params.playerScore += 1
  }

  params.numberOfRounds += 1
  
  watchingScore();
 
  resultOfTheGame();
}

// Sprawdzanie wyniku rozrywki:

function watchingScore(){
  playerResult.innerHTML = 'Wynik gracza: ' + params.playerScore;
  pcResult.innerHTML = 'Wynik komputera: ' + params.pcScore;
}