var Game = (function() {
  var constructor = function() {
    this.board = new Board();
  };

  constructor.prototype = {
    get_board: function() {
      return this.board;
    },

    // initial setup before the first turn
    // this is run manually so that we can test against an empty board
    start: function() {
      this.board.set_random_empty_tile(2);
      // TODO: This should be randomized to either 2 or 4
      this.board.set_random_empty_tile(4);
    },

    left: function() {
      this.board.merge_left();
    },

    right: function() {
      this.board.merge_right();
    }
  };

  return constructor;
})();
