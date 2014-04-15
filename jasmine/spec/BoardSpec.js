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
        board.set_random_empty_tile();
        expect(board.contains(2) || board.contains(4)).toEqual(true);
      });
    });

    describe('when the board does not contain a specified integer', function() {
      it('returns false', function() {
        expect(board.contains(3)).toEqual(false);
      });
    });
  });

  describe('#find_empty_nodes', function() {
    it('should return an array with the index of each empty node', function() {
      expect(board.find_empty_nodes().length).toEqual(25);
    });
  });

  describe('#has_empty_tile', function() {
    describe('when there is an empty tile', function() {
      it('returns true', function() {
        board.board = [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]
        ];

        expect(board.has_empty_tile()).toEqual(true);
      });
    });

    describe('when there is not an empty tile', function() {
      it('return false', function() {
        board.board = [
          [2, 2, 2, 2, 2],
          [2, 2, 2, 2, 2],
          [2, 2, 2, 2, 2],
          [2, 2, 2, 2, 2],
          [2, 2, 2, 2, 2]
        ];

        expect(board.has_empty_tile()).toEqual(false);
      });
    });
  })

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
      board.set_random_empty_tile();
      expect(board.contains(2) || board.contains(4)).toEqual(true);
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

  describe('#collapse_right', function() {
    it('pushes all tiles to the right', function() {
      board.board = [
        [0, 0, 0, 0, 2],
        [2, 2, 0, 0, 0],
        [2, 0, 2, 0, 0],
        [2, 0, 0, 2, 0],
        [2, 0, 0, 0, 2]
      ];

      var after = [
        [0, 0, 0, 0, 2],
        [0, 0, 0, 2, 2],
        [0, 0, 0, 2, 2],
        [0, 0, 0, 2, 2],
        [0, 0, 0, 2, 2]
      ];

      board.collapse_right();
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

      board.fold_left();
      expect(board.board).toEqual(after);
    });
  });

  describe('#fold_right', function() {
    it('merges all tiles one space to the right', function() {
      board.board = [
        [2, 2, 2, 0, 0],
        [2, 4, 0, 4, 0],
        [0, 8, 8, 0, 0],
        [0, 0, 4, 4, 0],
        [0, 0, 0, 0, 8]
      ];

      var after = [
        [2, 0,  4, 0, 0],
        [2, 4,  0, 4, 0],
        [0, 0, 16, 0, 0],
        [0, 0,  0, 8, 0],
        [0, 0,  0, 0, 8]
      ];

      board.fold_right();
      expect(board.board).toEqual(after);
    });
  });

  describe('#rotate_ccw', function() {
    it('rotates the board ccw', function() {
      board.board = [
        [2, 2, 2, 0, 0],
        [2, 4, 0, 4, 0],
        [0, 8, 8, 0, 0],
        [0, 0, 4, 4, 0],
        [0, 0, 0, 0, 8]
      ];

      var after = [
        [0, 0, 0, 0, 8],
        [0, 4, 0, 4, 0],
        [2, 0, 8, 4, 0],
        [2, 4, 8, 0, 0],
        [2, 2, 0, 0, 0]
      ];

      board.rotate_ccw();
      expect(board.board).toEqual(after);
    });
  });

  describe('#rotate_cw', function() {
    it('rotates the board cw', function() {
      board.board = [
        [2, 2, 2, 0, 0],
        [2, 4, 0, 4, 0],
        [0, 8, 8, 0, 0],
        [0, 0, 4, 4, 0],
        [0, 0, 0, 0, 8]
      ];

      var after = [
        [0, 0, 0, 2, 2],
        [0, 0, 8, 4, 2],
        [0, 4, 8, 0, 2],
        [0, 4, 0, 4, 0],
        [8, 0, 0, 0, 0]
      ];

      board.rotate_cw();
      expect(board.board).toEqual(after);
    });
  });

  describe('when there is a possible move', function() {
    it('returns true', function() {
      board.board = [
        [2, 2, 0, 0, 0],
        [2, 2, 0, 0, 0],
        [2, 2, 0, 0, 0],
        [2, 2, 0, 0, 0],
        [2, 2, 0, 0, 0]
      ];

      expect(board.has_possible_move()).toEqual(true);
    });
  });

  describe('when there is not a possible move', function() {
    it('returns false', function() {
      board.board = [
        [2, 4, 2, 4, 2],
        [4, 2, 4, 2, 4],
        [2, 4, 2, 4, 2],
        [4, 2, 4, 2, 4],
        [2, 4, 2, 4, 2]
      ];

      expect(board.has_possible_move()).toEqual(false);
    });
  });
});
