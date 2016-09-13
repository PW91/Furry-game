// DEFINICJA FUNKCJI GAME:

function game() {
    var board = document.querySelectorAll("#board div"),
        difficultyLevel = 300,
        score = 0,
        furryInfiniteMove = setInterval(furryMovement, difficultyLevel),
        coin = new Coin(board),
        furry = new Furry(),
        i;
    
    function furryDirection() {
        var myPressedButton = event.which;
        switch(myPressedButton) {
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
        };
    };
  
    function furryMovement() {
        for (i = 0; i < board.length; i++) {
            if (board[i].classList.contains("furry")) {
                board[i].classList.remove("furry");
            };
        };

        furry.x = furry.x + furry.directionArray[0];
        furry.y = furry.y + furry.directionArray[1];

        if (furry.x < 0 || furry.x > 9 || furry.y < 0 || furry.y > 9) {
            document.querySelector("#message").style.visibility = "visible";
            document.querySelector("#message").style.color = "red";
            document.querySelector("#message").innerHTML = "GAME OVER!";
            board[coin.position].classList.remove("coin");

            for (i = 0; i < board.length; i++) {
                board[i].style.border = "4px solid red";         
            };

            clearInterval(furryInfiniteMove);
            document.removeEventListener("keydown", furryDirection);

        } else {
            var furryPosition = indexPosition(furry.x, furry.y);

            if (furryPosition === coin.position) {
                board[furryPosition].classList.add("furry");   
                score = score + 1;
                document.querySelector("#score").innerHTML = score;

                if (score === 10) {
                    for (i = 0; i < board.length; i++) {
                        board[i].style.border = "4px solid green";
                        board[i].classList.remove("coin", "furry"); 
                    };

                    document.querySelector("#message").style.visibility = "visible";
                    document.querySelector("#message").style.color = "green";
                    document.querySelector("#message").innerHTML = "YOU WON!";

                    clearInterval(furryInfiniteMove);
                    document.removeEventListener("keydown", furryDirection);

                } else {
                    clearInterval(furryInfiniteMove);
                    difficultyLevel = 0.8 * difficultyLevel;
                    furryInfiniteMove = setInterval(furryMovement, difficultyLevel);
                    coin = new Coin(board);
                };

            } else {
                board[furryPosition].classList.add("furry");
            };
        };  
    };
    
    document.addEventListener("keydown", furryDirection);
};

// DEFINICJA FUNKCJI INDEXPOSITION:

function indexPosition(x, y) {
    return x + y * 10;
};

// DEFINICJA OBIEKTU FURRY:

var Furry = function() {
    this.x = 0;
    this.y = 0;
    this.directionArray = [0,1];
};

// DEFINICJA OBIEKTU COIN:

var Coin = function(board) {
    var x = Math.floor(Math.random() * 10),
        y = Math.floor(Math.random() * 10);

    this.position = indexPosition(x, y);

    for (i = 0; i < board.length; i++) {
        if(board[i].classList.contains("coin")) {
            board[i].classList.remove("coin");
        };
    };

    board[this.position].classList.add("coin");
};

// WYWOŁANIE FUNKCJI GAME:

document.addEventListener("DOMContentLoaded", function() {
    game();
});