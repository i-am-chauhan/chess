const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fs = require("fs");
const {
  hostGame,
  selectPiece,
  makeMove,
  getGame,
  joinGame,
  hasStarted
} = require("./controller");

const createGameId = function() {
  const gameId = new Date();
  return gameId.getTime() % 10000;
};

app.games = {};
app.createGameId = createGameId;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use((req,res,next) => {
//     if(req.url) res.render("homepage.html")
//     next()
// })

app.use((req, res, next) => {
  console.log(req.url);
  console.log(req.cookies);
  console.log(req.body);
  next();
});

app.use((req, res, next) => {
  const { gameId, playerName } = req.cookies;
  if (gameId && res.app.games[gameId]) {
    res.app.game = res.app.games[gameId];
    res.app.playerName = playerName
  }
  next();
});

app.get("/", (req, res) => {
  res.redirect("homePage.html");
});

app.use(express.static("public"));
app.get("/getGame", getGame);
app.get("/hasStarted", hasStarted);

app.post("/hostGame", hostGame);
app.post("/joinGame", joinGame);

app.post("/select", selectPiece);
app.post("/makeMove", makeMove);
module.exports = { app };
