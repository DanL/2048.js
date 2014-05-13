describe('Board', function() {
  var board;

  beforeEach(function() {
    board = new Board(5);
  });

  describe('#get_board', function() {
    it('should have 5 rows', function() {
      expect(board.get_board().length).toEqual(5);
    });

    it('should have 25 tiles', function() {
      expect(_(board.get_board()).flatten().length).toEqual(25);
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

    it('returns the random integer', function() {
      var tile = board.set_random_empty_tile();
      expect(tile === 2 || tile === 4).toEqual(true);
    });
  });

  describe('#collapse', function() {
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

      board.collapse();
      expect(board.board).toEqual(after);
    });
  });

  describe('#fold', function() {
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

  describe('#has_possible_move', function() {
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

  describe('#can_move_left', function() {
    describe('when a cell can move left', function() {
      it('returns true', function() {
        board.board = [[2, 2, 0, 0, 0]];
        expect(board.can_move_left(1, 0)).toEqual(true);
      });
    });

    describe('when a cell cannot move left', function() {
      it('returns false', function() {
        board.board = [[2, 0, 0, 0, 0]];
        expect(board.can_move_left(1, 0)).toEqual(false);
      });
    });
  });

  describe('#can_move_right', function() {
    describe('when a cell can move right', function() {
      it('returns true', function() {
        board.board = [[0, 0, 0, 2, 2]];
        expect(board.can_move_right(3, 0)).toEqual(true);
      });
    });

    describe('when a cell cannot move right', function() {
      it('returns false', function() {
        board.board = [[0, 0, 0, 0, 2]];
        expect(board.can_move_right(3, 0)).toEqual(false);
      });
    });
  });

  describe('#can_move_up', function() {
    describe('when a cell can move up', function() {
      it('returns true', function() {
        board.board = [
          [0, 0, 0, 0, 0],
          [2, 0, 0, 0, 0]
        ];
        expect(board.can_move_up(0, 1)).toEqual(true);
      });
    });

    describe('when a cell cannot move up', function() {
      it('returns false', function() {
        board.board = [
          [2, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]
        ];
        expect(board.can_move_up(0, 1)).toEqual(false);
      });
    });
  });

  describe('#can_move_down', function() {
    describe('when a cell can move down', function() {
      it('returns true', function() {
        board.board = [
          [2, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]
        ];
        expect(board.can_move_down(0, 0)).toEqual(true);
      });
    });

    describe('when a cell cannot move down', function() {
      it('returns false', function() {
        board.board = [
          [0, 0, 0, 0, 0],
          [2, 0, 0, 0, 0]
        ];
        expect(board.can_move_down(0, 0)).toEqual(false);
      });
    });
  });
});
