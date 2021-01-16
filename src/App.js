// imports
import './App.css';
import { useState } from 'react';
import image0 from './images/hm_0.png';
import image1 from './images/hm_1.png';
import image2 from './images/hm_2.png';
import image3 from './images/hm_3.png';
import image4 from './images/hm_4.png';
import image5 from './images/hm_5.png';
import image6 from './images/hm_6.png';

export default function App() {
	const [word, setWord] = useState(""); // Tracks the current chosen word
	const [attempts, setAttempts] = useState(0); // Tracks the number of incorrect guesses
	const [tried, setTried] = useState([]); // Tracks the letters that have already been guessed
	const [guess, setGuess] = useState(""); // Tracks the current guess
	const [message, setMessage] = useState(""); // Tracks any necessary remarks to be made to the user

	return (
		<div className="app">
			<header className="app-header">
				<h1 className="app-headline">Hangman</h1>

				{/* Load current game state's image or equivalent alt text */}
				<img src={chooseImage(attempts)} alt={`${6 - attempts} incorrect guesses left`} />

				{/* Render the appropriate letters from the word depending on game state */}
				<span className={attempts >= 6 ? "game-text loss-text"
					: checkSolved(word, tried, attempts) ? "game-text win-text"
					: "game-text"}>{processWord(word, tried, attempts)}</span>

				{/* Keep track of already guessed letters */}
				<span className="used-letter-text">Already guessed: [{tried.join(', ')}]</span>

				<span>
					<input className="text-field" type="text" value={guess} onChange={(e) => { setGuess(e.target.value.toLowerCase()) }} />
					<button className="gen-btn guess-btn" onClick={() => {
						// Validate that the game is running and each guess is valid
						let check = validateGuess(guess, word, attempts, tried);
						if (check === true) {
							// Count incorrect guesses
							if (!word.split('').includes(guess)) {
								setAttempts(attempts + 1);
							}
							setTried(tried.concat([guess]));
							setGuess("");
							setMessage("");
						}
						// Set user message for invalid guesses
						else {
							setMessage(check);
						}
					}}>Guess</button>
				</span>

				{/* Show any warnings about invalid guesses */}
				<span className="warning-text">{message}</span>

				<button className="gen-btn reset-btn" onClick={() => {
					// Reset guesses and letter bank when a new game is started
					setAttempts(0);
					setTried([]);
					setMessage("");
					// Fetch a new word from the API
					fetch('https://random-word-api.herokuapp.com/word?number=1&swear=1')
						.then(res => res.json())
						.then(data => {
							setWord(data[0].toLowerCase());
						})
						.catch(err => {
							console.log(err);
						});
				}}>New Game</button>
			</header>
		</div>
	);
}

// Check if the word has been fully guessed
const checkSolved = (word, tried, attempts) => (processWord(word, tried, attempts).indexOf("_") === -1);

// Load corresponding image per guess made
const chooseImage = (attempt) => {
	switch (attempt) {
		case 0:
			return image0;
		case 1:
			return image1;
		case 2:
			return image2;
		case 3:
			return image3;
		case 4:
			return image4;
		case 5:
			return image5;
		case 6:
			return image6;
		default:
			return image6;
	}
}

// Handles revealing of letters
const processWord = (word, tried, attempts) => {
	if (attempts >= 6) {
		// Game is over, reveal the word
		return word;
	}
	else {
		// Game still going, replace all unguessed letters with underscores
		return word.split('').map(letter => (tried.includes(letter) ? letter : '_')).join('');
	}
}

// Prevents invalid guesses and guessing when the game hasn't started or was already lost
const validateGuess = (guess, word, attempts, tried) => {
	let msg = "";
	// Don't allow guesses if the game is already over or if no word has been chosen
	if (attempts >= 6 || word === "") {
		msg = 'Please start a new game';
	}
	// Don't allow blank guesses or multiple letters
	if (guess.length !== 1) {
		msg = 'Guess one character at a time';
	}
	// Don't allow non-alphabetical guesses
	if (!guess.match(/[a-z]/)) {
		msg = 'Guesses can only be letters';
	}
	// Don't allow repeat guesses
	if (tried.includes(guess)) {
		msg = 'Already guessed that letter';
	}
	if (msg.length === 0) {
		return true;
	}
	return msg;
}