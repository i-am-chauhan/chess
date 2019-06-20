const { characters } = require("./constant.js");

class ActivityLog {
  constructor() {
    this.logs = [];
  }

  madeMove(playerName, soldierName) {
    this.logs.push(`${playerName} moved ${characters[soldierName[0]]}`);
  }

  selectSoldier(playerName, soldierName) {
    this.logs.push(`${playerName} selected ${characters[soldierName[0]]}`);
  }
}

module.exports = { ActivityLog };
