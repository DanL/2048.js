describe('Game', function() {
  var game;

  beforeEach(function() {
    game = new Game();
  });

  describe('the board', function() {
    function count_tiles(board) {
      var tiles = 0;
      for(var y = 0; y < board.length; y++) {
        tiles += board[y].length;
      }

      return tiles;
    }

    it('should have 5 rows', function() {
      expect(game.get_board().length).toEqual(5);
    });

    it('should have 25 tiles', function() {
      expect(count_tiles(game.get_board())).toEqual(25);
    });
  });

  describe('#find_empty_nodes', function() {
    it('should return an array with 3 integers', function() {
      expect(game.find_empty_nodes().length).toEqual(25);
    });
  });

  describe('#select_random_tile', function() {
    it('should return a random empty tile', function() {
      expect(game.select_random_empty_tile()).toBeGreaterThan(0);
    });
  });

  describe('#get_tile', function() {
    it('returns the x and y coordinates of the first tile', function() {
      expect(game.get_tile_coords(0)).toEqual({ x: 0, y: 0 });
    });

    it('returns the x and y coordinates of the last tile', function() {
      expect(game.get_tile_coords(24)).toEqual({ x: 4, y: 4 });
    });
  });

  describe('#set_random_tile', function() {
    it('sets a random tile to the specified integer', function() {
      game.set_random_tile(2);
      expect(_.chain(game).flatten().contains(2).value()).toEqual(true);
    });
  });
});
