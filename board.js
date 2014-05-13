var Board = (function() {
  var constructor = function(board_size) {
    this.board_size = board_size;

    // needs to be a var since `this` has a different context in #times
    var row = _(this.board_size).times(function() {
      return 0;
    });
    this.row = row;

    this.board = _(this.board_size).times(function() {
      return _.clone(row);
    });
  };

  constructor.prototype = {
    // returns the Board object
    get_board: function() {
      return this.board;
    },

    // asserts whether the board contains a given value
    // this is used mostly for testing
    contains: function(value) {
      return _.chain(this.board).flatten().contains(value).value();
    },

    // returns the 0-((board_size ^ 2) - 1) indexes of all empty nodes
    find_empty_nodes: function() {
      return _.flatten(this.board).reduce(function(memo, value, index) {
        if(value === 0) {
          memo.push(index);
        }

        return memo;
      }, []);
    },

    // returns the 0-((board_size ^ 2) - 1) index of a random empty tile
    select_random_empty_tile: function() {
      var possible_nodes = this.find_empty_nodes();
      var selected_node = Math.floor(Math.random() * possible_nodes.length);
      return possible_nodes[selected_node];
    },

    // converts a 0-((board_size ^ 2) - 1) index to xy coordinates
    get_tile_coords: function(index) {
      var x = index % this.board_size;
      var y = ((index - x) / this.board_size);
      return { x: x, y: y };
    },

    // predicate to determine if there are any empty tiles
    has_empty_tile: function() {
      return this.contains(0);
    },

    // sets a random empty file to 2 or 4 and returns the value
    set_random_empty_tile: function() {
      var numbers = [2, 4];
      var random_number = numbers[Math.floor(Math.random() * 2)];
      var coords = this.get_tile_coords(this.select_random_empty_tile());
      this.board[coords.y][coords.x] = random_number;

      return random_number;
    },

    // removes all left space between tiles
    collapse: function() {
      var zerofilled = this.row;
      var board_size = this.board_size;
      this.board = _.map(this.board, function(row) {
        var compacted_row = _.compact(row);
        var padding = zerofilled.slice(0, board_size - compacted_row.length);
        return compacted_row.concat(padding);
      });
    },

    // merges tiles into their immediate identical left neighbor
    fold: function() {
      this.board = _.map(this.board, function(row) {
        // iterates over each tile
        for(var x = 0; x < row.length; x++) {
          // compares against the tile immediately to the right
          if(row[x] === row[x + 1]) {
            row[x] *= 2;
            // unsets the next tile, so that when the
            // pointer advances, it won't compute again
            row[x + 1] = 0;
          }
        }

        return row;
      });
    },

    // rotate the board counterclockwise
    rotate_ccw: function() {
      this.board = _.map(this.board, function(row) {
        return row.reverse();
      });

      this.board = _.zip.apply(_, this.board);
    },

    // rotate the board clockwise
    rotate_cw: function() {
      this.board = _.zip.apply(_, this.board).map(function(row) {
        return row.reverse();
      });
    },

    // predicate to determine if another move is possible
    has_possible_move: function() {
      // always has a possible move if a tile is empty
      if(this.has_empty_tile()) return true;

      // each row
      for(var y = 0; y < this.board_size; y++) {
        // each cell
        for(var x = 0; x < this.board_size; x++) {
          if(this.can_move_left(x, y) ||
             this.can_move_right(x, y) ||
             this.can_move_up(x, y) ||
             this.can_move_down(x, y)) {
            return true;
          }
        }
      }

      return false;
    },

    // predicate to determine if a cell can move left
    can_move_left: function(x, y) {
      if(!(x > 0)) return false;
      if(this.board[y][x - 1] === 0) return true;
      return this.board[y][x - 1] === this.board[y][x];
    },

    // predicate to determine if a cell can move right
    can_move_right: function(x, y) {
      if(!(x < (this.board_size - 1))) return false;
      if(this.board[y][x + 1] === 0) return true;
      return this.board[y][x + 1] === this.board[y][x];
    },

    // predicate to determine if a cell can move up
    can_move_up: function(x, y) {
      if(!(y > 0)) return false;
      if(this.board[y - 1][x] === 0) return true;
      return this.board[y - 1][x] === this.board[y][x];
    },

    // predicate to determine if a cell can move down
    can_move_down: function(x, y) {
      if(!(y < (this.board_size - 1))) return false;
      if(this.board[y + 1][x] === 0) return true;
      return this.board[y + 1][x] === this.board[y][x];
    }
  };

  return constructor;
})();
