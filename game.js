var Game = (function() {
  var constructor = function() {
    this.board = new Board();
  };

  constructor.prototype = {
    get_board: function() {
      return this.board;
    },

    start: function() {
      this.board.set_random_tile(2);
      this.board.set_random_tile(4);
    }
  };

  return constructor;
})();
