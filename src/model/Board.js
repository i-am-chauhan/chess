class Board {
  constructor(board) {
    this.board = board;
  }

  getSoldierOnPosition(position) {
    return this.board[position.getX()][position.getY()];
  }

  getBoard() {
    return this.board.map(row => row.slice());
  }

  moveSoldierFromTo(from, to) {
    this.board[to.getX()][to.getY()] = this.board[from.getX()][from.getY()];
  }

  vacatePosition(position){
    this.board[position.getX()][position.getY()] = " ";
  }
}

const createBoard = function() {
  return new Array(8).fill([]).map(() => new Array(8).fill(" "));
};

const createInitialBoard = function() {
  const board = createBoard();
  board[0] = ["r1", "h1", "b1", "q", "k", "b2", "h2", "r2"];
  board[1] = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"];
  board[6] = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8"];
  board[7] = ["R1", "H1", "B1", "Q", "K", "B2", "H2", "R2"];
  return new Board(board);
};

module.exports = { createInitialBoard };
