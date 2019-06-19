const generateHostPage = () => {
    const container = document.getElementById('button-container');
    container.innerHTML = "";
}

window.onload = () => {
    const hostGame = document.getElementById('host');
    hostGame.onclick = generateHostPage
}