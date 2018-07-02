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
let $timer = $('.timer');
let second = 0;
let currentSeconds;
let stars = $('.stars');


function startGame(){
    for (let i = 0; i < fullArray.length; i++) {

            const card = document.createElement('li'); //create each card as an li//to each li add the css class of card
            card.classList.add('card'); //to each li add the css class of card
            card.innerHTML = `<i class = "${fullArray[i]}"</i>`;//loop through each card to an icon
            let $deck = $('.deck').append(card);//add cards to the deck
            //calling the click function to each card
            click(card);

        }
        //clearing timer when game is started
        clearTimer(currentSeconds);
        second = 0;
	    $timer.text(`${second}`)
        startTime();
}

//function for when a card is clicked
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
        $('.winningText').text(`it only took you ${moves} turns in ${second} seconds`);
        $('.modulContainer').css('display', 'block');
        //checking amount of moves to display what you scored
        if ( moves < 18 ) {
            $('.winningScore').text('You got 5 stars!!');
        } else if ( moves >= 19 && moves <= 21) {
            $('.winningScore').text('You got 4 stars!!');
        } else if (moves >= 22 && moves <= 26) {
            $('.winningScore').text('You got 3 stars!!');
        } else if (moves >= 27 && moves <= 31) {
            $('.winningScore').text('You got 2 stars!!');
        } else if (moves >= 32 ) {
            $('.winningScore').text('You got 1 star :()');
        }
//stops timer if the game ends !!
        clearTimer(currentSeconds);
        second = 0;

    }
}

//restart button function


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

//timer function
function startTime() {
    currentSeconds = setInterval(function (){
        $timer.text(`${second}`)
        second++
    },1000);
}
//restart timer
function clearTimer(seconds){
    if (seconds) {
        clearInterval(seconds);
    }
}
//function to restart game in play again button in popup 
$('.button').click(function(){
    $('.restart').trigger('click');
    $('.modulContainer').css('display', 'none');

})


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


//calling the game to start when the browser loads
startGame();
