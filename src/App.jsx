import { useEffect, useState } from "react";

import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";
import WinModal from "./components/WinModal";
import LoseModal from "./components/LoseModal";
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
  const [hasLost, setHasLost] = useState(false);
  const [hasWon, setHasWon] = useState(false);

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
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading Pokémons...</p>
      </div>
    );
  }

  function handleClick(pokemon) {
    if (chosenPokemons.includes(pokemon)) {
      setHasLost(true);
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
        setHasWon(true);
      }
    }

    setPokemons(shuffle([...pokemons]));
  }

  function handleClickLose() {
    setHasLost(false);
    setScore(0);
  }

  function handleClickWin() {
    setHasWon(false);
  }

  return (
    <>
      {hasWon && <WinModal onClick={handleClickWin} />}
      {hasLost && <LoseModal score={score} onClick={handleClickLose} />}

      <h1>Memory Card</h1>
      <h2>
        Get points by clicking on an image but don't click on any more than
        once!
      </h2>
      <Scoreboard score={score} bestScore={bestScore} />
      <div className={`pokemonGrid ${hasWon || hasLost ? "disabled" : ""}`}>
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
