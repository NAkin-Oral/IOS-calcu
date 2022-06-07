// DOM Elements
const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const value = document.querySelector('.value');
const ac = document.querySelector('.ac');
const reverse = document.querySelector('.pm');
const percent = document.querySelector('.percent');
const addition = document.querySelector('.addition');
const subtraction = document.querySelector('.subtraction');
const multiplication = document.querySelector('.multiplication');
const division = document.querySelector('.division');
const equal = document.querySelector('.equal');
const decimal = document.querySelector('.decimal');
const number0 = document.querySelector('.number-0');
const number1 = document.querySelector('.number-1');
const number2 = document.querySelector('.number-2');
const number3 = document.querySelector('.number-3');
const number4 = document.querySelector('.number-4');
const number5 = document.querySelector('.number-5');
const number6 = document.querySelector('.number-6');
const number7 = document.querySelector('.number-7');
const number8 = document.querySelector('.number-8');
const number9 = document.querySelector('.number-9');
const numberArray = [
  number0,
  number1,
  number2,
  number3,
  number4,
  number5,
  number6,
  number7,
  number8,
  number9,
];

// variables
let valueStrInMemory = null;
let operatorInMemory = null;

// Functions
const getValueStr = () => value.textContent.split(',').join('');

const getValueNum = () => {
  return parseFloat(getValueStr());
};

const setStrValue = valueStr => {
  if (valueStr[valueStr.length - 1] === '.') {
    value.textContent += '.';
    return;
  }
  const [wholeNumStr, decimalStr] = valueStr.split('.');
  if (decimalStr) {
    value.textContent =
      parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
  } else {
    value.textContent = parseFloat(wholeNumStr).toLocaleString();
  }
};

const handleNumberClick = numStr => {
  const currentValueStr = getValueStr();
  if (currentValueStr === '0') {
    setStrValue(numStr);
  } else {
    setStrValue(currentValueStr + numStr);
  }
};

const getResultOfOperationStr = () => {
  const currentValueNum = getValueNum();
  const valueNumInMemory = parseFloat(valueStrInMemory);
  let newValueNum;
  if (operatorInMemory === 'addition') {
    newValueNum = valueNumInMemory + currentValueNum;
  } else if (operatorInMemory === 'subtraction') {
    newValueNum = valueNumInMemory - currentValueNum;
  } else if (operatorInMemory === 'multiplication') {
    newValueNum = valueNumInMemory * currentValueNum;
  } else if (operatorInMemory === 'division') {
    newValueNum = valueNumInMemory / currentValueNum;
  }
  return newValueNum.toString();
};

const handleOperatorClick = operation => {
  const currentValueStr = getValueStr();
  if (!valueStrInMemory) {
    valueStrInMemory = currentValueStr;
    operatorInMemory = operation;
    setStrValue('0');
    return;
  }
  valueStrInMemory = getResultOfOperationStr();
  operatorInMemory = operation;
  setStrValue('0');
};

// Add Event Listeners to functions
ac.addEventListener('click', () => {
  setStrValue('0');
  valueStrInMemory = null;
  operatorInMemory = null;
});
reverse.addEventListener('click', () => {
  const currentValueNum = getValueNum();
  const currentValueStr = getValueStr();

  if (currentValueStr === '-0') {
    setStrValue('0');
    return;
  }
  if (currentValueNum >= 0) {
    setStrValue('-' + currentValueStr);
  } else {
    setStrValue(currentValueStr.substring(1));
  }
});
percent.addEventListener('click', () => {
  const currentValueNum = getValueNum();
  const newValueNum = currentValueNum / 100;
  setStrValue(newValueNum.toString());
  valueStrInMemory = null;
  operatorInMemory = null;
});

// add event listeners to operators
addition.addEventListener('click', () => {
  handleOperatorClick('addition');
});
subtraction.addEventListener('click', () => {
  handleOperatorClick('subtraction');
});
multiplication.addEventListener('click', () => {
  handleOperatorClick('multiplication');
});
division.addEventListener('click', () => {
  handleOperatorClick('division');
});
equal.addEventListener('click', () => {
  if (valueStrInMemory) {
    setStrValue(getResultOfOperationStr());
    valueStrInMemory = null;
    operatorInMemory = null;
  }
});

// Add Event Listeners to numbers and decimal
for (let i = 0; i < numberArray.length; i++) {
  const numberEl = numberArray[i];
  numberEl.addEventListener('click', () => {
    handleNumberClick(i.toString());
  });
}
decimal.addEventListener('click', () => {
  const currentValueStr = getValueStr();
  if (!currentValueStr.includes('.')) {
    setStrValue(currentValueStr + '.');
  }
});

// Set up the time
const updateTime = () => {
  const currentTime = new Date();

  let currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  if (currentHour > 12) {
    currentHour -= 12;
  }
  hour.textContent = currentHour.toString();
  minute.textContent = currentMinute.toString().padStart(2, '0');
};
setInterval(updateTime, 1000);
updateTime();
