export default function Scoreboard({ score, bestScore }) {
  return (
    <>
      <h2>
        Score: {score}
        <span style={{ marginLeft: "20px" }}></span>Best Score: {bestScore}
      </h2>
    </>
  );
}
