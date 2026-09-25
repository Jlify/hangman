const wordToGuess = ["world"];
let lettersGuessed = [];
let trials = 0;

const userInput = document.getElementById("ke");
userInput.textContent = "Enter a key";

function playgame() {
    document.body.addEventListener("keydown", (event) => {
        if (event.key.length !== 1) return; 
        while (trials < 5) {
            const correctletterGuessed = wordToGuess.filter(
                (a) => a === event.key.toLocaleLowerCase(),
            );
            if (correctletterGuessed) {
                console.log("Correct guess");
                lettersGuessed = +correctletterGuessed;
            }
            if ((lettersGuessed = wordToGuess.length)) {
                console.log(
                    "You guessed the word correctly, the word is",
                    wordToGuess,
                );
                break;
            }

            let wrongLetterGuessed = wordToGuess.filter(
                (b) => b !== event.key.toLowerCase(),
            );
            console.log("Wrong guess");
            trials++;
        }
    });
}
playgame();
