/*
 * Create a list that holds all of your cards
 */

let deckList = document.querySelectorAll('.card'); // initializes our list of the cards in the deck


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/**
 *  personal shuffle function adapted from below to work for objects on objects inside of targeted object 
 * 
*/
let testObject = {
    0: {0:'a'},
    1: {0:'b'},
    2: {0:'c'}
}
//converts an object to an array allowing html elements (which are objects) to be shuffled using the shuffle function
function nodeListToArray(nodeList) {
    let results = [];
    for (let i = 0; i< nodeList.length; i ++) {
        results[i] = nodeList[i];
    }
    return results;
}

// Shuffle function from http://stackoverflow.com/a/2450976
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
function shuffleDeck() {
    deckList = deckList = document.querySelectorAll('.card'); // updates the list of cards in the deck
    let deck = document.querySelector('.deck');
    let shuffledDeck = shuffle(deckList);;
    deck.innerHTML = ''; // clear the deck, so we can append children
    shuffledDeck.forEach(
        function(currentValue, currentIndex, listObj){
            //console.log(currentValue);
            let currentNode = currentValue;
            deck.append(currentNode); // + ', ' + currentIndex + ', ' + this
        }
    )
    return shuffledDeck;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
