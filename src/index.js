import searchApi from './fetch.js';
import './styles.css';
import addCountry from './templates/country.hbs';
import addCountryList from './templates/countries.hbs';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import {
  alert,
  notice,
  info,
  success,
  error
} from '@pnotify/core';
import debounce from "lodash.debounce";




const countList = document.querySelector('.country-list');
const input = document.querySelector('#inp');

input.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
  countList.innerHTML = '';
  if (e.target.value) {
    searchApi(input.value, onGetData);
  }
}

function onGetData(data) {
  if (data.length === 1) {
    printCountry(data[0]);
  } else {
    if (data.length <= 10) {
      printList(data);
    } else {
      printError(data);
    }
  }
}

function printCountry(dataCountry) {
  const country = addCountry(dataCountry);
  countList.insertAdjacentHTML('beforeend', country);
}

function printList(dataCountries) {
  const countryList = dataCountries.map(elem => addCountryList(elem)).join('');
  countList.insertAdjacentHTML('beforeend', countryList);
}

function printError() {
  error({
    text: "Too many matches found. Please enter a more specific query",
  })
}
