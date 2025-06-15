export default function Card({ pokemon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="card"
      style={{ backgroundImage: `url(${pokemon.sprites.front_default})` }}
    >
      <p>{pokemon.name}</p>
    </div>
  );
}
