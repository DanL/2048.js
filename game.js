var Game = (function() {
  var constructor = function() {
    this.board = new Board();
  };

  constructor.prototype = {
    get_board: function() {
      return this.board;
    }
  };

  return constructor;
})();
