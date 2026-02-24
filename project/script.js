console.log("Welcome to Tic Tac Toe");
// Load sounds
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");

let turn = "X";
let isgameover = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];

    wins.forEach(e => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won!";
            isgameover = true;
            document.querySelector('.imgbox img').style.width = "200px";
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector('.line').style.width = "20vw";

            // Highlight winning boxes
            [e[0], e[1], e[2]].forEach(index => {
                boxtext[index].parentElement.classList.add("win-glow");
            });

            // Play game over sound
            gameover.play();
        }
    });
}

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (boxtext.innerText === "" && !isgameover) {
            boxtext.innerText = turn;
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                turn = changeTurn();
                document.querySelector(".info").innerText = "Turn for " + turn;
            }
        }
    });
});

// Reset button logic
document.getElementById("reset").addEventListener("click", () => {
    let boxtexts = document.querySelectorAll(".boxtext");
    boxtexts.forEach(element => {
        element.innerText = "";
    });

    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0";
    document.querySelector(".imgbox img").style.width = "0";
    document.querySelector(".info").innerText = "Turn for " + turn;

    // Remove win glow
    Array.from(boxes).forEach(box => {
        box.classList.remove("win-glow");
    });
});





