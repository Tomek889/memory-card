export default function Card({ pokemon }) {
  return (
    <div
      className="card"
      style={{ backgroundImage: `url(${pokemon.sprites.front_default})` }}
    >
      <p>{pokemon.name}</p>
    </div>
  );
}
