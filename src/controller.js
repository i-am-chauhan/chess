const { createGame } = require("./createGame");
const { Position } = require("./model/position");

const hostGame = function(req, res) {
  const { playerName } = req.body;
  const gameId = res.app.createGameId();
  const game = createGame(playerName, null);
  res.app.games[gameId] = game;
  res.cookie("gameId", gameId);
  res.cookie("playerName", playerName);
  res.redirect("/waitingPage.html");
};

const joinGame = function(req, res) {
  const { playerName, gameId } = req.body;
  const game = res.app.games[gameId];
  if (!game) res.send("<h1>Game Not Found</h1>");
  game.acceptEnemy(playerName);
  res.cookie("gameId", gameId);
  res.cookie("playerName", playerName);
  res.redirect("/waitingPage.html");
};

const selectPiece = (req, res) => {
  const game = res.app.game;
  const playerName = res.app.playerName;
  if (!game.isCurrentPlayer(playerName)) {
    res.json({ isSuccessfull: false });
    return;
  }
  const { row, col } = req.body;
  const soldierPosition = new Position(+row, +col);
  game.setCurrentSoldier(soldierPosition);
  res.json({ isSuccessfull: true, moves: game.getCurrSoldierMoves() });
};

const makeMove = (req, res) => {
  const game = res.app.game;
  const playerName = res.app.playerName;
  if (!game.isCurrentPlayer(playerName)) {
    res.json({ isSuccessfull: false });
    return;
  }
  const { row, col } = req.body;
  const position = new Position(+row, +col);
  const isMoveValid = game.isMoveValid(position);

  if (isMoveValid) game.placeMove(position);
  res.json({ isSuccessfull: isMoveValid });
};

const getGame = (req, res) => {
  const game = res.app.game;
  const playerName = res.app.playerName;
  const martyrs = game.getMartyrs(playerName);
  const board = game.getBoard();
  const turnMsg = `${game.getCurrPlayerName()}'s turn`;

  res.json({ board, martyrs, turnMsg });
};

const hasStarted = (req, res) => {
  res.json({ hasStarted: res.app.game.battleStarted });
};

module.exports = {
  hostGame,
  joinGame,
  selectPiece,
  makeMove,
  getGame,
  hasStarted
};
