export default function WinModal({ onClick }) {
  return (
    <div className="modal">
      <h2>You won! 🎉</h2>
      <p>You've matched all the Pokémon without repeating any. Great memory!</p>
      <p>Final Score: 12</p>
      <button type="button" onClick={onClick}>
        Play Again
      </button>
    </div>
  );
}
