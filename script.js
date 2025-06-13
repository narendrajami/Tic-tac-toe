const boxes = document.querySelectorAll('.box');
const resetBtn = document.getElementById('reset');
const msgContainer = document.querySelector('.msg-container');
const msg = document.getElementById('msg');
const gif = document.getElementById('celebrate-gif');
const clickSound = document.getElementById('click-sound');
const gameSound = document.getElementById('last-sound');
let turnO = false;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function startGame() {
    gif.classList.add('hide');
  boxes.forEach(b => { b.textContent = ''; b.disabled = false; });
  msgContainer.classList.add('hide');
  turnO = false;
  boxes.forEach((b, i) => b.onclick = () => handleClick(b, i));
}

function handleClick(box, idx) {
    clickSound.currentTime = 0;
    clickSound.play();
  box.textContent = turnO ? 'O' : 'X';
  box.disabled = true;
  const player = turnO ? 'O' : 'X';
  if (checkWin(player)) return endGame(false, player);
  if ([...boxes].every(b => b.textContent)) return endGame(true);
  turnO = !turnO;
}

function checkWin(player) {
  return winPatterns.some(p => p.every(i => boxes[i].textContent === player));
}

function endGame(draw, player) {
  msg.textContent = draw ? "It's a draw!" : `${player} wins!`;
  msgContainer.classList.remove('hide');
  boxes.forEach(b => b.disabled = true);
  if (!draw) {
    gif.classList.remove('hide');
    gameSound.play();
    confetti({ particleCount: 150, spread: 60, startVelocity: 40 });
  }
}

resetBtn.addEventListener('click', startGame);
  startGame();
  