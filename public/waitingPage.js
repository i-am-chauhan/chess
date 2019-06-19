const gameStarted = function() {
  fetch("/hasStarted")
    .then(res => res.json())
    .then(({ hasStarted }) => {
      if (hasStarted) document.location.href = "/chess.html";
    });
};

window.onload = () => {
  setInterval(gameStarted, 1000);
  const { gameId } = parseCookie();
  document.getElementById("gameId").innerText = gameId;
};
