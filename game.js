const wordToGuess = "world";
const letter = wordToGuess.split("");
let lettersGuessed = [];
let trials = 0;

function playgame() {
    document.body.addEventListener("keydown", (event) => {
        while (trials < 5) {
            if (event.key.toLowerCase() === letter) {
                console.log("event.key.toLowerCase()");
                lettersGuessed = +event.key.toLowerCase();
            } else {
                console.log("Wrong guess");
                trials++;
            }
        }
    });
}
playgame();
