# Hangman

## Setup

Clone the repo and run `npm install` in the root directory to install all dependencies.

Running `npm start` will spin up the development server and automatically launch the page.

## Instructions

Press the New Game button to get a new word and reset any existing guesses. You'll need to start a new game the first time you launch the site, as the first game is not created until requested.

To play, type one letter and hit the Guess button. If your guess isn't a valid single alphabetical character, you will receive a warning message and the guess will not be recorded.

If you fully solve the word, the word will turn blue.

If the man gains his head, body, two arms, and two legs, you lose and the word will automatically be revealed and turn red.

## Acknowledgement

Word generator sourced from https://github.com/RazorSh4rk/random-word-api