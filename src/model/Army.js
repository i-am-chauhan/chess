class Army {
	constructor(soldiers, name, rulerName) {
		this.soldiers = soldiers;
		this.name = name;
		this.rulerName = rulerName;
		this.deadSoldiers = {};
	}

	setRulerName(name){
		this.rulerName = name;
	}

	removeSoldier(symbol) {
		delete this.soldiers[symbol];
	}

	addDeadSoldier(symbol) {
		this.deadSoldiers[symbol] = this.soldiers[symbol];
		this.removeSoldier(symbol)
	}

	killSoldier(symbol) {
		this.removeSoldier(symbol);
		this.addDeadSoldier(symbol);
	}
}

module.exports = { Army };
