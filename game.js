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

    // if this returns false, the game is over
    move: function(direction) {
      var original_board = this.board.board;

      this[direction]();

      if(this.board.has_empty_tile()) {
        if(_.difference(this.board.board, original_board).length > 0) {
          this.board.set_random_empty_tile(2);
        }

        return true;
      }

      return false;
    },

    left: function() {
      this.board.collapse_left();
      this.board.fold_left();
      this.board.collapse_left();
    },

    right: function() {
      this.board.collapse_right();
      this.board.fold_right();
      this.board.collapse_right();
    },

    up: function() {
      this.board.rotate_ccw();
      this.board.collapse_left();
      this.board.fold_left();
      this.board.collapse_left();
      this.board.rotate_cw();
    },

    down: function() {
      this.board.rotate_cw();
      this.board.collapse_right();
      this.board.fold_right();
      this.board.collapse_right();
      this.board.rotate_ccw();
      this.board.flip_horizontally();
    }
  };

  return constructor;
})();
