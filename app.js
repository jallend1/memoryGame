//  Cards from http://acbl.mybigcommerce.com/52-playing-cards/

const gameArea = document.querySelector('#gamearea');
const formDifficulty = document.querySelector('#challenge');
const button = document.querySelector('button');
const scoreBoard = document.querySelector('#score');
const colorSelection = document.querySelector('#colors');
const highScore = document.querySelector('#highscore');

if(localStorage.highscore){
    highScore.textContent = localStorage.highscore;
}

const timeLeft = document.querySelector('#timeleft');
let difficulty = formDifficulty.difficulty.value;
let cardColor = colorSelection.cardcolor.value;
let cardBack = `images/card${cardColor}.png`;
const revealedCards = [];                                                    // Array of the _revealed_ cards
const cardNames = [];                                                         // Array of all the available cards
let score = 0;

function generateCards() {                                              // Puts duplicates of every card into an array and randomizes order
    cardNames.length = 0;
    for(let i = 1; i < difficulty; i++){
        cardNames.push(`${i}C`, `${i}C`);
        cardNames.push(`${i}H`, `${i}H`);        
    }
    cardNames.sort(() => 0.5 - Math.random());
}

function populateCards(){                                                   // Converts card names into card elements
    cardNames.forEach((card, index) => {
        const newCard = document.createElement('img');
        newCard.setAttribute('src', cardBack);                              // Sets image to back of the card
        newCard.setAttribute('data-card', card);                            // Sets the data attribute of each element to its face value
        newCard.setAttribute('data-index', index);
        newCard.classList.add('card');                                      // Applies styling to the new card
        gameArea.appendChild(newCard);                                      // Adds card to div
        newCard.addEventListener('click', e => revealCard(e));
    });
}

function revealCard(e){                                                     // Flips the card over
    let selectedCard = {card: e.target.dataset.card, index: e.target.dataset.index};
    e.target.setAttribute('src', `images/${selectedCard.card}.png`);             // Shows card image associated with data-card
    revealedCards.push(selectedCard);
    if (revealedCards.length === 2){
        checkMatch();
    }    
}

function checkMatch(){
    if(revealedCards[0].card === revealedCards[1].card){                                // If the two selections match, run victory conditions
        matchSuccess();
        updateScore(score);
    }else{                                                                              // If they don't match, run fail conditions
        setTimeout(matchFail, 250);
    }
}

function matchFail(){                                                                   // Reverts card back to original state and resets revealedCards array
    const displayedCard = document.querySelectorAll('.card');
    displayedCard[revealedCards[0].index].setAttribute('src', cardBack);
    displayedCard[revealedCards[1].index].setAttribute('src', cardBack);
    revealedCards.length = 0;
}

function matchSuccess(){                                                                // Applies victory styling to selected cards and resets revealedCards array
    const displayedCard = document.querySelectorAll('.card');
    displayedCard[revealedCards[0].index].classList.add('success');
    displayedCard[revealedCards[1].index].classList.add('success');
    revealedCards.length = 0;
    score++;
    if(score > parseInt(localStorage.highscore)){
        localStorage.setItem('highscore', score);
        highScore.textContent = score;
    }
}

function changeDifficulty(e){
    if (e.target.value){
        difficulty = e.target.value;
    }
    resetGame();
}

function clearCards(){
    for(let i = 0; i < gameArea.children.length; i++){
        const displayedCard = document.querySelectorAll('.card');
        displayedCard.forEach(card => card.remove());
    }
}

function resetGame(){
    clearCards();
    generateCards();
    populateCards();
    score = 0;
    updateScore(score);
    timer(120);
}

function updateScore(newScore){                                                         // Updates score on screen
    scoreBoard.textContent = newScore;
}

function changeCardColor(){
    let previousColor = cardColor;
    cardColor = colorSelection.cardcolor.value;
    cardBack = `images/card${cardColor}.png`;
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {                                                          // Resets all existing card backs to the new color
        if(card.getAttribute('src') === `images/card${previousColor}.png`){
            card.setAttribute('src', `images/card${cardColor}.png`);
        }
    })
}

function timer(seconds){
    setInterval(function (){
        seconds--;
        timeLeft.textContent = seconds;
    }, 1000);
}

colorSelection.addEventListener('click', e => changeCardColor(e));
formDifficulty.addEventListener('click', e => changeDifficulty(e));
button.addEventListener('click', resetGame);

resetGame();