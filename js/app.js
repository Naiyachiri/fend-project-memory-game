/*
 * Create a list that holds all of your cards
 */
let deckList = document.querySelectorAll('.card'); // creates a list of all cards in deck
let moveCount = 0; // initialize the move counter
let score = document.querySelector('.moves'); // target the score
let openCards = []; // list to remember what cards have been revealed
let initialOpenCard; // variable to target our initial card opened
let secondOpenCard; // variable to target our second card opened
let endGameStatus = 0; // game ends at 8
let seconds = 0; // timer variable
let gameResetState = 0; // determines if timer starts on card click (0) or stops because game is reset (1)

const modalMessage = document.querySelector('.modal-message'); // target the p tag to tell player victory details
const starBoard = document.querySelector('.stars'); // targets the unordered list containing our stars
const allStars = document.querySelectorAll('.fa-star'); // list all stars DOM elements in our starboard 
const restartButton = document.querySelector('.restart'); // set up targetter for restart button
const modal = document.querySelector('.modal'); // targets the modal
const closeModal = document.querySelector('.close-modal'); // targets close button for modal
const clockText = document.querySelector('.clock-text'); // target our clock's text

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



//converts an object to an array allowing html elements (which are objects) to be shuffled using the shuffle function
function nodeListToArray(nodeList) {
    let results = [];
    for (let i = 0; i< nodeList.length; i ++) {
        results[i] = nodeList[i];
    }
    return results;
}

/**
 * //card related functions
 */
function resetCardClasses() { // removes all classes that reveal the cards
    deckList.forEach(function(currentValue, currentIndex, listObj) {
        currentValue.classList.remove('show'); 
        currentValue.classList.remove('match');
        currentValue.classList.remove('open');
    });
}

function toggleCardVisibility() {
    initialOpenCard.classList.toggle('show');
    initialOpenCard.classList.toggle('open');
    secondOpenCard.classList.toggle('show');
    secondOpenCard.classList.toggle('open');
}

/**
 * // deck related functions
 */
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
/**
 *  personal shuffle function adapted from provided function to work for objects on objects inside of targeted object 
 * Shuffle function from http://stackoverflow.com/a/2450976
 * 
*/

function startClock() {
    if (endGameStatus == 8) {
        console.log('You\'ve completed the memory game in ' + seconds +  'seconds!' );
        return seconds; // time spent to complete game
    }
    if (gameResetState == 1) { // if game is restarted do not continue counting
        console.log('game reset! Timer awaiting first move!');
        return;
    }
   
    seconds++; 
    updateClockText();
    setTimeout(startClock, 1000); //repeats the function every 1 second
}

function updateClockText() {
    clockText.textContent = seconds + ' seconds';
}

/**
 * // move/score related functions
 */


function updateModalMessage() {
    modalMessage.innerHTML = 'Congratulations you have won! <br>  The time it took you was ' + seconds + ' seconds! <br>  It took you ' + moveCount + ' moves! <br> Hit the X to play again!'; 
}

function showModal() {
    if (endGameStatus == 8) { // only show the modal when the game is over
        updateModalMessage();
    modal.style.display = 'initial'; // changes display css to be visible
    }
}

function evalStarRating() {
    allStars.forEach( //reset colors to update to new score
        function (currentValue) {
            currentValue.classList.remove('gold');
        }
    )
    if (moveCount <= 24) { // 3 stars if  24 and under moves
        allStars.forEach(
            function(currentValue, currentIndex, listObj) {
                currentValue.classList.add('gold');
            }
        );
    }
    else if (moveCount >= 25 && moveCount <= 36) { // between 25 and 36 is 2 stars
        for (let i = 0; i < 2; i++) {
            allStars[i].classList.add('gold');
        }
    } 
    else if (moveCount >= 37 && moveCount <= 72) {
        allStars[0].classList.add('gold');
    }
    else {
        return; // no stars past 72!
    }
}

function resetScore() {
    moveCount = 0;
    updateScore();
}

function updateScore() {
    score.textContent = moveCount; // change our actual html element showing score to reflect actual score
}

function incrementScore() {
    moveCount++;
    updateScore();
}

/**
 * 
 * event listeners
 * 
 */
restartButton.onclick = function() {handleResetClick();}; // set up event listener for our restart function
closeModal.onclick = function() {handleCloseModal();} // set up event listener for closing the modal


function startEventListeners() { // * set up the event listener for each card
    deckList.forEach(
        function(currentValue, currentIndex, listObj) {
            currentValue.addEventListener("click", handleCardClick);
    });    
}

//reset all event listeners
function resetListeners() {
    deckList.forEach(
        function(currentValue, currentIndex, listObj) {
            currentValue.removeEventListener("click", handleCardClick);
        }
    )
}

/**
 * 
 * event handlers
 * 
 */

function handleResetClick() { // handler function for reset clicks
    gameResetState = 1; // stop the timer
    resetScore(); // reset score
    resetCardClasses(); // reset revealing classes for all cards
    resetListeners(); // re-enable card click handlers
    shuffleDeck(); // shuffles card positions    
    startEventListeners();
    openCards = []; // resets open cards
    seconds = 0; // resets the clock
    updateClockText();
    endGameStatus = 0; // resets game status
}

function handleCloseModal() {
    modal.style.display =  'none'; // changes modal display back to default, hidden
    handleResetClick(); // resets the game
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



function handleCardClick(event) {
    let selectedCard = event.target; // selector for card clicked
    gameResetState = 0; // enable timer to start
    if (seconds == 0) {
        startClock(); //starts clock on card click if not already started
    }
    // condition to prevent anything from happening if a matched card or non-card element is clicked
    if (selectedCard.classList.contains('match') || !selectedCard.classList.contains('card')) {
        return; //do nothing
    } else {
        incrementScore(); // increments moves
    }
    selectedCard.classList.add('open');
    selectedCard.classList.add('show');
    openCards.push(selectedCard.querySelector('.fa').classList.item(1));
    if (openCards.length == 1) {  // save the first revealed card 
        initialOpenCard = selectedCard;
        initialOpenCard.removeEventListener("click", handleCardClick); // prevent repeated calls to function on same card
    }

    if (openCards.length == 2) {  // save second revealed card
        secondOpenCard = selectedCard;
        secondOpenCard.removeEventListener("click", handleCardClick);
    } 

    if (openCards.length == 2) { // compare images on the two revealed cards
        if (openCards[0] == openCards[1]) { // if matched
            //set initial revealed card as matched
            initialOpenCard.classList.add('match');
            //set second revealed card as matched
            secondOpenCard.classList.add('match');
            toggleCardVisibility(); // reset revealed cards
            endGameStatus++;
        } else {
            initialOpenCard.addEventListener("click", handleCardClick); // reenable clicking of the same card again
            secondOpenCard.addEventListener("click", handleCardClick); // reenable clicking of the same card again
            setTimeout(toggleCardVisibility, 200); // set a timer so the player can see both revealed cards before they are hidden; a low time of 200ms selected because higher times players are likely to click before the card is finished fading causing a card to remain revealed
        }
        openCards = []; // reset revealed card list
        evalStarRating(); // evaluate player's rating
        showModal(); // shows end game message
    }
}

handleResetClick(); // initiate the game by resetting the board