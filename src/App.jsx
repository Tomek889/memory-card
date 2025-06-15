import { useEffect, useState } from "react";

import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";
import { fetchPokemons } from "./utils/fetchPokemons";
import { shuffle } from "./utils/shuffle";

import "./styles/reset.css";
import "./styles/styles.css";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [chosenPokemons, setChosenPokemons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonsApp = async () => {
      try {
        const results = await fetchPokemons();
        setPokemons(results);
      } catch (err) {
        setError("Failed to load Pokémon data.");
        console.log(err);
      }
    };
    fetchPokemonsApp();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (pokemons.length < 12) {
    return <p>Loading</p>;
  }

  function handleClick(pokemon) {
    if (chosenPokemons.includes(pokemon)) {
      setScore(0);
      setChosenPokemons([]);
    } else {
      setChosenPokemons((prev) => [...prev, pokemon]);
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore > bestScore) {
          setBestScore(newScore);
        }
        return newScore;
      });
      if (bestScore < score) {
        setBestScore(score);
      }
      if (score === 12) {
        // todo: win
      }
    }

    setPokemons(shuffle([...pokemons]));
  }

  return (
    <>
      <Scoreboard score={score} bestScore={bestScore} />
      <div className="pokemonGrid">
        {pokemons.map((pokemon) => (
          <Card
            pokemon={pokemon}
            key={pokemon.id}
            onClick={() => handleClick(pokemon)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
