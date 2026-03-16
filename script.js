const cards = document.querySelectorAll('.color-card');
const generateBtn = document.getElementById('generateBtn');
const toast = document.getElementById('toast');
const locked = [false, false, false, false, false];

function randomHex() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0').toUpperCase();
}

function applyColor(card, hex) {
  card.querySelector('.color-box').style.backgroundColor = hex;
  card.querySelector('.hex').textContent = hex;
}

function generate() {
  cards.forEach((card, i) => {
    if (!locked[i]) {
      applyColor(card, randomHex());
    }
  });
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
}

cards.forEach((card, i) => {
  const lockBtn = card.querySelector('.lock-btn');
  const hexSpan = card.querySelector('.hex');

  lockBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    locked[i] = !locked[i];
    lockBtn.textContent = locked[i] ? '🔒' : '🔓';
  });

  hexSpan.addEventListener('click', (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hexSpan.textContent).then(() => {
      showToast(`${hexSpan.textContent} 복사됨!`);
    });
  });
});

generateBtn.addEventListener('click', generate);

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && e.target === document.body) {
    e.preventDefault();
    generate();
  }
});

generate();
