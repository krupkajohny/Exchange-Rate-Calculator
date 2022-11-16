/****** STRICT mode ON *******/
'use strict';

const changeRate = () => {
  const currencyOneDropDownEl = document.querySelector('#currency-one');
  const currencyTwoDropDownEl = document.querySelector('#currency-two');
  const amountOneInputEl = document.querySelector('#amount-one');
  const amountTwoInputEl = document.querySelector('#amount-two');
  const swapBtn = document.querySelector('.btn');

  const rate = 1.33;
  const rateEl = document.querySelector('#rate');
  rateEl.innerText = rate;

  const currenciesData = [
    {
      currencyElName: 'currencyOneDropDownEl',
      currencyName: null,
      currencyAcronymIndex: null,
      inputValue: null,
    },
    {
      currencyElName: 'currencyTwoDropDownEl',
      currencyName: null,
      currencyAcronymIndex: null,
      inputValue: null,
    },
  ];

  /*
  *********************************
  FUNCTIONS
  *********************************
  */

  const savingDropDownData = (currencyElName) => {
    const currencyPosition = currencyElName === 'currencyOneDropDownEl' ? 0 : 1;

    if (currencyPosition === 0) {
      currenciesData[currencyPosition].currencyAcronymIndex = currencyOneDropDownEl.selectedIndex;
      currenciesData[currencyPosition].currencyName = currencyOneDropDownEl.options[currencyOneDropDownEl.selectedIndex].value;
    } else {
      currenciesData[currencyPosition].currencyAcronymIndex = currencyTwoDropDownEl.selectedIndex;
      currenciesData[currencyPosition].currencyName = currencyTwoDropDownEl.options[currencyTwoDropDownEl.selectedIndex].value;
    }
  };

  const initialCurrenciesDataSaving = () => {
    savingDropDownData('currencyOneDropDownEl');
    savingDropDownData('currencyTwoDropDownEl');
  };

  const calc = () => {
    amountTwoInputEl.value = +amountOneInputEl.value * rate;
  };

  initialCurrenciesDataSaving();
  calc();

  /*
  *********************************
  EVENT LISTENERS
  *********************************
  */

  currencyOneDropDownEl.addEventListener('change', () => {
    savingDropDownData('currencyOneDropDownEl');
  });

  currencyTwoDropDownEl.addEventListener('change', () => {
    savingDropDownData('currencyTwoDropDownEl');
  });

  swapBtn.addEventListener('click', () => {
    // Swapping saved data (values, indexes) between the two currency dropdowns

    // Temporary saving data out of the original object (includes data about both currencies)
    const currencyOneData = [currenciesData[0].currencyAcronymIndex, currenciesData[0].currencyName];
    const currencyTwoData = [currenciesData[1].currencyAcronymIndex, currenciesData[1].currencyName];

    // Reversing data (inside ob the original object)
    currenciesData[0].currencyAcronymIndex = currencyTwoData[0];
    currenciesData[0].currencyName = currencyTwoData[1];

    currenciesData[1].currencyAcronymIndex = currencyOneData[0];
    currenciesData[1].currencyName = currencyOneData[1];

    // Updating UI
    currencyOneDropDownEl.selectedIndex = currenciesData[0].currencyAcronymIndex;
    currencyTwoDropDownEl.selectedIndex = currenciesData[1].currencyAcronymIndex;
    calc();
  });

  // first parameter of event listener ('input') auto updates after every change
  amountOneInputEl.addEventListener('input', () => {
    currenciesData[0].inputValue = +amountOneInputEl.value;
    calc();
  });

  // first parameter of event listener ('input') auto updates after every change
  amountTwoInputEl.addEventListener('input', () => {
    currenciesData[1].inputValue = +amountTwoInputEl.value;
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
