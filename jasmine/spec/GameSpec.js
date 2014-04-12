describe('Game', function() {
  var game;

  beforeEach(function() {
    game = new Game();
  });

  it('has a board', function() {
    expect(game.get_board() instanceof Board).toEqual(true);
  });
});
