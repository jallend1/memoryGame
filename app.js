//  Cards from http://acbl.mybigcommerce.com/52-playing-cards/

const gameArea = document.querySelector('#gamearea');
const scoreBoard = document.querySelector('#score');
let displayOrder;
let cardColor = 'green';
const cardBack = `images/card${cardColor}.png`;
const cards = [];                                                           // Array of all the available cards
const revealedCards = [];                                                    // Array of the _revealed_ cards
let score = 0;

function checkMatch(){
    let cardOne = revealedCards[0];
    let cardTwo = revealedCards[1];
    let oneLocation = cards.indexOf(cardOne);
    let twoLocation = cards.indexOf(cardTwo);
    if(cardOne === cardTwo){
        score++;
        scoreBoard.innerText = score;
        displayOrder[oneLocation].classList.add('success');
        displayOrder[twoLocation].classList.add('success');
    }else{
        setTimeout(() => {
            displayOrder[oneLocation].setAttribute('src', cardBack);
            displayOrder[twoLocation].setAttribute('src', cardBack);
            console.log(displayOrder[oneLocation]);
            console.log(displayOrder[twoLocation]);
        }, 500);
    }
    revealedCards.length = 0;
}

function createCardsInArray(){                                              // Puts duplicates of every card into the array
    for(let i = 1; i < 14; i++){
        cards.push(`${i}C`, `${i}C`);
        cards.push(`${i}H`, `${i}H`);        
    }
    cards.sort(() => 0.5 - Math.random());                                  // Puts the cards in a random order
}

function populateCards(){                                                   // Populates the back of the cards on screen
    cards.forEach(card => {
        const newCard = document.createElement('img');
        newCard.setAttribute('src', cardBack);                              // Sets image to back of the card
        newCard.setAttribute('data-card', card);
        newCard.classList.add('card');                                      // Applies styling to the new card
        gameArea.appendChild(newCard);                                      // Adds card to div
        newCard.addEventListener('click', e => revealCard(e));
    });
    return document.querySelectorAll('.card');
}

function revealCard(e){                                                     // Flips the card over
    let selectedCard = e.target.dataset.card;
    e.target.setAttribute('src', `images/${selectedCard}.png`);
    revealedCards.push(selectedCard);
    if (revealedCards.length === 2){
        checkMatch();
    }    
}

createCardsInArray()
displayOrder = populateCards();