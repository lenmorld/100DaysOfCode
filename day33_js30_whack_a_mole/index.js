const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const ghosts = document.querySelectorAll('.ghost');
const button = document.querySelector('button');

const gameDuration = 5000;
const minAppearanceTime = 200;
const maxAppearanceTime = 1000;

let lastHole;
let timeUp = false;
let score;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];

  // recursion
  if (lastHole === hole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(minAppearanceTime, maxAppearanceTime);
  const hole = randomHole(holes);
  // console.log(time, hole)

  hole.classList.add('up');

  setTimeout(() => {
    hole.classList.remove('up');

    if (!timeUp) {
      peep(); // run indefinitely
    }
  }, time);
}

function startGame() {
  score = 0;
  scoreBoard.textContent = 0;
  timeUp = false;

  peep();

  button.style.visibility = 'hidden';

  setTimeout(() => {
    // GAME OVER!
    timeUp = true;
    button.style.visibility = 'visible';
  }, gameDuration);
}

function bonk(e) {
  if (!e.isTrusted) {
    console.log('Cheater!');
    return;
  }

  score++;
  scoreBoard.textContent = score;

  // console.log(e.target.parentElement)
  // console.log(this.classList)
  console.log(this.parentElement.classList);

  e.target.parentElement.classList.remove('up');
}

ghosts.forEach((ghost) => {
  ghost.addEventListener('click', bonk);
});

button.addEventListener('click', startGame);
