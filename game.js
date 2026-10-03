// These variables store information the game needs to remember

let randomNumber;      // The secret number computer picked
let attempts;          // How many guesses you made
let maxAttempts;       // Maximum tries allowed
let minRange;          // Smallest possible number
let maxRange;          // Largest possible number
let gameActive;        // Is the game still going?

// This function starts a new game
function startGame() {
    // Get which difficulty level was chosen
    const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    
    // Set the range and max attempts based on difficulty
    if (difficulty === 'easy') {
        minRange = 1;
        maxRange = 50;
        maxAttempts = 8;
    } else if (difficulty === 'medium') {
        minRange = 1;
        maxRange = 100;
        maxAttempts = 10;
    } else if (difficulty === 'hard') {
        minRange = 1;
        maxRange = 200;
        maxAttempts = 15;
    }

    // Pick a random number between min and max
    // Math.random() gives a number between 0 and 1
    // We multiply by (maxRange - minRange + 1) to get the range we want
    // Math.floor() rounds down to a whole number
    randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;

    // Reset attempts counter
    attempts = 0;

    // Game is now active
    gameActive = true;

    // Show the game area
    document.getElementById('gameArea').classList.remove('hidden');

    // Update the range text to show user what range they're guessing
    document.getElementById('rangeText').textContent = 
        `Guess a number between ${minRange} and ${maxRange}`;

    // Clear any previous messages
    document.getElementById('message').textContent = '';
    document.getElementById('message').className = 'message';

    // Clear the input field
    document.getElementById('guessInput').value = '';

    // Focus on the input (cursor goes there automatically)
    document.getElementById('guessInput').focus();
}

// This function checks if your guess is correct
function checkGuess() {
    // Stop if game is over
    if (!gameActive) return;

    // Get what the user typed
    const guess = parseInt(document.getElementById('guessInput').value);

    // Check if they entered a valid number
    if (isNaN(guess) || guess < minRange || guess > maxRange) {
        showMessage('Please enter a valid number in the range!', 'wrong');
        return;
    }

    // Increase attempts counter
    attempts++;

    // Update attempts display
    document.getElementById('attempts').textContent = attempts;

    // Compare guess with random number
    if (guess === randomNumber) {
        // They got it right! 🎉
        showMessage(
            `🎉 Correct! You guessed it in ${attempts} attempt${attempts > 1 ? 's' : ''}!`,
            'correct'
        );
        gameActive = false; // Game is over
    } else if (guess < randomNumber) {
        // Their guess is too low
        showMessage(
            `📈 Too LOW! Try a higher number. (Attempts: ${attempts}/${maxAttempts})`,
            'hint'
        );
    } else {
        // Their guess is too high
        showMessage(
            `📉 Too HIGH! Try a lower number. (Attempts: ${attempts}/${maxAttempts})`,
            'hint'
        );
    }

    // Check if they ran out of attempts
    if (attempts >= maxAttempts && gameActive) {
        showMessage(
            `❌ Game Over! The number was ${randomNumber}. Try again!`,
            'wrong'
        );
        gameActive = false;
    }

    // Clear input for next guess
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').focus();
}

// This function displays a message to the user
function showMessage(text, className) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.className = 'message ' + className;
}

// This function resets the game to start over
function resetGame() {
    document.getElementById('gameArea').classList.add('hidden');
    document.getElementById('message').textContent = '';
    startGame();
}

// Allow user to press Enter to check their guess
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('guessInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkGuess();
        }
    });
});