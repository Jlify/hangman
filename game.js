async function getRandomWords() {
    const response = await fetch(
        "https://random-words-api.kushcreates.com/api?words=1",
    );
    const words = await response.json();
    return words[0].word;
}
//getRandomWords();

const wordToGuess = (await getRandomWords());

// split provided string and store save as an array in created variable
const wordToGuessArray = await wordToGuess.split("");
const wordToGuessFiltered = wordToGuessArray.reduce((acc, n) => {
    if (/[a-z]$/.test(n) && !acc.includes(n)) acc.push(n);
    return acc;
}, []);
const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
let incorrectGuessedLetters = [];

let correctGuessedLetters = [];
let trials = 6;


const feedbackElement = document.getElementById("feedback");

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
    if (correctGuessedLetters.includes(pressedKey)) {
        return;
    }

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
            incorrectGuessedLetters.push(pressedKey);
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
    }
}
validateKeyPressed();
