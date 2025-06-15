const pokemonNames = [
  "Pikachu",
  "Bulbasaur",
  "Charmander",
  "Squirtle",
  "Jigglypuff",
  "Meowth",
  "Psyduck",
  "Snorlax",
  "Eevee",
  "Gengar",
  "Machop",
  "Mewtwo",
];

export async function fetchPokemons() {
  const results = await Promise.all(
    pokemonNames.map((name) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`).then(
        (res) => res.json()
      )
    )
  );
  return results;
}
