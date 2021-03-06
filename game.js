var Game = (function() {
  var constructor = function(board_size) {
    this.board = new Board(board_size);
    this.current_points = 0;
  };

  constructor.prototype = {
    // returns the Board object
    get_board: function() {
      return this.board;
    },

    // initial setup before the first turn
    // this is run manually so that we can test against an empty board
    start: function() {
      this.board.set_random_empty_tile();
      this.board.set_random_empty_tile();
    },

    // checks to see if you've lost
    has_possible_move: function() {
      return this.board.has_possible_move();
    },

    // checks to see if you've won
    has_2048_tile: function() {
      return this.board.contains(2048);
    },

    // if this returns false, nothing has changed
    move: function(direction) {
      var original_board = _.flatten(this.board.board);

      this[direction]();

      var current_board = _.flatten(this.board.board);

      // determines if the board has changed at all for the current turn
      // if it hasn't, a new random tile is not added, and the score is not modified
      if(this.board.has_possible_move() &&
         current_board.join() != original_board.join()) {
        this.current_points += this.calculate_points(original_board, current_board);
        this.board.set_random_empty_tile();

        return true;
      }

      return false;
    },

    // calculates the points gained in a given turn
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

      var new_array = diff(original_board, current_board);

      return _.reduce(new_array, function(sum, num) {
        return sum + num;
      }, 0);
    },

    // returns the current points
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
