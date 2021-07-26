'strict-mode';

const btns = document.querySelectorAll('button');
const score = document.querySelector('.score');
const message = document.querySelector('.message');
const gameplay = document.querySelector('.gameplay');
////////////////////////////////////////////////////

let curCardValue = 0;
let scoreVal = 0;
let deck = [];

const suits = ['hearts', 'diams', 'clubs', 'spades'];
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

//////////toggle//////////
function togglebtns() {
  btns.forEach(btn => {
    console.log('clicked');
    btn.classList.toggle('btn__hidden');
  });
}

const playgame = function (e) {
  let temp = e.target.innerText;
  let myCard = makeCard();
  if (temp == 'New Game') {
    gameplay.innerHTML = '';
    togglebtns();
    drawCard(myCard);
    return;
  }
  if (curCardValue === myCard.v) {
    message.innerText = 'DRAW';
  } else {
    if (
      (temp === 'High' && myCard.v > curCardValue) ||
      (temp === 'Low' && myCard.v < curCardValue)
    ) {
      scoreVal++;
      score.innerText = scoreVal;
      message.innerText = 'Correct! Pick again!';
    } else {
      message.innerText = 'Game Over! Try Again.';
      scoreVal = 0;
      togglebtns();
    }
  }
  drawCard(myCard);
};

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', playgame);
}

function mackeDeck() {
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      let card = {};
      card.suit = suits[i];
      card.rank = ranks[j];
      card.v = j + 1;
      deck.push(card);
    }
  }
}
//mackeDeck();
function makeCard() {
  if (deck.length > 0) {
    let random = Math.floor(Math.random() * deck.length - 1);
    let card = deck.splice(random, 1)[0];
    console.log(random, card);
    return card;
  } else {
    mackeDeck();
    return makeCard();
  }
}
const d = makeCard();
console.log(d);

function drawCard(card) {
  curCardValue = card.v;
  const divCard = document.createElement('div');
  divCard.setAttribute('class', 'card');
  let cards = document.querySelectorAll('.card');
  divCard.style.left = cards.length * 100 + 'px';
  let innerText1 = card.rank + '<br>&' + card.suit + ';';
  let innerText2 = card.rank + '&' + card.suit + ';';
  if (card.suit === 'hearts' || card.suit === 'diams') {
    divCard.classList.add('red');
  }
  const span2 = document.createElement('span');
  span2.innerHTML = innerText2;
  span2.classList.add('tiny');
  divCard.appendChild(span2);
  const span1 = document.createElement('span');
  span1.innerHTML = innerText1;
  span1.classList.add('big');
  divCard.appendChild(span1);
  gameplay.appendChild(divCard);
}
