async function getRandomWords() {
    const response = await fetch(
        "https://random-words-api.kushcreates.com/api?language=de&words=1",
    );
    const words = await response.json();
    return words[0].word;
}

const wordToGuess = await getRandomWords();

// split provided string and store save as an array in created variable
const wordToGuessArray = wordToGuess.toLowerCase().split("");
const wordToGuessFiltered = wordToGuessArray.reduce((acc, n) => {
    if (/[a-z]$/.test(n) && !acc.includes(n)) acc.push(n);
    return acc;
}, []);
const alphabets = "abcdefghijklmnopqrstuvwxyzäöüß".split("");
let incorrectGuessedLetters = [];
let correctGuessedLetters = [];
let trials = 7;

const feedbackElement = document.getElementById("feedback");
const hangManImage = document.getElementById("image");
const guessedLetter = document.getElementById("PressedKeys");
const restartGame = document.getElementById("restart");

restartGame.addEventListener("click", () => {
    window.location.reload();
});

let displayArray = wordToGuess.split("").map((v) => {
    return "_";
});

const displayGuess = document.getElementById("displayCorrectGuess");
displayGuess.textContent = displayArray.join(" ");

for (const letter of alphabets) {
    const createButton = document.createElement("button");
    createButton.innerHTML = letter;
    createButton.addEventListener("click", (e) => {
        const pressedKey = e.target.textContent;
        validateKeyPressed(pressedKey);
    });
    document.getElementById("alphabet-buttons").appendChild(createButton);
}

document.body.addEventListener("keydown", (event) => {
    const pressedKey = event.key.toLowerCase();
    validateKeyPressed(pressedKey);
});

function validateKeyPressed(pressedKey) {
    if (incorrectGuessedLetters.includes(pressedKey)) {
        return;
    }
    if (trials < 1) {
        return;
    }
    if (wordToGuessArray.includes(pressedKey)) {
        correctGuessedLetters.push(pressedKey);
        displayArray = wordToGuessArray.map((key) => {
            return correctGuessedLetters.includes(key) ? key : "_";
        });
        displayGuess.textContent = displayArray.join(" ");
    } else {
        trials--;
        incorrectGuessedLetters.push(pressedKey);
    }
    guessedLetter.innerHTML = incorrectGuessedLetters;
    hangManImage.setAttribute(
        "src",
        "hangman_images/hangman-" + trials + ".svg",
    );

    if (correctGuessedLetters.length === wordToGuessFiltered.length) {
        feedbackElement.innerHTML = "You won";
        return;
    }
    if (trials < 1) {
        feedbackElement.innerHTML = "You lost, Correct word is " + wordToGuess;
    }
}
validateKeyPressed();
