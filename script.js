const card = document.getElementById('card');
const title = document.getElementById('title');
const subtitle = document.getElementById('subtitle');
const choiceRow = document.getElementById('choiceRow');
const dots = [...document.querySelectorAll('.dot')];
const decor = document.getElementById('floatingDecor');
const toast = document.getElementById('toast');
const heroTeddy = document.getElementById('heroTeddy');
const tinyLine = document.getElementById('tinyLine');
const promiseStrip = document.getElementById('promiseStrip');

// ✏️ EDIT THIS: write your apology in your own words.
// Tip: say exactly what happened and what you're sorry for. Specific beats generic.
const defaultNote = `Suhan ❤️,

Tu meri jaan hai yaar. Main kabhi nahi chahta ki tu mujhse udaas ho.

Sach bolun toh tera daantna ya gaali dena mujhe utna nahi darata, jitna teri chuppi darati hai. Jab tu achanak chup ho jaati hai, toh bahut dard hota hai, aur mujhe darr lagta hai ki kahin main tujhe kho na dun. 🥺

Shayad kabhi kabhi mazaak-mazaak mein mere muh se galat words nikal jaate hain, aur mujhe samajh aata hai ki unse tujhe hurt hua. Uske liye main dil se sorry bolta hoon. I'm genuinely sorry, Suhan.

Tu mere liye bahut important hai, aur main tujhe khona nahi chahta.

Tu jitna time chahe le le, main yahin hoon. Bas itna jaan le ki main tujhe sunna chahta hoon aur sab theek karna chahta hoon. 🧸

Aur jab tu ready ho… apni favourite ko ek Maaza pilaun? 🥭❤️`;

function decorate() {
  const items = [
    ['💗', 4, 0], ['🧸', 12, 1], ['💕', 21, 2], ['💖', 31, 3],
    ['🥭', 42, 4], ['💗', 54, 5], ['🧸', 64, 6], ['💞', 74, 7],
    ['💖', 84, 8], ['🧸', 92, 9], ['💗', 9, 10], ['💕', 28, 11],
    ['🧸', 49, 12], ['💗', 70, 13], ['💖', 89, 14]
  ];

  items.forEach(([symbol, left, i]) => {
    const el = document.createElement('span');
    el.className = 'float-item';
    el.textContent = symbol;
    el.style.left = `${left}%`;
    el.style.fontSize = `${18 + (i % 4) * 8}px`;
    el.style.animationDuration = `${11 + (i % 5) * 2.5}s`;
    el.style.animationDelay = `${-(i * 1.7)}s`;
    el.style.opacity = `${0.38 + (i % 4) * 0.12}`;
    decor.appendChild(el);
  });

  // Little Maaza bottles floating up
  [4, 39, 68, 90].forEach((left, i) => {
    const wrap = document.createElement('span');
    wrap.className = 'float-item';
    wrap.style.left = `${left}%`;
    wrap.style.animationDuration = `${15 + i * 2}s`;
    wrap.style.animationDelay = `${-i * 3}s`;
    const bottle = document.createElement('span');
    bottle.className = 'mini-bottle';
    wrap.appendChild(bottle);
    decor.appendChild(wrap);
  });
}

decorate();

function pop() {
  card.classList.remove('pop');
  void card.offsetWidth;
  card.classList.add('pop');
}

function setDots(active) {
  dots.forEach((d, i) => d.classList.toggle('active', i === active));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 1900);
}

function makeButton(label, cls, onClick) {
  const b = document.createElement('button');
  b.className = `btn ${cls}`;
  b.textContent = label;
  b.addEventListener('click', onClick);
  return b;
}

function screen({ heading, text, buttons, dot = 0, teddy = '🧸', tiny = 'a tiny website made for one very special girl ✨' }) {
  title.textContent = heading;
  subtitle.textContent = text;
  choiceRow.innerHTML = '';
  choiceRow.style.display = '';
  buttons.forEach(b => choiceRow.appendChild(b));
  setDots(dot);
  heroTeddy.textContent = teddy;
  tinyLine.textContent = tiny;
  promiseStrip.style.display = 'flex';
  pop();
}

function startSecondQuestion() {
  screen({
    heading: 'Are you sure, Suhan? 🥺',
    text: 'Because that little teddy thinks you might still want to hear Prashant out. 🧸💗',
    dot: 1,
    teddy: '🥺',
    buttons: [
      makeButton('Yes, still angry 😤', 'btn-yes', reallySure),
      makeButton('Okay… maybe not 🙈', 'btn-no', openNote)
    ],
    tiny: 'okay… I promise no arguments 🥹'
  });
}

function reallySure() {
  screen({
    heading: 'You really sure? 😭',
    text: 'Because I made this whole tiny website instead of just sending "sorry" on WhatsApp. 🥺',
    dot: 1,
    teddy: '🧸',
    buttons: [
      makeButton('Yes 😤', 'btn-yes', finalTry),
      makeButton('Fine… tell me 🥹', 'btn-no', openNote)
    ],
    tiny: 'one more tiny question… pinky promise 💗'
  });
}

function finalTry() {
  screen({
    heading: 'One last question… 🥺',
    text: 'Can Prashant have two minutes to say sorry properly? No excuses. Just heart. ❤️',
    dot: 2,
    teddy: '🧸',
    buttons: [
      makeButton('Okay, tell me 💌', 'btn-yes', openNote),
      makeButton('Hmm… okay 🙈', 'btn-no', openNote)
    ],
    tiny: 'okay… heart open now 💗'
  });
}

function openNote() {
  screen({
    heading: 'Prashant wants to say something… 🥺',
    text: 'Okay Suhan. No teasing now. This part is genuinely from my heart. ❤️',
    dot: 2,
    teddy: '🧸',
    buttons: [makeButton('Read my note 💌', 'btn-yes', showNote)],
    tiny: 'no ego. no excuses. just sorry. ❤️'
  });
}

// The note is shown as a letter. Edit `defaultNote` at the top to change it.
function showNote() {
  title.textContent = 'For my Suhan. 💗';
  subtitle.textContent = 'Every word of this is for you.';
  choiceRow.innerHTML = '';
  promiseStrip.style.display = 'none';

  const message = document.createElement('div');
  message.className = 'final-message';
  message.textContent = defaultNote;

  const promises = document.createElement('div');
  promises.className = 'little-promises';
  promises.innerHTML = `
    <div>🧸 More hugs</div>
    <div>🥭 Maaza date</div>
    <div>💗 More smiles</div>
  `;

  const actions = document.createElement('div');
  actions.className = 'final-actions';
  actions.appendChild(makeButton('Okay… I forgive you 🙈', 'btn-yes', forgiven));
  actions.appendChild(makeButton('Still mad 😤', 'btn-no', stillMad));

  const sig = document.createElement('div');
  sig.className = 'signature';
  sig.textContent = '— Your Prashant 🧸❤️';

  choiceRow.append(message, promises, actions, sig);
  choiceRow.style.display = 'block';
  setDots(2);
  heroTeddy.textContent = '🥹';
  pop();
  burst();
}

function forgiven() {
  title.textContent = 'YAYYYYY!! 🥹💗';
  subtitle.textContent = 'Prashant officially owes Suhan a hug, a smile and a Maaza. 🧸🥭';
  choiceRow.innerHTML = '';
  choiceRow.style.display = 'block';
  promiseStrip.style.display = 'flex';
  heroTeddy.textContent = '🧸💗';

  const ending = document.createElement('div');
  ending.className = 'ending';
  ending.innerHTML = `
    <div class="final-message" style="text-align:center">
      <strong>Suhan, thank you for hearing me out. ❤️</strong><br><br>
      Now please give that pretty smile back. 🥺<br>
      <span style="font-size:30px">🧸 + 🥭 + 💗</span>
    </div>
  `;
  const smileBtn = makeButton('Okay, now smile for me 🥹', 'btn-yes', () => {
    burst();
    showToast('That smile is all I wanted. ❤️');
  });
  smileBtn.style.marginTop = '14px';
  choiceRow.appendChild(ending);
  choiceRow.appendChild(smileBtn);
  setDots(2);
  pop();
  burst();
}

function stillMad() {
  title.textContent = 'Okay… I understand. 🥺';
  subtitle.textContent = 'Take your time, Suhan. I am still sorry, and I am still here. ❤️';
  choiceRow.innerHTML = '';
  choiceRow.style.display = 'flex';
  promiseStrip.style.display = 'flex';
  heroTeddy.textContent = '🧸';
  choiceRow.appendChild(makeButton('Read my note again 💌', 'btn-no', showNote));
  setDots(2);
  pop();
}

function burst() {
  const symbols = ['💗', '💕', '✨', '🧸', '💖', '🥭', '🌸'];
  for (let i = 0; i < 48; i++) {
    const el = document.createElement('div');
    el.className = 'confetti';
    el.textContent = symbols[i % symbols.length];
    el.style.left = `${Math.random() * 100}vw`;
    el.style.fontSize = `${14 + Math.random() * 15}px`;
    el.style.animationDelay = `${Math.random() * 0.5}s`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2200);
  }
}

const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

yesBtn.addEventListener('click', startSecondQuestion);
noBtn.addEventListener('click', openNote);

// "Yes" playfully hesitates when she hovers over it (or focuses it on mobile/keyboard).
function hesitate() {
  yesBtn.textContent = 'Are you sure? 🥺';
  yesBtn.style.transform = 'scale(.94) rotate(-2deg)';
}
function relax() {
  yesBtn.textContent = 'Yes 😤';
  yesBtn.style.transform = '';
}
yesBtn.addEventListener('mouseenter', hesitate);
yesBtn.addEventListener('mouseleave', relax);
yesBtn.addEventListener('focus', hesitate);
yesBtn.addEventListener('blur', relax);
