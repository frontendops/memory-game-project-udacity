/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
"fa fa-anchor","fa fa-anchor","fa fa-bolt","fa fa-bolt","fa fa-cube",
"fa fa-cube","fa fa-leaf","fa fa-leaf",
"fa fa-bicycle","fa fa-bicycle","fa fa-bomb",
"fa fa-bomb"];

let openCard = [];
let matchedCards = [];

for (let i = 0; i < icons.length; i++) {

        const card = document.createElement('li'); //create each card as an li//to each li add the css class of card
        card.classList.add('card'); //to each li add the css class of card
        card.innerHTML = `<i class = "${icons[i]}"</i>`;//loop through each card to an icon
        $('.deck').append(card);

        //fucntion to click on cards and reveal them with css classes
        card.addEventListener("click", function () {

        if (openCard.length === 1 ) {

            const currentCard = card;
            const previousCard = openCard[0];

            card.classList.add('open','show');
            openCard.push(card);
                // if two cards match
                if (this.innerHTML === openCard[0].innerHTML) {
                    currentCard.classList.add('match');
                    previousCard.classList.add('match');
                    // store all of the cards that are matched
                    matchedCards.push(currentCard);
                    matchedCards.push(previousCard);
                    //resets cards after 2 clicks
                    openCard = [];
                    //check if game is over function called in here
                    gameOver();
                } else {
                    //delay by 500ms
                    setTimeout(function() {
                        currentCard.classList.add('wrong');
                        previousCard.classList.add('wrong');
                        openCard = [];

                    }, 400);

                    openCard = [];
                }

        } else {

            card.classList.add('open','show');
            openCard.push(card);
        }

    });

}


//function to check if the game is over
function gameOver() {
    if (matchedCards.length === icons.length) {
        alert('you won!!');
    } else {

    }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
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
