'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const getcountryDate = function (country) {
  const request = new XMLHttpRequest();

  request.open(
    'GET',
    `https://restcountries.com/v3.1/name/${country}?fullText=true`
  );

  request.send();
  console.log(request.responseText);

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data); //use this to study the data you want to use.

    const languages = Object.values(data.languages);
    const currencies = Object.values(data.currencies);

    const html = `
  <article class="country">
        <img class="country__img" src= "${data.flags.svg}">
        <div class="country__data">
            <h3 class="country__name"> ${data.name.official}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              data.population / 1000000
            ).toFixed(1)} million</p>         
            <p class="country__row"><span>🗣️</span>
            ${languages + ` ,`[0]}
            </p>
            <p class="country__row"><span>💰</span>${currencies[0].name}</p>
        </div>
</article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getcountryDate('Somalia');

