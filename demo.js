// Demo app to show how to use Deck Of Cards module

(function() {
  angular.module('cardDemo', ['DeckOfCards']);
  
  // create a controller to bind to the UI of the demo page
  angular
    .module('cardDemo')
    .controller('DemoController', DemoController);
  
  // inject the deckFactory from the DeckOfCards module into our controller
  DemoController.$inject = ['deckFactory'];
  
  function DemoController(deckFactory) {
    var self = this;
    
    // create a new deck of cards
    self.deck = deckFactory.createNewDeck();
    
    // an array to show cards that have been dealt
    self.dealt = [];
    
    // a proxy for the deck's shuffle
    self.shuffle = self.deck.shuffle;
    
    // expose a reset method to clear the board
    self.reset = reset;
    
    // expose functions to deal one or all cards
    self.dealOne = dealOne;
    self.dealAll = dealAll;
    
    // expose a method that redraws the screen with a shuffled deck fully dealt
    self.dealShuffledDeck = dealShuffledDeck;
    self.emptyDiv = emptyDiv;
    function reset() {
      self.dealt = [];
      // puts the cards in order
      self.deck.reset();
    }
    
    function dealOne() {
      // get a card from the deck
      var nextCard = self.deck.dealOneCard();
      if (nextCard) {
        // add the card to the dealt array to bind to the UI
        self.dealt.push(nextCard);
      }
      return nextCard;
    }
    
    function dealAll() {
      // continue dealing one until all cards are dealt
      while (dealOne()) {}
    }
    
    // easy way to show off the shuffle
    function dealShuffledDeck() {
      self.reset();
      self.shuffle();
      self.dealAll();
    }

    function emptyDiv(index){     
       //self.deck.cards.splice(self.deck.cards.indexOf(index), 1);
       self.dealt[index] = [];
   }
  
  }  
})();