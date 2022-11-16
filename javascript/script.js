/****** STRICT mode ON *******/
'use strict';

const changeRate = () => {
  const currencyOneDropDownEl = document.querySelector('#currency-one');
  const currencyTwoDropDownEl = document.querySelector('#currency-two');
  const amountOneInputEl = document.querySelector('#amount-one');
  const amountTwoInputEl = document.querySelector('#amount-two');
  const swapBtn = document.querySelector('.btn');
  const rateEl = document.querySelector('#rate');

  /*
  *********************************
  FUNCTIONS
  *********************************
  */

  const calculateRate = () => {
    const currencyOne = currencyOneDropDownEl.value;
    const currencyTwo = currencyTwoDropDownEl.value;

    fetch(`https://v6.exchangerate-api.com/v6/b3b4584bb311b9d9f00ddb35/latest/${currencyOne}`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.conversion_rates[currencyTwo];

        rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

        amountTwoInputEl.value = (amountOneInputEl.value * rate).toFixed(2);
      });
  };
  calculateRate();

  /*
  *********************************
  EVENT LISTENERS
  *********************************
  */

  currencyOneDropDownEl.addEventListener('change', calculateRate);
  amountOneInputEl.addEventListener('input', calculateRate);
  currencyTwoDropDownEl.addEventListener('change', calculateRate);
  amountTwoInputEl.addEventListener('input', calculateRate);
  swapBtn.addEventListener('click', () => {
    const temp = currencyOneDropDownEl.value;
    currencyOneDropDownEl.value = currencyTwoDropDownEl.value;
    currencyTwoDropDownEl.value = temp;

    calculateRate();
  });
};

changeRate();

/*
*********************************
NOTES
*********************************
*/

//////////////////////////////////////
// Getting a value from a select element (Drop Down)
// const selectElementValue = selectElementName.options[selectElementName.selectedIndex].value;

//////////////////////////////////////
// Instantly getting an input value after a change
// amountOneInputEl.addEventListener('input', () => {});
