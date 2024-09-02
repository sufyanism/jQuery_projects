var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(function() {
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function() {
  var cardArray = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
  var cardValues = [];

  /* Move a random card from cardArray to cardvalue */
  while (cardArray.length > 0) {
      var randomIndex = Math.floor(Math.random()*cardArray.length);
      cardValues.push(cardArray[randomIndex]);
      cardArray.splice(randomIndex,1);
  }

  return cardValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  /* create CSS styles for each number in cardValues */
  var cardColors = ["hsl(25,85%,65%)", "hsl(55,85%,65%)", "hsl(90,85%,65%)", "hsl(160,85%,65%)", "hsl(220,85%,65%)", "hsl(265,85%,65%)", "hsl(310,85%,65%)", "hsl(360,85%,65%)"];

  $game.empty(); /* empty HTML */
  $game.data('flippedCards',[]); /* Track number of flippedCards */

  /* Loop through cardValues to create card objects */
  cardValues.forEach(function(value) {
    var $card = $('<div class="col-xs-3 card"></div>');

    $card.data('value', value);
    $card.data('isFlipped', false);
    $card.data('color', cardColors[value - 1]);

    $game.append($card);
  });

/* Event listener for user clicking card */
  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  /* Prevent flipped card from getting triggered */
  if ($card.data('isFlipped')) {
    return;
  };

  $card.css('background-color', $card.data('color'));
  $card.text($card.data('value'));
  $card.data('isFlipped', true);

  /* Track flipped cards and observe match */
  var flippedCards = $game.data('flippedCards')
  flippedCards.push($card);

  /* Conditionals for styling cards upon match */

  /* Check if there are 2 active flippedCards */
  if (flippedCards.length === 2) {
    /* Check if flippedCards values match each other */
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      var matched = {
        backgroundColor: 'rgb(153,153,153)',
        color: 'rgb(204,204,204)'
      };

      flippedCards[0].css(matched);
      flippedCards[1].css(matched);

      } else {
      /* Reset flippedCards to original styling */
        window.setTimeout(function() {
          flippedCards[0].css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('isFlipped',false);
          flippedCards[1].css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('isFlipped',false);
        }, 350);
      };

    $game.data('flippedCards',[]); /* Reset flippedCards tracker to 0 */
  };
};
