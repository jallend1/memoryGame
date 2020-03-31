//  Cards from http://acbl.mybigcommerce.com/52-playing-cards/

const gameArea = document.querySelector('#gamearea');
let cardColor = 'green';
const cardBack = `images/card${cardColor}.png`;
const revealedCards = [];                                                    // Array of the _revealed_ cards
const cardNames = [];                                                         // Array of all the available cards
const scoreBoard = document.querySelector('#score');


function generateCards() {                                              // Puts duplicates of every card into an array and randomizes order
    for(let i = 1; i < 14; i++){
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
    let selectedCard = e.target.dataset.card;
    e.target.setAttribute('src', `images/${selectedCard}.png`);             // Shows card image associated with data-card
    revealedCards.push(selectedCard);
    if (revealedCards.length === 2){
        checkMatch();
        revealedCards.length = 0;
    }    
}

function checkMatch(){
    console.log(cardNames.item(index));
}

generateCards();
populateCards();