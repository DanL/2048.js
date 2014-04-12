describe('Board', function() {
  var board;

  beforeEach(function() {
    board = new Board();
  });

  describe('#get_board', function() {
    function count_tiles(board) {
      var tiles = 0;
      for(var y = 0; y < board.length; y++) {
        tiles += board[y].length;
      }

      return tiles;
    }

    it('should have 5 rows', function() {
      expect(board.get_board().length).toEqual(5);
    });

    it('should have 25 tiles', function() {
      expect(count_tiles(board.get_board())).toEqual(25);
    });
  });

  describe('#contains', function() {
    describe('when the board contains a specified integer', function() {
      it('returns true', function() {
        board.set_random_empty_tile(2);
        expect(board.contains(2)).toEqual(true);
      });
    });

    describe('when the board does not contain a specified integer', function() {
      it('returns false', function() {
        expect(board.contains(2)).toEqual(false);
      });
    });
  });

  describe('#find_empty_nodes', function() {
    it('should return an array with the index of each empty node', function() {
      expect(board.find_empty_nodes().length).toEqual(25);
    });
  });

  describe('#select_random_empty_tile', function() {
    it('should return a random empty tile', function() {
      expect(board.select_random_empty_tile()).toBeGreaterThan(0);
    });
  });

  describe('#get_tile_coords', function() {
    it('returns the x and y coordinates of the first tile', function() {
      expect(board.get_tile_coords(0)).toEqual({ x: 0, y: 0 });
    });

    it('returns the x and y coordinates of the last tile', function() {
      expect(board.get_tile_coords(24)).toEqual({ x: 4, y: 4 });
    });
  });

  describe('#set_random_empty_tile', function() {
    it('sets a random tile to the specified integer', function() {
      board.set_random_empty_tile(2);
      expect(_.chain(board).flatten().contains(2).value()).toEqual(true);
    });
  });

  describe('#collapse_left', function() {
    it('pushes all tiles to the left', function() {
      board.board = [
        [0, 0, 0, 0, 2],
        [2, 2, 0, 0, 0],
        [2, 0, 2, 0, 0],
        [2, 0, 0, 2, 0],
        [2, 0, 0, 0, 2]
      ];

      var after = [
        [2, 0, 0, 0, 0],
        [2, 2, 0, 0, 0],
        [2, 2, 0, 0, 0],
        [2, 2, 0, 0, 0],
        [2, 2, 0, 0, 0]
      ];

      board.collapse_left();
      expect(board.board).toEqual(after);
    });
  });

  describe('#fold_left', function() {
    it('merges all tiles one space to the left', function() {
      board.board = [
        [2, 2, 2, 0, 0],
        [2, 4, 0, 4, 0],
        [0, 8, 8, 0, 0],
        [0, 0, 4, 4, 0],
        [0, 0, 0, 0, 8]
      ];

      var after = [
        [4,  0, 2, 0, 0],
        [2,  4, 0, 4, 0],
        [0, 16, 0, 0, 0],
        [0,  0, 8, 0, 0],
        [0,  0, 0, 0, 8]
      ];

      board.fold();
      expect(board.board).toEqual(after);
    });
  });

  describe('#merge_left', function() {
    beforeEach(function() {
      spyOn(board, 'collapse_left').andCallThrough();
      spyOn(board, 'fold_left').andCallThrough();
    });

    it('collapses, folds, and collapses again', function() {
      expect(board.collapse_left).toHaveBeenCalled();
      expect(board.fold).toHaveBeenCalled();

      // Not sure how to assert that this gets called again.
      // expect(board.collapse_left).toHaveBeenCalled();
    });
  });
});
