/*
 * Create a list that holds all of your cards
 */

let deckList = document.querySelectorAll('.card'); // creates a list of all cards in deck
let restartButton = document.querySelector('.restart'); // set up targetter for restart button
let moveCount = 0; // initialize the move counter
let score = document.querySelector('.moves'); // target the score

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/**
 *  personal shuffle function adapted from provided function to work for objects on objects inside of targeted object 
 * // Shuffle function from http://stackoverflow.com/a/2450976
 * 
*/

//converts an object to an array allowing html elements (which are objects) to be shuffled using the shuffle function
function nodeListToArray(nodeList) {
    let results = [];
    for (let i = 0; i< nodeList.length; i ++) {
        results[i] = nodeList[i];
    }
    return results;
}

function resetCardClasses() { // removes all classes that reveal the cards
    deckList.forEach(function(currentValue, currentIndex, listObj) {
        currentValue.classList.remove('show'); 
        currentValue.classList.remove('match');
        currentValue.classList.remove('open');
    });
}

function shuffle(array) {
    if (typeof array == 'object') {
        array = nodeListToArray(array); // converts any objects passed in into an array;
    }
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//shuffle deck function for shuffling and adding the cards back to our deck
function shuffleDeck() {
    deckList = document.querySelectorAll('.card'); // targeter for all the li.card elements
    let deck = document.querySelector('.deck'); // setup a targeter ul.deck elements
    let shuffledDeck = shuffle(deckList);; // assign the shuffled decklist to a local variable
    deck.innerHTML = ''; // clear the deck, so we can append children
    shuffledDeck.forEach( // iterates through our generated shuffledDecklist in order to append each card to ul.deck
        function(currentValue, currentIndex, listObj){
            let currentNode = currentValue; // assigns currentNode to be the current node of our shuffled list
            deck.appendChild(currentNode); // add our nodes to the deck node
        }
    )
}

function toggleCardVisibility() {
    initialOpenCard.classList.toggle('show');
    initialOpenCard.classList.toggle('open');
    secondOpenCard.classList.toggle('show');
    secondOpenCard.classList.toggle('open');
}

function resetScore() {
    moveCount = 0;
    updateScore();
}

function updateScore() {
    score.textContent = moveCount; // change our actual html element showing score to reflect actual score
}





/**
 * 
 * event listeners
 * 
 */
restartButton.onclick = function() {handleResetClick();}; // set up event listener for our restart function

// * set up the event listener for each card.
deckList.forEach(
    function(currentValue, currentIndex, listObj) {
        currentValue.addEventListener("click", handleCardClick);
});


/**
 * 
 * event handlers
 * 
 */

function handleResetClick() { // handler function for reset clicks
    resetScore(); // reset score
    resetCardClasses(); // reset revealing classes for all cards
    shuffleDeck(); // shuffles card positions
}

/*
 *- if the list already has another card, check to see if the two cards match
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let openCards = []; // list to remember what cards have been revealed
let initialOpenCard; // variable to target our initial card opened
let secondOpenCard; // variable to target our second card opened

function handleCardClick(event) {
    let selectedCard = event.target; // selector for card clicked
    
    // condition to prevent anything from happening if a matched card or non-card element is clicked
    if (selectedCard.classList.contains('match') || !selectedCard.classList.contains('card')) {
        return; //do nothing
    } else {
        incrementScore(); // add to moves
    }
    
    selectedCard.classList.add('open');
    selectedCard.classList.add('show');
    openCards.push(selectedCard.querySelector('.fa').classList.item(1));

    if (openCards.length == 1) {  // save the first revealed card 
        initialOpenCard = selectedCard;
    }

    if (openCards.length == 2) {  // save second revealed card
        secondOpenCard = selectedCard;
    } 

    if (openCards.length == 2) { // compare images on the two revealed cards
        if (openCards[0] == openCards[1]) { // if matched
            //set initial revealed card as matched
            initialOpenCard.classList.add('match');
            //set second revealed card as matched
            secondOpenCard.classList.add('match');
        }
         
        toggleCardVisibility(); // reset revealed cards
        openCards = []; // reset revealed card list
    }
}


function incrementScore() {
    moveCount++;
    updateScore();
}
