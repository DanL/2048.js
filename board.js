var Board = (function() {
  var constructor = function() {
    // initializes an empty 5x5 board
    this.board = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];
  };

  constructor.prototype = {
    get_board: function() {
      return this.board;
    },

    // asserts whether the board contains a given value
    // this is used mostly for testing
    contains: function(value) {
      return _.chain(this.board).flatten().contains(value).value();
    },

    // returns the 0-24 indexes of all empty nodes
    find_empty_nodes: function() {
      return _.flatten(this.board).reduce(function(memo, value, index) {
        if(value === 0) {
          memo.push(index);
        }

        return memo;
      }, []);
    },

    // returns the 0-24 index of a random empty tile
    select_random_empty_tile: function() {
      var possible_nodes = this.find_empty_nodes();
      var selected_node = Math.floor(Math.random() * possible_nodes.length);
      return possible_nodes[selected_node];
    },

    // converts a 0-24 index to xy coordinates
    get_tile_coords: function(index) {
      var x = index % 5;
      var y = ((index - x) / 5);
      return { x: x, y: y };
    },

    // sets a random empty file to the given integer
    set_random_empty_tile: function(number) {
      var coords = this.get_tile_coords(this.select_random_empty_tile());
      this.board[coords.y][coords.x] = number;
    },

    // removes all left space between tiles
    collapse_left: function() {
      var zerofilled = [0, 0, 0, 0, 0];
      this.board = _.map(this.board, function(row) {
        var compacted_row = _.compact(row);
        var padding = zerofilled.slice(0, 5 - compacted_row.length);
        return compacted_row.concat(padding);
      });
    },

    // merges tiles into their immediate identical left neighbor
    fold: function(right) {
      // when folding left, we need to get the rightside tile
      // when folding right, we need to get the leftside tile
      var nearest_index = function(integer) {
        return right
          ? integer - 1
          : integer + 1;
      };

      this.board = _.map(this.board, function(row) {
        // iterates over each tile
        for(var x = 0; x < row.length; x++) {
          // compares against the tile immediately to the right
          if(row[x] === row[nearest_index(x)]) {
            row[x] *= 2;
            // unsets the next tile, so that when the
            // pointer advances, it won't compute again
            row[x + 1] = 0;
          }
        }

        return row;
      });
    },

    // collapses the board, performs a merge, then collapses again
    // to account for space left by the merge
    merge_left: function() {
      board.collapse_left();
      board.fold_left();
      board.collapse_left();
    }
  };

  return constructor;
})();
