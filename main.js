// console.log( fetch('https://pokeapi.co/api/v2/'))

const fireTypePromise = fetch("https://pokeapi.co/api/v2/type/10/");
fireTypePromise
  .then((fireTypeResponse) => {
    return fireTypeResponse.json();
  })
  .then((data) => {
    console.log(data);
    data.pokemon.forEach((pokemonType) => {
        // console.log(pokemonType);
      const pokemonPromise = fetch(pokemonType.pokemon.url);
      pokemonPromise
        .then((pokemonResponse) => {
          return pokemonResponse.json();
        })
        .then((data) => {
          console.log(data);
        });
    });
  })
  .catch((error)=>{
    console.log("Error fetching data: ", error)
  });
// console.log(fireTypePromise);
// console.log(Object.keys(fireTypePromise));

