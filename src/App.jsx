import { useEffect, useState } from "react";

import Scoreboard from "./components/Scoreboard";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
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

    const fetchPokemons = async () => {
      const results = await Promise.all(
        pokemonNames.map((name) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`).then(
            (res) => res.json()
          )
        )
      );
      setPokemons(results);
    };

    fetchPokemons();
  }, []);

  if (pokemons.length < 12) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Scoreboard score={score} bestScore={bestScore} />
      <div className="pokemonGrid">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id}>
            <p>{pokemon.name}</p>
            <img src={pokemon.sprites.front_default} alt={pokemon} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
