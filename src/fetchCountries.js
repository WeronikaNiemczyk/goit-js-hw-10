export const fetchCountries = name => {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  const properties = 'fields=name,capital,population,flags,languages';
  return fetch(`${BASE_URL}${name}?${properties}`)
    .then(response => {
      // console.log(response);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const countryData = response.json();
      return countryData;
        // console.log('CountryData: ', countryData);
    })
    .then(receivedCountries => {
      //   console.log('countries: ', receivedCountries);
      return receivedCountries;
    })
    .catch(error => {
      console.error('Problem:', error);
    });
};

// console.log(fetchCountries());

// export const fetchCountries = name => {
//   const basicURL = 'https://restcountries.com/v3.1/name/';
//   const properties = 'fields=name,capital,population,flags,languages';
//   console.log(basicURL)
//   return fetch(`${basicURL}${name}?${properties}`)
//     .then(response => {
//       console.log(response);
//   if (!response.ok) {
//     throw new Error(response.status);
//   }
//   return response.json();
// })
// .then(countries => {
//   console.log('countries: ', countries);
//   return countries;
// })
// .catch(error => {
//   console.error('Problem:', error);
// });
// };
