"use strict";

// GAME FUNCTION DEFINITION:

function game() {
    var boardFields = document.querySelectorAll("#board div"),
        difficultyLevel = 300,
        score = 0,
        furryInfiniteMove = setInterval(furryMovement, difficultyLevel),
        coin = new Coin(boardFields),
        furry = new Furry();
    
    // FURRY DIRECTION FUNCTION DEFINITION:

    function furryDirection() {
        var pressedButton = event.which;
        switch (pressedButton) {
            case 37:
                furry.directionArray = [-1,0];
            break;
            case 38:
                furry.directionArray = [0,-1];
            break;
            case 39:
                furry.directionArray = [1,0];
            break;
            case 40:
                furry.directionArray = [0,1];
            break;
        }
    }

    // FURRY MOVEMENT FUNCTION DEFINITION:
  
    function furryMovement() {
        for (var i = 0; i < boardFields.length; i++) {
            if (boardFields[i].classList.contains("furry")) {
                boardFields[i].classList.remove("furry");
            }
        }

        furry.x = furry.x + furry.directionArray[0];
        furry.y = furry.y + furry.directionArray[1];

        if (furry.x < 0 || furry.x > 9 || furry.y < 0 || furry.y > 9) {
            document.querySelector(".overlay.gameover").classList.add("visible");
            document.querySelector("#board").classList.add("gameover-border");    

            for (var i = 0; i < boardFields.length; i++) {
                boardFields[i].classList.add("gameover-border");         
            }

            boardFields[coin.position].classList.remove("coin");
            clearInterval(furryInfiniteMove);
            document.removeEventListener("keydown", furryDirection);

        } else {
            var furryPosition = indexPosition(furry.x, furry.y);

            if (furryPosition === coin.position) {
                boardFields[furryPosition].classList.add("furry");   
                score = score + 1;

                document.querySelector("#current-score").innerHTML = score;
                document.querySelector("#final-score").innerHTML = score;

                if (score === 10) {
                    document.querySelector(".overlay.win").classList.add("visible");
                    document.querySelector("#board").classList.add("win-border");

                    for (var i = 0; i < boardFields.length; i++) {
                        boardFields[i].classList.add("win-border");
                        boardFields[i].classList.remove("coin", "furry"); 
                    }
          
                    clearInterval(furryInfiniteMove);
                    document.removeEventListener("keydown", furryDirection);

                } else {
                    clearInterval(furryInfiniteMove);
                    difficultyLevel = 0.8 * difficultyLevel;
                    furryInfiniteMove = setInterval(furryMovement, difficultyLevel);
                    coin = new Coin(boardFields);
                }
            } else {
                boardFields[furryPosition].classList.add("furry");
            }
        }
    }
    
    document.addEventListener("keydown", furryDirection);
}

// INDEX POSITION FUNCTION DEFINITION:

function indexPosition(x, y) {
    return x + y * 10;
}

// FURRY OBJECT DEFINITION:

var Furry = function() {
    this.x = 0;
    this.y = 0;
    this.directionArray = [0,1];
}

// COIN OBJECT DEFINITION:

var Coin = function(boardFields) {
    var x = Math.floor(Math.random() * 10),
        y = Math.floor(Math.random() * 10);

    this.position = indexPosition(x, y);

    for (var i = 0; i < boardFields.length; i++) {
        if(boardFields[i].classList.contains("coin")) {
            boardFields[i].classList.remove("coin");
        }
    }

    boardFields[this.position].classList.add("coin");
}

// DOM CONTENT LOADED EVENT LISTENER:

document.addEventListener("DOMContentLoaded", function() {

    var startButton = document.querySelector("#start-button"),
        tryAgainButton = document.querySelector("#try-again-button"),
        playAgainButton = document.querySelector("#play-again-button"),
        currentScore = document.querySelector("#current-score"),
        finalScore = document.querySelector("#final-score"),
        boardFields = document.querySelectorAll("#board div"),
        boardContainer = document.querySelector("#board");

    // START BUTTON EVENT LISTENER:

    startButton.addEventListener("click", function() {
        this.parentElement.parentElement.classList.remove("visible");
        game();
    })

    // TRY AGAIN BUTTON LISTENER:

    tryAgainButton.addEventListener("click", function () {
        repeatButton(this, "gameover-border");
    })

    // PLAY AGAIN BUTTON LISTENER:

    playAgainButton.addEventListener("click", function () {
        repeatButton(this, "win-border");
    })

    // REPEAT BUTTON FUNCTION DEFINITION:
    
    function repeatButton (self, borderClass) {
        self.parentElement.parentElement.classList.remove("visible");

        for (var i = 0; i < boardFields.length; i++) {
            boardFields[i].classList.remove(borderClass);         
        };
        boardContainer.classList.remove(borderClass)
        currentScore.innerHTML = "0";
        finalScore.innerHTML = "0";
        game();
    }
})