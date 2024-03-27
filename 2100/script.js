document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("container");
    const reservoir = document.getElementById("reservoir");
    const scoreDisplay = document.getElementById("score");
    const gameOverDisplay = document.getElementById("gameOver");

    let score = 0;
    let reservoirLevel = 0; // Initial reservoir level (empty)
    let circleCount = 0; // Track the number of circles on the screen
    let reservoirInterval; // Variable to hold the reservoir interval
    let spawnInterval; // Variable to hold the circle spawning interval
    let depletionSpeed = 1; // Adjusted depletion speed
    let depletionMultiplier = 0.5; // Adjusted depletion multiplier
    let gameStarted = false; // Track if the game has started
    let gameEnded = false; // Track if the game has ended

    function startGame() {
        gameStarted = true;
        gameOverDisplay.textContent = "Vous avez été surpris, n'est-ce pas ? Pourquoi aucune goutte d’eau n’est-elle encore apparue ? Je suis désolé de vous annoncer qu'en raison du gaspillage de l'eau par les humains ces dernières années, il n'y aura plus d'eau à gaspiller après l'an 2100. (pour plus d'information clicker sure ne me touche pas)";
        gameOverDisplay.style.display = "block";
        clearInterval(spawnInterval); // Stop spawning circles
    }

    function spawnCircle() {
        if (!gameStarted || gameEnded) return; // Don't spawn circles if the game hasn't started or has ended
        const circle = document.createElement("img");
        circle.classList.add("circle");
        circle.src = "water.PNG";

        const size = 30;
        const x = Math.random() * (container.offsetWidth - size);
        const y = Math.random() * (container.offsetHeight - size);

        circle.style.left = x + "px";
        circle.style.top = y + "px";

        container.appendChild(circle);
        circleCount++;
    }

    spawnInterval = setInterval(spawnCircle, 3000); // Spawn a circle every 3 seconds

    setTimeout(startGame, 10000); // Start the game after 10 seconds

    function updateReservoir() {
        if (!gameStarted) return; // Don't update reservoir if the game hasn't started
        reservoirLevel -= depletionSpeed * depletionMultiplier; // Adjusted depletion rate
        reservoir.style.height = reservoirLevel + "px";
        if (reservoirLevel <= 0) {
            gameOver(true); // Game over if reservoir is empty
        }
    }

    function gameOver(win) {
        clearInterval(reservoirInterval);
        clearInterval(spawnInterval); // Stop spawning circles when the game is won or lost
        gameEnded = true;
        if (win) {
            gameOverDisplay.textContent = "Vous avez économisé de l'eau ! Bien joué!!";
        } else {
            gameOverDisplay.textContent = "Fin de partie ! Eau gaspillée !";
        }
        gameOverDisplay.style.display = "block";
    }
});
