class Position {
	constructor(x, y) {
		this.X = x;
		this.Y = y;
	}

	getX() {
		return this.X;
	}

	getY() {
		return this.Y;
	}

	changeXBy(count) {
		this.X += count;
	}

	changeYBy(count) {
		this.Y += count;
	}
}

module.exports = { Position };
