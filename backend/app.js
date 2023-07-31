import express from "express";
import fetch from "node-fetch";
const app = express();
const port = 8080;

//"/api/pokemon?pokemon=charizard"
//

app.get("/api/pokemon", (req, res) => {
  //console.log(req.query.pokemon);
  const queryPokemon = req.query.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${queryPokemon}`)
    .then((res) => res.json()) //oversetter svar til json
    .then((data) => {
      //lager et objekt av dataen vi har hentet med const
      const pokemonData = {
        name: data.name,
        id: data.id,
        type: data.types.map((iterate) => iterate.type.name),
        image: data.sprites.other.home.front_default,
        height: data.height,
        weight: data.weight,
        stats: data.stats.map((iterate) => {
          return { name: iterate.stat.name, stat: iterate.base_stat };
        }),
      };
      res.send(pokemonData);
    });
  //console.log sender dataen til terminalen.
  //til slutt for å svare.
});

app.get("/api/all-pokemon", (req, res) => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=40")
    .then((response) => response.json())
    .then((data) => {
      const pokemons = data.results;
      const promiseChain = pokemons.map((pokemon) =>
        fetch(pokemon.url).then((res) => res.json())
      );

      Promise.allSettled(promiseChain).then((results) => {
        const formatedPokemonData = results.map((item) => {
          const pokemonData = {
            name: item.value.name,
            image: item.value.sprites.other.home.front_default,
            types: item.value.types.map((typesBolk) => typesBolk.type.name),
          };

          return pokemonData;
        });

        res.send(formatedPokemonData);
      });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
