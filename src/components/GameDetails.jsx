import { useEffect, useState } from "react";

function GameDetails({ game, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadDetails() {
      setLoading(true);
      setError("");
      setDetails(null);

      try {
        const response = await fetch("/api/game?id=" + game.id);

        if (!response.ok) {
          throw new Error("Resposta inválida da API: " + response.status);
        }

        const data = await response.json();

        if (!cancelled) {
          setDetails(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Não foi possível carregar a descrição completa.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDetails();

    return () => {
      cancelled = true;
    };
  }, [game.id]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const description = details ? details.description : game.short_description;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Fechar detalhes">
          Fechar
        </button>

        <img className="modal-image" src={game.thumbnail} alt={"Capa do jogo " + game.title} />

        <div className="modal-content">
          <h2 id="modal-title">{game.title}</h2>

          <dl className="modal-info">
            <div>
              <dt>Gênero</dt>
              <dd>{game.genre}</dd>
            </div>
            <div>
              <dt>Plataforma</dt>
              <dd>{game.platform}</dd>
            </div>
            <div>
              <dt>Desenvolvedora</dt>
              <dd>{game.developer}</dd>
            </div>
            <div>
              <dt>Lançamento</dt>
              <dd>{game.release_date}</dd>
            </div>
          </dl>

          {loading && <p className="modal-status">Carregando descrição completa...</p>}
          {error && <p className="modal-status">{error}</p>}

          <p className="modal-description">{description}</p>

          <a className="button button-dark" href={game.game_url} target="_blank" rel="noreferrer">
            Acessar página oficial
          </a>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
