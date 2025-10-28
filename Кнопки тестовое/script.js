const spinner = document.getElementById('spinner');
const input = spinner.querySelector('.spinner__input');
const dec = spinner.querySelector('.spinner__button--dec');
const inc = spinner.querySelector('.spinner__button--inc');
const check = spinner.querySelector('.spinner__check');
const hiddenConfirmed = spinner.querySelector('input[type="hidden"][name="spinner_confirmed"]');

const MIN_VALUE = 0;
const MAX_VALUE = 9999;

function clampNumber(str) {
  return str.replace(/[^\d-]/g, '').slice(0, 5);
}

function getValue() {
  const v = parseInt(input.value, 10);
  if (isNaN(v)) return null; 
  return v;
}

function setValue(v) {
  v = Math.min(Math.max(v, MIN_VALUE), MAX_VALUE);
  input.value = String(v);
  updateButtons();
}

function updateButtons() {
  const v = getValue();
  dec.disabled = v === null || v <= MIN_VALUE;
  inc.disabled = v !== null && v >= MAX_VALUE;
}

dec.onclick = () => {
  const v = getValue() ?? MIN_VALUE;
  setValue(v - 1);
};
inc.onclick = () => {
  const v = getValue() ?? MIN_VALUE;
  setValue(v + 1);
};

input.addEventListener('input', () => {
  input.value = clampNumber(input.value);
  updateButtons();
});

input.addEventListener('blur', () => {
  const v = getValue();
  if (v === null || v < MIN_VALUE) setValue(MIN_VALUE);
});

input.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    const v = getValue() ?? MIN_VALUE;
    setValue(v + 1);
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    const v = getValue() ?? MIN_VALUE;
    setValue(v - 1);
  }
});

// галочка
check.onclick = () => {
  spinner.classList.toggle('spinner--checked');
  hiddenConfirmed.value = spinner.classList.contains('spinner--checked');
};

// обновляем кнопки при загрузке
updateButtons();