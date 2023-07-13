// console.log( fetch('https://pokeapi.co/api/v2/'))

const mainDiv = document.querySelector(".main-div");

// This fetches all of the fire type data from the pokemon api
const fireTypePromise = fetch("https://pokeapi.co/api/v2/type/10/");
fireTypePromise
  .then((fireTypeResponse) => {
    return fireTypeResponse.json(); // Turns that data into json
  })
  .then((data) => {
    // usable data that we can now use dot notation on
    console.log(data);
    data.pokemon.forEach((pokemonType) => {
      //iterates over each fire type pokemon object in the array.
      //   console.log(pokemonType);
      const pokemonPromise = fetch(pokemonType.pokemon.url); // This fetches all of the pokemon that has a fire type
      pokemonPromise
        .then((pokemonResponse) => {
          return pokemonResponse.json(); // Turns that data into json
        })
        .then((pokedata) => {
          console.log("Data for each fire type pokemon: ", pokedata); // logs the data for each fire type pokemon
          const name = pokedata.name;
          const speciesUrl = pokedata.species.url;
          const speciesPromise = fetch(speciesUrl); // Fetching the species data to get the generation and description of each pokemon
          speciesPromise
            .then((speciesResponse) => {
              return speciesResponse.json();
            })
            .then((speciesData) => {
              // The data we can use
              const generation = speciesData.generation.name; // Use dot notation to get the generation of the pokemon
              //   console.log(generation);
              const pokeImg = pokedata.sprites.front_default; // Use dot notation to get the picture of the pokemon

              const fireType = document.querySelector(".poke.two"); // Selecting the element that is being interacted with
              fireType.addEventListener("click", () => {
                // Adding a click event to it
                const mainDiv = document.querySelector(".main-div"); // Selecting the div that will house the pokemon's information
                const existingContent = mainDiv.querySelector(".poke-details");
                //// This is saying that if the pokemon's detail's that we're gonna create exists/ is true then remove it, because if you don't then all of the pokemon will show up on the page when clicked
                if (existingContent) {
                  existingContent.remove();
                }
                const pokeDetails = document.createElement("div"); // Creates a new div to have the information inside of
                pokeDetails.classList.add("poke-details"); // adds a class to that div

                const pokeImgContainer = document.createElement("div"); // Creates a div to have  the pokemon img
                pokeImgContainer.classList.add("pokemon-img");
                pokeDetails.appendChild(pokeImgContainer); // Appends or puts it in the poke-details div

                const nameElement = document.createElement("h2"); // Creating a h2 tag that's gonna have the pokemon's name
                nameElement.textContent = name;
                pokeDetails.appendChild(nameElement); // Appends or puts it in the poke-details div

                const generationElement = document.createElement("p"); // Creates a p tag that has the pokemon's generation
                generationElement.textContent = "Generation: " + generation;
                pokeDetails.appendChild(generationElement);

                const spriteImage = document.createElement("img");
                spriteImage.src = pokeImg;
                spriteImage.alt = name;
                pokeImgContainer.appendChild(spriteImage);

                mainDiv.appendChild(pokeDetails); // Appends all of the information in the pokeDetails to the mainDiv
              });
            });

          //   const fireType = document.querySelectorAll(".poke.two");
          //   fireType.addEventListener("click", () => {
          //     mainDiv.appendChild(pokeData)
          //   });
        });
    });
  })
  .catch((error) => {
    console.log("Error fetching data: ", error);
  });
// console.log(fireTypePromise);

const searchPokemon = () => {
  const pokeName = document.querySelector("#name").value;
  const pokeType = document.querySelector("#type").value;

  const createNewElement = document.createElement("div");
  createNewElement.classList.add("poke-details");
  createNewElement.innerHTML = ` 
    <h2>${pokeName}</h2>
    <p>${pokeType}</p> 
    `;
  mainDiv.appendChild(createNewElement);
};

const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", () => {
  searchPokemon();
});
