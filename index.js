// game state
const game = {
    audio: {
        green: new Audio("audio/green.MP3"),
        red: new Audio("audio/red.MP3"),
        yellow: new Audio("audio/yellow.MP3"),
        blue: new Audio("audio/blue.MP3")
    },

    colors: ["green", "red", "yellow", "blue"],
    isRunning: false,
    currentColorIndex: 0,
    score: 0,
    gameOrder: [],
    userOrder: []
}

function gameStart() {
    game.isRunning = true;
    $(".title").text("good luck! :)")

    setTimeout(() => {
        executeSimonAlgorithm();
    }, 1000);
}

function addEventHandlers() {
    // light up on hover
    $(".button")
    .on("mouseenter", function () {
        $(this).addClass("shine pointer");
    })
    .on("mouseleave", function() {
        $(this).removeClass("shine pointer");
    });

    // click logic
    $(".button")
    .on("click", function () {
        $(this).removeClass("shine pointer");

        let audio = game.audio[$(this)[0].id];
        audio.play();

        setTimeout(() => {
            $(this).addClass("shine pointer");

            // additional logic if game is running
            if (game.isRunning) {
                let currentColorIndex = game.currentColorIndex;
                game.userOrder.push($(this)[0].id);

                if (game.userOrder[currentColorIndex] === game.gameOrder[currentColorIndex]) {
                    if (game.currentColorIndex === game.gameOrder.length -1) {
                        game.currentColorIndex = 0;
                        game.userOrder = [];
                        game.score++;

                        $(".title").text(`score: ${game.score}`);

                        setTimeout(() => {
                            executeSimonAlgorithm();
                        }, 1000);
                    } else {
                        game.currentColorIndex++;
                        
                    }
                } else {
                    gameOver();
                }
            } else {
                game.isRunning = true;
                gameStart();
            }

            $(this).removeClass("shine pointer");
        }, 50);
    })

    // if statement ensures that we just add the event when the game is not running
    if (game.isRunning === false) {
        $("body").on("keydown", function() {
            game.isRunning = true;
            gameStart();
        });
    }
}

function removeEventHandlers() {
    $(".button").off();
    $("body").off();
}

function executeSimonAlgorithm() {
    removeEventHandlers();
    $(".title").text("generating sequence...")

    let randomColor = game.colors[(Math.floor(Math.random() * 4))];
    game.gameOrder.push(randomColor);

    for (let index = 0; index < game.gameOrder.length; index++) {
        setTimeout(() => {
            game.audio[game.gameOrder[index]].play();
            $(`#${game.gameOrder[index]}`).addClass("shine");

            setTimeout(() => {
                $(`#${game.gameOrder[index]}`).removeClass("shine");
            }, 500);

            if (index === game.gameOrder.length - 1) {
                setTimeout(() => {
                    addEventHandlers();
                    $(".title").text("your turn!");
                }, 1000);
            }
        }, 1000 * index);
    }
}

function gameOver () {
    removeEventHandlers();

    $(".title").text(`game over! score: ${game.score}`);

    game.isRunning = false;
    game.currentColorIndex = 0;
    game.score = 0;
    game.gameOrder = [];
    game.userOrder = [];

    setTimeout(() => {
        $(".title").text(`press any key to try again`);
        addEventHandlers();
    }, 5000);
}

// enables button click and keyboard
addEventHandlers();