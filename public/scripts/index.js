(() => {
  const bgColor = ["silver", "white"];

  const resetColors = () => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        let soldier = document.getElementById(`${row}_${col}`);
        soldier.style.background = bgColor[(row + col) % 2];
      }
    }
  };

  const generateBoard = function(symbols) {
    const gameBoard = document.getElementById("gameBoard");
    symbols.forEach((row, rowIndex) => {
      const pankti = document.createElement("tr");
      gameBoard.appendChild(pankti);
      row.forEach((element, colIndex) => {
        const soldier = document.createElement("td");
        soldier.innerHTML = soldiers[element[0]];
        soldier.id = `${rowIndex}_${colIndex}`;
        soldier.className = "gamePiece";
        soldier.style.background = bgColor[(rowIndex + colIndex) % 2];
        pankti.appendChild(soldier);
      });
    });
  };

  const formatBoard = function(symbols) {
    symbols.forEach((row, rowIndex) => {
      row.forEach((element, colIndex) => {
        let soldier = document.getElementById(`${rowIndex}_${colIndex}`);
        soldier.innerHTML = soldiers[element[0]];
      });
    });
  };

  const createBoard = () => {
    fetch("/getGame")
      .then(res => res.json())
      .then(({ board, martyrs }) => {
        generateBoard(board);
      });
  };

  const insertMartyrs = function(martyrs) {
    Object.keys(martyrs).forEach(army => {
      const grave = document.getElementById(`${army}Martyrs`);
      grave.innerHTML = "";
      martyrs[army].forEach(symbol => {
        grave.innerHTML += soldiers[symbol[0]];
      });
    });
  };

  const getGame = () => {
    fetch("/getGame")
      .then(res => res.json())
      .then(({ board, martyrs }) => {
        formatBoard(board);
        insertMartyrs(martyrs);
      });
  };

  const polling = () => {
    setInterval(getGame, 1000);
  };

  const selectPlayer = function(event) {
    const gamePiece = event.target;

    const [row, col] = gamePiece.id.split("_");
    fetch("/select", {
      method: "POST",
      body: JSON.stringify({ row, col }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(({ moves, isSuccessfull }) => {
        if (!isSuccessfull) return;
        moves.forEach(move => {
          let piece = document.getElementById(`${move.X}_${move.Y}`);
          piece.style.background = "rgb(127, 243, 175)";
        });
        switchListener();
      });
  };

  const makeMove = event => {
    const gamePiece = event.target;
    const [row, col] = gamePiece.id.split("_");
    fetch("/makeMove", {
      method: "POST",
      body: JSON.stringify({ row, col }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(({ isSuccessfull, msg }) => {
        if (isSuccessfull) switchListener();
        resetColors();
      });
  };

  const func = [selectPlayer, makeMove];
  let currIndex = 0;

  const switchListener = () => {
    const board = document.getElementById("gameBoard");
    board.onclick = () => {
      currIndex = 1 - currIndex;
      func[currIndex](event);
    };
  };

  window.onload = () => {
    createBoard();
    polling();
    const { playerName } = parseCookie();
    const playerNameDiv = document.getElementById("playerName");
    playerNameDiv.innerText = `Hi ${playerName}`;
    const board = document.getElementById("gameBoard");
    board.onclick = () => {
      selectPlayer(event);
    };
  };
})();
