document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("container");
    const reservoir = document.getElementById("reservoir");
    const scoreDisplay = document.getElementById("score");
    const gameOverDisplay = document.getElementById("gameOver");

    let score = 0;
    let reservoirLevel = 600; // Initial reservoir level
    let circleCount = 0; // Track the number of circles on the screen
    let reservoirInterval; // Variable to hold the reservoir interval
    let spawnInterval; // Variable to hold the circle spawning interval
    let depletionSpeed = 1; // Adjusted depletion speed
    let depletionMultiplier = 5; // Adjusted depletion multiplier
    let gameEnded = false; // Track if the game has ended

    container.addEventListener("click", function(event) {
        if (!gameEnded && event.target.classList.contains("circle")) {
            event.target.remove();
            score++;
            scoreDisplay.textContent = "Score: " + score;
            if (score >= 10) { // Check if the player has reached a score of 10 to win
                gameOver(true);
            }
            circleCount--;
            if (circleCount === 0) {
                clearInterval(reservoirInterval); // Pause reservoir depletion if no circles are present
            }
            // Adjust the depletion speed when a circle is removed
            depletionSpeed = Math.max(1, circleCount);
        }
    });

    function spawnCircle() {
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
        if (circleCount === 1) {
            reservoirInterval = setInterval(updateReservoir, 1000); // Start reservoir depletion if a circle is present
        }
        // Adjust the depletion speed when a circle is added
        depletionSpeed = Math.max(1, circleCount);
    }

    spawnInterval = setInterval(spawnCircle, 3000); // Spawn a circle every 3 seconds

    function updateReservoir() {
        reservoirLevel -= depletionSpeed * depletionMultiplier; // Adjusted depletion rate
        reservoir.style.height = reservoirLevel + "px";
        if (reservoirLevel <= 0) {
            gameOver(false); // Game over if reservoir is empty
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
