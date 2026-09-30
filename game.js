const wordToGuess = "world";
// split provided string and store save as an array in created variable
const wordToGuessArray = wordToGuess.split("");
const wordToGuessFiltered = wordToGuessArray.reduce((acc, n) => {
    if (/[a-z]$/.test(n) && !acc.includes(n)) acc.push(n);
    return acc;
}, []);
const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");

let correctGuessedLetters = [];
let trials = 6;
const feedbackElement = document.getElementById("feedback");

let displayArray = wordToGuess.split("").map((v) => {
    return "_";
});
const displayGuess = document.getElementById("displayCorrectGuess");
displayGuess.textContent = displayArray.join(" ");

for (const letter of alphabets) {
    const createButton = document.createElement("button")
    
    createButton.innerHTML = letter
    document.getElementById("alphabet-buttons").appendChild(createButton)
}

document.body.addEventListener("keydown", (event) => {
    const pressedKey = event.key.toLowerCase();
    if (alphabets.includes(pressedKey)) {
        //endgame when trials runout
        if (trials < 1) {
            return;
        }
        //verify keypressed by player
        if (wordToGuessArray.includes(pressedKey)) {
            feedbackElement.innerHTML = "Correct guess: " + pressedKey;
            correctGuessedLetters.push(pressedKey);
            displayArray = wordToGuessArray.map((key) => {
                return correctGuessedLetters.includes(key) ? key : "_";
            });
            console.log(displayArray);
            displayGuess.textContent = displayArray.join(" ");
        } else {
            trials--;
            feedbackElement.innerHTML = "Wrong guess " + pressedKey;
            let updateImage = document.getElementById("image");
            updateImage.setAttribute(
                "src",
                "hangman_images/hangman-" + trials + ".svg",
            );
        }
        //check initial empty array to confirm if all letters have been guessed, then end game
        if (correctGuessedLetters.length === wordToGuessFiltered.length) {
            feedbackElement.innerHTML = "You won " + wordToGuess;
            return;
        }
        if (trials < 1) {
            feedbackElement.innerHTML = "You lost " + wordToGuess;
        }
    } else {
        return;
    }
});
