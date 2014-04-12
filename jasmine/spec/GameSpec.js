describe('Game', function() {
  var game;

  beforeEach(function() {
    game = new Game();
  });

  it('has a board', function() {
    expect(game.board instanceof Board).toEqual(true);
  });

  describe('#get_board', function() {
    it('returns a board', function() {
      expect(game.get_board() instanceof Board).toEqual(true);
    });
  });

  describe('#start', function() {
    beforeEach(function() {
      game.start();
    });

    it('sets a random tile to 2', function() {
      expect(game.get_board().contains(2)).toEqual(true);
    });

    it('sets a random tile to 4', function() {
      expect(game.get_board().contains(4)).toEqual(true);
    });
  });

  describe('#left', function() {
    it('merges tiles left', function() {
      spyOn(game.board, 'merge_left').and.callThrough();
      game.left();
      expect(game.board.merge_left).toHaveBeenCalled();
    });
  });

  describe('#right', function() {
    it('merges tiles right', function() {
      spyOn(game.board, 'merge_right').and.callThrough();
      game.right();
      expect(game.board.merge_right).toHaveBeenCalled();
    });
  });
});
