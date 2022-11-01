'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');

let playing, activePlayer, currentScore, finalScore, number;

const init = () => {
  playing = true;
  activePlayer = 0;
  currentScore = 0;
  finalScore = [0, 0];

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

let updateScore = score => {
  document.getElementById(`current--${activePlayer}`).textContent = score;
};

let changePlayer = () => {
  activePlayer = activePlayer === 1 ? 0 : 1;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

document.querySelector('.btn--roll').addEventListener('click', () => {
  if (playing) {
    number = Math.trunc(Math.random() * 6) + 1;
    diceEl.setAttribute('src', `./dice-${number}.png`);

    diceEl.classList.remove('hidden');

    if (number !== 1) {
      currentScore += number;
      updateScore(currentScore);
    } else {
      currentScore = 0;
      updateScore(currentScore);
      changePlayer();
    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', () => {
  if (playing) {
    finalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      finalScore[activePlayer];

    if (finalScore[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      currentScore = 0;
      updateScore(currentScore);
      diceEl.classList.add('hidden');
    } else {
      currentScore = 0;
      updateScore(currentScore);
      changePlayer();
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', () => {
  document.querySelectorAll('.player').forEach(player => {
    player.classList.remove('player--winner');
    player.querySelector('.score').textContent = 0;
    player.querySelector('.current-score').textContent = 0;
  });
  init();
});
