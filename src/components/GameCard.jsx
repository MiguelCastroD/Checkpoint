function GameCard({ game, onSelect }) {
  return (
    <article className="card">
      <button type="button" className="card-button" onClick={() => onSelect(game)}>
        <img src={game.thumbnail} alt={"Capa do jogo " + game.title} loading="lazy" />
        <div className="card-body">
          <h3>{game.title}</h3>
          <p className="card-genre">{game.genre}</p>
          {game.platform && <p className="card-platform">{game.platform}</p>}
        </div>
      </button>
    </article>
  );
}

export default GameCard;
