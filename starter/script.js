'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
///////

function selectObjectFastindex(object) {
  return Object.values(object)[0];
}
/////////
function displayErr(message) {
  countriesContainer.insertAdjacentText(
    'beforeend',
    `get an error of ${message} 🔥🔥🔥`
  );
}

function displayDataInUi(data, clsN = '') {
  let html = ` <article class="country ${clsN}">
  <img class="country__img" src="${selectObjectFastindex(data.flags)}" />
  <div class="country__data">
    <h3 class="country__name">${selectObjectFastindex(data.name)}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} M </p>
    <p class="country__row"><span>🗣️</span>${selectObjectFastindex(
      data.languages
    )}</p>
    <p class="country__row"><span>💰</span>${
      selectObjectFastindex(data.currencies).name
    }</p>
  </div>
</article>`;
  countriesContainer.insertAdjacentHTML('afterbegin', html);
}
function getJson(url, errMessage = 'hellFuck ') {
  return fetch(url).then(responce => {
    if (!responce.ok) throw new Error(errMessage + responce.status);
    return responce.json();
  });
}
function DisplayCountry(country) {
  //counry 1
  getJson(`https://restcountries.com/v3.1/name/${country}`, 'No country Found ')
    .then(data => {
      displayDataInUi(data[0]);
      const neighbour = data[0].borders;

      if (!neighbour) throw new Error('NO neighbour');
      //country 2
      return getJson(
        `https://restcountries.com/v3.1/alpha/${neighbour[0]}`,
        'No Neighbour Found '
      );
    })
    .then(data => {
      displayDataInUi(data[0], 'neighbour');
    })
    .catch(err => {
      displayErr(err.message);
      console.log(err);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
}
let getcoords = new Promise(function (res, reject) {
  navigator.geolocation.getCurrentPosition(
    coords => res(coords.coords),
    e => {
      console.log(e);
      reject(new Error(`Can't access your location pleas allow your loaction`));
    }
  );
});

const whereAmI = async function () {
  try {
    let resGeo = await getcoords;
    let { latitude: lat, longitude: lng } = resGeo;
    let res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${lng}&key=69ff7af4a0a04d2988d7d748a7b2920d`
      // `https://geocode.xyz/${lat},${lng}?geoit=json&auth=111268179054118e15969044x110718`
    );
    // console.log(res);
    if (!res.ok)
      throw new Error('Something went wrong in response of country name');
    let data = await res.json();
    DisplayCountry(data.results[0].components.country);
    return 'done';
  } catch (err) {
    console.log(err.message);
    return err;
  }
};
whereAmI()
  .then(res => console.log(res))
  .catch(err => console.log(`Err ${err.message}`));

// (async function () {
//   try {
//     whereAmI();
//   } catch (error) {
//     console.log(error);
//   }
// })();
btn.addEventListener('click', e => {
  whereAmI();
});
// function whereAmI(lat, lng) {
//   fetch(
//     `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${lng}&key=69ff7af4a0a04d2988d7d748a7b2920d`
//     // `https://geocode.xyz/${lat},${lng}?geoit=json&auth=111268179054118e15969044x110718`
//   )
//     .then(res => {
//       if (!res.ok)
//         throw new Error(
//           `dosent connect the geocoding api status is ${res.status}`
//         );
//       return res.json();
//     })
//     .then(data => {
//       DisplayCountry(data.results[0].components.country);
//     })
//     .catch(err => {
//       console.log(err);
//       displayErr(err.message);
//     });
// }
/// get my current lang

/// create a new promise

// const lottry = new Promise(function (resolve, reject) {
//   console.log('lottry is processing');
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('You win the lottry');
//     } else {
//       reject(new Error('You loss you money'));
//     }
//   }, 2000);
// });

// lottry.then(res => console.log(res)).catch(err => console.error(err));
/////////
// function DisplayCountry(country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(responce => {
//       if (!responce.ok) throw new Error(' HellFuck ' + responce.status);
//       return responce.json();
//     })
//     .then(data => {
//       displayDataInUi(data[0]);
//       if (!data[0].borders[0]) return;
//       return fetch(
//         `https://restcountries.com/v3.1/alpha/${data[0].borders[0]}`
//       );
//     })
//     .then(responce => responce.json())
//     .then(data => {
//       displayDataInUi(data[0], 'neighbour');
//     })
//     .catch(err => displayErr(err.message))
//     .finally(() => (countriesContainer.style.opacity = 1));
// }

// let request = fetch(`https://restcountries.com/v3.1/name/bangladesh`);
// console.log(request);
// function getCuntriesData(country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(responce => {
//       if (!responce.ok) throw new Error(responce.status);

//       return responce.json();
//     })
//     .then(data => {
//       displayDataInUi(data[0]);
//       if (!data[0].borders[0]) return;
//       return fetch(
//         `https://restcountries.com/v3.1/alpha/${data[0].borders[0]}`
//       );
//     })
//     .then(response => response.json())
//     .then(data => displayDataInUi(data[0], 'neighbour'))
//     .catch(err => displayErr(err))
//     .finally(() => (countriesContainer.style.opacity = 1));
// }

// btn.addEventListener('click', getCuntriesData.bind(this, ''));

// ///////////
// // function countriesdata(country) {
// //   /// xml http request

// //   let request = new XMLHttpRequest();

// //   //// set the url and remote server location

//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

//   /// send the request

//   request.send();

//   /// callback funcion for geting some data form object of object

//   //// creating a event function for load event on data

//   request.addEventListener('load', function (e) {
//     /// getting the data and make it an object

//     let data = JSON.parse(this.responseText)[0];
//     ///// display the ui component
//     displayDataInUi(data);

//     // console.log(data);
//     let broderCountries = data.borders;
//     // console.log(broderCountries);
//     if (!broderCountries) return;
//     broderCountries.forEach(country => {
//       // console.log(country);
//       let res = new XMLHttpRequest();
//       res.open('GET', `https://restcountries.com/v3.1/alpha/${country}`);
//       res.send();
//       res.addEventListener('load', function (e) {
//         let [data] = JSON.parse(this.responseText);
//         // console.log(data);
//         ///// display the ui component
//         displayDataInUi(data, 'neighbour');
//       });
//     });
//   });
// }
// /// finally call the funciton;
// // countriesdata('bangladesh');
// // countriesdata('india');
// // countriesdata('greenland');
// // countriesdata('iceland');
// // countriesdata('pakistan');
// // countriesdata('russia');
// // countriesdata('finland');
// if (navigator.geolocation) {
//   let location = navigator.geolocation.getCurrentPosition(
//     function (loc) {
//       console.log(loc);
//     },
//     function () {}
//   );
// }

// console.log('fast one');
// setTimeout(() => {
//   console.log('last one');
// }, 0);
// Promise.resolve('Resolve ').then(res => console.log(res));
// setTimeout(() => {
//   console.log('last ');
// }, 0);
// Promise.resolve('Resolve2 ').then(res => {
//   for (let x = 0; x <= 1000; x++) {
//     console.log(res + x);
//   }
// });
// function wait(sec = 1) {
//   return new Promise(function (resolve) {
//     setTimeout(() => resolve(`I have waited for ${sec} second`), sec * 1000);
//   });
// }
// wait()
//   .then(res => {
//     console.log(res);
//     return wait(2);
//   })
//   .then(res => {
//     console.log(res);
//   });
// function wait(sec = 1) {
//   return new Promise(function (resolve) {
//     setTimeout(() => resolve(`I have waited for ${sec} second`), sec * 1000);
//   });
// }
// let img;
// function createImage(imgPath) {
//   return new Promise(function (resolve, reject) {
//     img = document.createElement('img');
//     img.src = imgPath;
//     img.addEventListener('load', function () {
//       countriesContainer.append(img);
//       countriesContainer.style.opacity = 1;
//       resolve(img);
//     });
//     img.addEventListener('error', function () {
//       reject(new Error("Cant't access the image path"));
//     });
//   });
// }
// createImage('./img/img-1.jpg')
//   .then(res => {
//     return wait(2);
//   })
//   .then(() => {
//     countriesContainer.removeChild(img);
//     return wait(2);
//   })
//   .then(() => {
//     return createImage('./img2/img-2.jpg');
//   })
//   .then(res => {
//     console.log(res);
//     return wait(2);
//   })
//   .then(() => {
//     countriesContainer.removeChild(img);
//   })
//   .catch(err => displayErr(err));
