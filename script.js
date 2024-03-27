'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// const getcountryDate = function (country) {
//   const request = new XMLHttpRequest();

//   request.open(
//     'GET',
//     `https://restcountries.com/v3.1/name/${country}?fullText=true`
//   );

//   request.send();
//   console.log(request.responseText);

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data); //use this to study the data you want to use.

//     const languages = Object.values(data.languages);
//     const currencies = Object.values(data.currencies);

//     const html = `
//   <article class="country">
//         <img class="country__img" src= "${data.flags.svg}">
//         <div class="country__data">
//             <h3 class="country__name"> ${data.name.official}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               data.population / 1000000
//             ).toFixed(1)} million</p>
//             <p class="country__row"><span>🗣️</span>
//             ${languages + ` ,`[0]}
//             </p>
//             <p class="country__row"><span>💰</span>${currencies[0].name}</p>
//         </div>
// </article>`;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getcountryDate('Somalia');

//neigbor counry
const renderCountry = function (data, className = '') {
  const languages = Object.values(data.languages);
  const currencies = Object.values(data.currencies);
  const html = ` <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.altSpellings[2]}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${languages[0]}</p>
      <p class="country__row"><span>💰</span>${currencies[0].name}</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

//AJAX CALL NR1
const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //Render country 1
    renderCountry(data);

    //Get Neighbour Country
    const [neighbour] = data.borders;
    console.log(neighbour);
    if (!neighbour) return;
    // AJax call 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    //nested call back hadaa doonayso inaad ogaato dalkaaga ka la jaarka ka lasii jaarkaa function kan hoose anyunbad tiem out ku xidhi doonta

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};
getCountryAndNeighbour('somalia');
