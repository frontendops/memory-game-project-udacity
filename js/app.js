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
let moves = 0;
let fullArray = shuffle(icons);


function startGame(){
    for (let i = 0; i < fullArray.length; i++) {

            const card = document.createElement('li'); //create each card as an li//to each li add the css class of card
            card.classList.add('card'); //to each li add the css class of card
            card.innerHTML = `<i class = "${fullArray[i]}"</i>`;//loop through each card to an icon
            let $deck = $('.deck').append(card);
            //calling the click function to each card
            click(card);

        }
}


function click(card) {
    card.addEventListener("click", function () {

    if (openCard.length === 1 ) {

        const currentCard = card;
        const previousCard = openCard[0];

        card.classList.add('open','show');
        openCard.push(card);
            // if two cards match
        comparison(currentCard, previousCard);
    } else {

        card.classList.add('open','show');
        openCard.push(card);
    }

});

}

// function to compare cards (passes current and previous card in argument)
function comparison (currentCard, previousCard) {
    if (currentCard.innerHTML === previousCard.innerHTML) {
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

        currentCard.classList.add('wrong');
        previousCard.classList.add('wrong');
        //delay by 500ms
        setTimeout(function() {
            currentCard.classList.remove('open', 'show', 'wrong');
            previousCard.classList.remove('open', 'show', 'wrong');

        }, 700);
        openCard = [];
  }
    turns();
    rank();
}

//function to check if the game is over
function gameOver() {
    if (matchedCards.length === icons.length) {
        alert('you won!!');
    } else {

    }
}

//restart button function

//$('.restart').on('click', function restart($deck) {
$('.restart').click(function restart($deck) {
    $('.deck').html("");
    matchedCards = [];
    startGame();
    moves = [];
    $('.moves').html(moves);
    $('.stars').html(`<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`);

});


// track the number of turns
function turns() {
    moves++
    $('.moves').html(moves);

}

//ranking system
function rank () {
    if ( moves === 18) {
        $('.stars').find(':first').remove();
    } else if  (  moves === 22) {
        $('.stars').find(':first').remove();
    } else if ( moves === 26) {
        $('.stars').find(':first').remove();
    } else if ( moves === 32) {
        $('.stars').find(':first').remove();
    }
}

//function to restart in the modul
$('.button').click(function(){
    $('.restart').trigger('click');
})

//calling the game to start when the browser loads
startGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
