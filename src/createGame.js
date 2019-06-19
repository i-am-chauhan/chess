const { King } = require("./model/king");
const { Queen } = require("./model/queen");
const { Knight } = require("./model/knight");
const { Bishop } = require("./model/bishop");
const { Rook } = require("./model/rook");
const { Pawn } = require("./model/pawn");
const { Position } = require("./model/position");
const { Game } = require("./model/game");
const { Army } = require("./model/Army");
const Board = require("./model/Board");

const whiteArmyInfo = function() {
	return {
		K: { type: King, postion: new Position(7, 4) },
		Q: { type: Queen, postion: new Position(7, 3) },
		H1: { type: Knight, postion: new Position(7, 1) },
		H2: { type: Knight, postion: new Position(7, 6) },
		B1: { type: Bishop, postion: new Position(7, 2) },
		B2: { type: Bishop, postion: new Position(7, 5) },
		R1: { type: Rook, postion: new Position(7, 0) },
		R2: { type: Rook, postion: new Position(7, 7) },
		P1: { type: Pawn, postion: new Position(6, 0) },
		P2: { type: Pawn, postion: new Position(6, 1) },
		P3: { type: Pawn, postion: new Position(6, 2) },
		P4: { type: Pawn, postion: new Position(6, 3) },
		P5: { type: Pawn, postion: new Position(6, 4) },
		P6: { type: Pawn, postion: new Position(6, 5) },
		P7: { type: Pawn, postion: new Position(6, 6) },
		P8: { type: Pawn, postion: new Position(6, 7) }
	};
};

const blackArmyInfo = function() {
	return {
		k: { type: King, postion: new Position(0, 4) },
		q: { type: Queen, postion: new Position(0, 3) },
		h1: { type: Knight, postion: new Position(0, 1) },
		h2: { type: Knight, postion: new Position(0, 6) },
		b1: { type: Bishop, postion: new Position(0, 2) },
		b2: { type: Bishop, postion: new Position(0, 5) },
		r1: { type: Rook, postion: new Position(0, 0) },
		r2: { type: Rook, postion: new Position(0, 7) },
		p1: { type: Pawn, postion: new Position(1, 0) },
		p2: { type: Pawn, postion: new Position(1, 1) },
		p3: { type: Pawn, postion: new Position(1, 2) },
		p4: { type: Pawn, postion: new Position(1, 3) },
		p5: { type: Pawn, postion: new Position(1, 4) },
		p6: { type: Pawn, postion: new Position(1, 5) },
		p7: { type: Pawn, postion: new Position(1, 6) },
		p8: { type: Pawn, postion: new Position(1, 7) }
	};
};

const getSoldiers = function(allSoldierInfos, nameOfTeam) {
	const armyInfo = {};
	const soldiers = Object.keys(allSoldierInfos);
	soldiers.forEach((soldier) => {
		const Cadet = allSoldierInfos[soldier].type;
		const postion = allSoldierInfos[soldier].postion;
		armyInfo[soldier] = new Cadet(postion, soldiers, nameOfTeam);
	});
	return armyInfo;
};

const createGame = function(firstPlayer, secondPlayer) {
	const board = Board.createInitialBoard();
	const whiteArmySoldierInfos = whiteArmyInfo();
	const blackArmySoldierInfos = blackArmyInfo();
	const whiteArmySoldiers = getSoldiers(whiteArmySoldierInfos, "white");
	const blackArmySoldiers = getSoldiers(blackArmySoldierInfos, "black");
	const whiteArmy = new Army(whiteArmySoldiers, "white", firstPlayer);
	const blackArmy = new Army(blackArmySoldiers, "black", secondPlayer);
	return new Game(whiteArmy, blackArmy, board);
};

module.exports = { createGame };
