const { ActivityLog } = require("./ActivityLog");

class Game extends ActivityLog {
  constructor(firstArmy, secondArmy, board) {
    super();
    this.firstArmy = firstArmy;
    this.secondArmy = secondArmy;
    this.board = board;
    this.armies = [this.firstArmy, this.secondArmy];
    this.currentIndex = 0;
    this.currentArmy = this.armies[this.currentIndex];
    this.kings = ["K", "k"];
    this.currSoldier = "";
    this.battleStarted = false;
  }

  getCurrPlayerName(){
	  return this.currentArmy.rulerName;
  }

  isCurrentPlayer(playerName) {
    return this.currentArmy.rulerName == playerName;
  }

  getMartyrs() {
    const martyrs = {};
    this.armies.forEach(
      army => (martyrs[army.name] = Object.keys(army.deadSoldiers))
    );
    return martyrs;
  }

  acceptEnemy(playerName) {
    this.secondArmy.setRulerName(playerName);
    this.battleStarted = true;
  }

  toggleCurrArmy() {
    this.currentIndex = 1 - this.currentIndex;
    this.currentArmy = this.armies[this.currentIndex];
  }

  getSoldierOnPosition(position) {
    return this.board.getSoldierOnPosition(position);
  }

  setCurrentSoldier(position) {
    this.currSoldier = this.getSoldierOnPosition(position);
  }

  getBoard() {
    return this.board.getBoard();
  }

  getCurrSoldierMoves() {
    return this.currentArmy.soldiers[this.currSoldier].allValidPossibleMoves(
      this.getBoard()
    );
  }

  getCurrSoldierPosition() {
    return this.currentArmy.soldiers[this.currSoldier].getPosition();
  }

  getEnemyKing() {
    return this.armies[1 - this.currentIndex].soldiers[
      this.kings[1 - this.currentIndex]
    ];
  }

  isCheck() {
    const allPossibleMoves = this.getCurrSoldierMoves();
    return allPossibleMoves.some(position => {
      return (
        this.getSoldierOnPosition(position) == this.kings[1 - this.currentIndex]
      );
    });
  }

  isMoveAtPosition(position, move) {
    return move.X == position.X && move.Y == position.Y;
  }

  isSoldierCanGoTo(soldiers, position, soldier) {
    const board = this.getBoard.slice();
    const currSoldierPosition = this.getCurrSoldierPosition();
    board[currSoldierPosition.X][currSoldierPosition.Y] = " ";
    return soldiers[soldier]
      .allValidPossibleMoves(board)
      .some(this.isMoveAtPosition.bind(null, position));
  }

  isPlaceSafe(position) {
    const currSoldiers = this.currentArmy.soldiers;
    return !Object.keys(currSoldiers).some(
      this.isSoldierCanGoTo.bind(this, currSoldiers, position)
    );
  }

  isEnemyKingHasASafeMove() {
    const enemyKing = this.getEnemyKing();
    return enemyKing
      .allValidPossibleMoves(this.getBoard())
      .some(this.isPlaceSafe, this);
  }

  getEnemyKingSoldiers(allSoldiers) {
    return Object.keys(allSoldiers).filter(
      soldier => !this.kings.includes(soldier)
    );
  }

  getCheckMoveDirectionMoves() {
    const moves = this.currentArmy.soldiers[
      this.currSoldier
    ].validMovesByDirection(this.getBoard());
    const enemyKing = this.getEnemyKing();
    return Object.keys(moves).filter(direction => {
      return moves[direction].some(
        this.isMoveAtPosition.bind(null, enemyKing.getPosition())
      );
    });
  }

  isKingCanBeRescuedFrom() {
    const allRescuableMoves = this.getCheckMoveDirectionMoves().concat(
      this.getCurrSoldierPosition()
    );
    const enemyArmySoldiers = this.armies[1 - this.currentIndex].soldiers;
    const rescueSoldiers = this.getEnemyKingSoldiers(enemyArmySoldiers);
    return rescueSoldiers.some(soldier => {
      let soldierMoves = enemyArmySoldiers[soldier].allValidPossibleMoves(
        this.getBoard()
      );
      return soldierMoves.some(move => {
        return allRescuableMoves.some(this.isMoveAtPosition.bind(null, move));
      });
    });
  }

  isNotCheckAndMate() {
    return this.isEnemyKingHasASafeMove() || this.isKingCanBeRescuedFrom();
  }

  isSoldierValid() {
    return Object.keys(this.currentArmy.soldiers).includes(this.currSoldier);
  }

  isMoveValid(move) {
    return this.getCurrSoldierMoves().some(
      this.isMoveAtPosition.bind(null, move)
    );
  }

  placeMove(move) {
    const currSoldierPosition = this.getCurrSoldierPosition();
    const targetSymbol = this.getSoldierOnPosition(move);
    const enemyArmy = this.armies[1 - this.currentIndex];
    const targetSoldier = enemyArmy.soldiers[targetSymbol];
    if (targetSoldier) {
      enemyArmy.killSoldier(targetSymbol);
      enemyArmy.addDeadSoldier(targetSymbol);
      // enemyArmy.removeSoldier(targetSymbol);
    }
    this.currentArmy.soldiers[this.currSoldier].setPosition(move.X, move.Y);
    this.board.moveSoldierFromTo(currSoldierPosition, move);
    this.board.vacatePosition(currSoldierPosition);
    this.toggleCurrArmy();
  }
}

module.exports = { Game };
