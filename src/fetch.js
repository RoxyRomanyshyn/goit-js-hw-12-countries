const BASE = 'https://restcountries.eu/rest/v2/name/';

export default function resApi(search, callBack) {
  fetch(BASE + search)
    .then(j => j.json())
    .then(d => callBack(d));
}
// console.log(BASE);
