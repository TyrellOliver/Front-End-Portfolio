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
          const pokeData = data.name;
          const mainDiv = document.querySelector(".main-div");
          const pokeTypes = document.querySelectorAll(".poke");
          pokeTypes.addEventListener("click", () => {
            mainDiv.appendChild(pokeData)
          });
        });
    });
  })
  .catch((error) => {
    console.log("Error fetching data: ", error);
  });
// console.log(fireTypePromise);
