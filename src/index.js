import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const cleanInput = clean => (clean.innerHTML = '');

const inputHandler = event => {
  const textInput = event.target.value.trim();
  console.log('Text input: ', textInput);

  if (!textInput) {
    cleanInput(countryList);
    cleanInput(countryInfo);
    return;
  }

  fetchCountries(textInput)
    .then(dataList => {
      console.log('dataList', dataList);
      if (dataList.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      showResults(dataList);
    })
    .catch(error => {
      cleanInput(countryList);
      cleanInput(countryInfo);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
};

const createList = dataList => {
  return dataList
    .map(
      ({ name, flags }) =>
        `<li><img src="${flags.svg}" width = "50" height = "50">${name.common}</li>`
    )
    .join('');
};
const createInfo = dataList => {
  return dataList.map(
    ({ name, capital, population, flags, languages }) =>
      `<img src="${flags.svg}" width = "100" height = "100"><h1>${
        name.common
      }</h1>
  <p><b>Capital:</b> ${capital}</p>
  <p><b>Population:</b> ${population}</p>
  <p><b>Languages:</b> ${Object.values(languages)}</p>`
  );
};
const showResults = dataList => {
  if (dataList.length === 1) {
    cleanInput(countryList);
    const ShowInfo = createInfo(dataList);
    countryInfo.innerHTML = ShowInfo;
    console.log(ShowInfo);
  }
  cleanInput(countryInfo);
  const ShowList = createList(dataList);
  countryList.innerHTML = ShowList;
};

// console.log(fetchCountries(textInput))
// console.log('Inputhandler: ', inputHandler());

input.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));
