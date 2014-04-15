var Game = (function() {
  var constructor = function(board_size) {
    this.board = new Board(board_size);
    this.current_points = 0;
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
        if(this.board.board.join() != original_board.join()) {
          this.current_points += this.calculate_points(original_board, this.board.board);
          this.board.set_random_empty_tile();
        }

        return true;
      }

      return false;
    },

    calculate_points: function(original_board, current_board) {
      // returns non-unique values that are only in the new array
      function diff(old_array, new_array) {
        _.each(old_array, function(value, old_index) {
          var new_index = _.indexOf(new_array, value);
          if(new_index !== -1) {
            delete old_array[old_index];
            delete new_array[new_index];
          }
        });

        return new_array;
      }

      var new_array = diff(_.flatten(original_board),
                           _.flatten(current_board));

      return _.reduce(new_array, function(sum, num) {
        return sum + num;
      }, 0);
    },

    points: function() {
      return this.current_points;
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
