var Game = (function() {
  var constructor = function(board_size) {
    this.board = new Board(board_size);
  };

  constructor.prototype = {
    get_board: function() {
      return this.board;
    },

    // initial setup before the first turn
    // this is run manually so that we can test against an empty board
    start: function() {
      this.board.set_random_empty_tile();
      this.board.set_random_empty_tile();
    },

    // checks to see whether you've lost
    has_possible_move: function() {
      return this.board.has_possible_move();
    },

    // if this returns false, the game is over
    move: function(direction) {
      var original_board = this.board.board;

      this[direction]();

      if(this.board.has_empty_tile()) {
        // TODO: test this when moving up/down
        if(this.board.board.join() != original_board.join()) {
          this.board.set_random_empty_tile();
        }

        return true;
      }

      return false;
    },

    left: function() {
      this.board.collapse();
      this.board.fold();
      this.board.collapse();
    },

    // rotates the board 180* to simulate a foldr
    right: function() {
      this.board.rotate_ccw();
      this.board.rotate_ccw();
      this.board.collapse();
      this.board.fold();
      this.board.collapse();
      this.board.rotate_cw();
      this.board.rotate_cw();
    },

    up: function() {
      this.board.rotate_ccw();
      this.board.collapse();
      this.board.fold();
      this.board.collapse();
      this.board.rotate_cw();
    },

    down: function() {
      this.board.rotate_cw();
      this.board.collapse();
      this.board.fold();
      this.board.collapse();
      this.board.rotate_ccw();
    }
  };

  return constructor;
})();
