export default function LoseModal({ score, onClick }) {
  return (
    <div className="modal">
      <h2>Oops! You Lost 😢</h2>
      <p>You clicked the same Pokémon twice.</p>
      <p>Your Score: {score} — Try again and beat your high score!</p>
      <button type="button" onClick={onClick}>
        Try Again
      </button>
    </div>
  );
}
