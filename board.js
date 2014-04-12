var Board = (function() {
  var constructor = function() {
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

    contains: function(value) {
      return _.chain(this.board).flatten().contains(value).value();
    },

    find_empty_nodes: function() {
      return _.flatten(this.board).reduce(function(memo, value, index) {
        if(value === 0) {
          memo.push(index);
        }

        return memo;
      }, []);
    },

    select_random_empty_tile: function() {
      var possible_nodes = this.find_empty_nodes();
      var selected_node = Math.floor(Math.random() * possible_nodes.length);
      return possible_nodes[selected_node];
    },

    get_tile_coords: function(index) {
      var x = index % 5;
      var y = ((index - x) / 5);
      return { x: x, y: y };
    },

    set_random_tile: function(number) {
      var coords = this.get_tile_coords(this.select_random_empty_tile());
      this.board[coords.y][coords.x] = number;
    }
  };

  return constructor;
})();
