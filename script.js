// script.js

document.addEventListener('DOMContentLoaded', () => {
  const cases = document.querySelectorAll('.case');
  const dealerSection = document.querySelector('.dealer-section');
  const dealerBox = document.getElementById('dealer-box');
  const dealBtn = document.getElementById('deal-button');
  const noDealBtn = document.getElementById('no-deal-button');
  const scoreContainer = document.getElementById('score-container');

  // 1. Define your prizes
  const prizes = [
    'White Monster 🏆',
    'Red Bull 🔴',
    'Prime 💧',
    'Celsius 🌡️',
    'Bang 💀',
    'Tap Water 🚰'
  ];

  // 2. Shuffle the prizes array (Fisher–Yates)
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffle(prizes);

  let chosenIndex = null;
  let bankerOffer = null;

  // 3. Hide dealer & score sections at start
  dealerSection.style.display = 'none';
  scoreContainer.style.display = 'none';

  // 4. Case click handler: choose your case
  cases.forEach((c, idx) => {
    c.dataset.index = idx;
    c.addEventListener('click', () => {
      if (chosenIndex !== null) return;        // already chosen
      chosenIndex = idx;
      // disable all further clicks
      cases.forEach(el => el.style.pointerEvents = 'none');
      // determine banker's offer (random other prize)
      let offerIdx = Math.floor(Math.random() * prizes.length);
      while (offerIdx === chosenIndex) {
        offerIdx = Math.floor(Math.random() * prizes.length);
      }
      bankerOffer = prizes[offerIdx];
      // show the banker message
      dealerBox.textContent = `I'll offer you a ${bankerOffer} instead...`;
      dealerSection.style.display = 'block';
    });
  });

  // 5. "Deal" button -> accept banker's offer
  dealBtn.addEventListener('click', () => {
    revealResult(`You took the deal: ${bankerOffer}!`);
  });

  // 6. "No Deal" button -> open your chosen case
  noDealBtn.addEventListener('click', () => {
    const yourPrize = prizes[chosenIndex];
    revealResult(`You opened your case and got: ${yourPrize}!`);
  });

  // 7. Show final result and a "Play Again" button
  function revealResult(message) {
    dealerSection.style.display = 'none';
    scoreContainer.innerHTML = `<p>${message}</p>`;
    scoreContainer.style.display = 'block';
    const playAgainBtn = document.createElement('button');
    playAgainBtn.textContent = 'Play Again';
    playAgainBtn.addEventListener('click', () => location.reload());
    scoreContainer.appendChild(playAgainBtn);
  }
});
