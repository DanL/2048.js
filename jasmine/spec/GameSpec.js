describe('Game', function() {
  var game;

  beforeEach(function() {
    game = new Game(5);
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
    it('sets two random tiles', function() {
      spyOn(game.board, 'set_random_empty_tile');
      game.start();
      expect(game.board.set_random_empty_tile.calls.count()).toEqual(2);
    });
  });

  describe('#has_possible_move', function() {
    it('checks whether there are any possible moves', function() {
      spyOn(game.board, 'has_possible_move');
      game.has_possible_move();
      expect(game.board.has_possible_move).toHaveBeenCalled();
    });
  });

  describe('#has_2048_tile', function() {
    it('checks whether a 2048 tile exists', function() {
      spyOn(game.board, 'contains');
      game.has_2048_tile();
      expect(game.board.contains).toHaveBeenCalledWith(2048);
    });
  });

  describe('#move', function() {
    it('moves the board in a direction', function() {
      spyOn(game, 'left').and.callThrough();
      game.move('left');
      expect(game.left).toHaveBeenCalled();
    });

    describe('when moving the board results in a change', function() {
      it('spawns a random tile', function() {
        game.board.board = [
          [0, 2, 0, 0, 0],
          [0, 2, 0, 0, 0],
          [0, 2, 0, 0, 0],
          [0, 2, 0, 0, 0],
          [0, 2, 0, 0, 0]
        ];

        spyOn(game.board, 'set_random_empty_tile').and.callThrough();
        game.move('left');
        expect(game.board.set_random_empty_tile).toHaveBeenCalled();
      });

      it('adds points for any merged tiles', function() {
        game.board.board = [
          [2, 2, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]
        ];

        game.move('left');
        expect(game.current_points).toEqual(4);
      });
    });

    describe('when the board has no possible moves', function() {
      it('returns false', function() {
        // this board has no mergeable tiles
        game.board.board = [
          [2, 4, 2, 4, 2],
          [4, 2, 4, 2, 4],
          [2, 4, 2, 4, 2],
          [4, 2, 4, 2, 4],
          [2, 4, 2, 4, 2]
        ];

        expect(game.move('left')).toEqual(false);
      });
    });
  });

  describe('#calculate_points', function() {
    it('returns the sum of all changes to the new board, excluding the randomly generated number', function() {
      game.board.board = _.flatten([
        [8, 2, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ]);

      var original_board = _.flatten([
        [4, 4, 2, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ]);

      expect(game.calculate_points(original_board, game.board.board)).toEqual(8);
    });
  });

  describe('#points', function() {
    it('returns the current points', function() {
      game.current_points = 5;
      expect(game.points()).toEqual(5);
    });
  });
});
