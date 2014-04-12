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
      spyOn(game.board, 'collapse_left').and.callThrough();
      spyOn(game.board, 'fold_left').and.callThrough();
      game.left();
      expect(game.board.collapse_left).toHaveBeenCalled();
      expect(game.board.fold_left).toHaveBeenCalled();
      // Not sure how to assert that #collapse_left gets called again.
      // expect(game.board.collapse_left).toHaveBeenCalled();
    });
  });

  describe('#right', function() {
    it('merges tiles right', function() {
      spyOn(game.board, 'collapse_right').and.callThrough();
      spyOn(game.board, 'fold_right').and.callThrough();
      game.right();
      expect(game.board.collapse_right).toHaveBeenCalled();
      expect(game.board.fold_right).toHaveBeenCalled();
      // Not sure how to assert that #collapse_right gets called again.
      // expect(game.board.collapse_right).toHaveBeenCalled();
    });
  });

  describe('#up', function() {
    it('merges tiles up', function() {
      spyOn(game.board, 'rotate_ccw').and.callThrough();
      spyOn(game.board, 'collapse_left').and.callThrough();
      spyOn(game.board, 'fold_left').and.callThrough();
      spyOn(game.board, 'rotate_cw').and.callThrough();
      game.up();
      expect(game.board.rotate_ccw).toHaveBeenCalled();
      expect(game.board.collapse_left).toHaveBeenCalled();
      expect(game.board.fold_left).toHaveBeenCalled();
      // Not sure how to assert that #collapse_right gets called again.
      // expect(game.board.collapse_left).toHaveBeenCalled();
      expect(game.board.rotate_cw).toHaveBeenCalled();
    });
  });

  describe('#down', function() {
    it('merges tiles down', function() {
      spyOn(game.board, 'rotate_cw').and.callThrough();
      spyOn(game.board, 'collapse_right').and.callThrough();
      spyOn(game.board, 'fold_right').and.callThrough();
      spyOn(game.board, 'rotate_ccw').and.callThrough();
      game.down();
      expect(game.board.rotate_cw).toHaveBeenCalled();
      expect(game.board.collapse_right).toHaveBeenCalled();
      expect(game.board.fold_right).toHaveBeenCalled();
      // Not sure how to assert that #collapse_right gets called again.
      // expect(game.board.collapse_right).toHaveBeenCalled();
      expect(game.board.rotate_ccw).toHaveBeenCalled();
    });
  })
});
