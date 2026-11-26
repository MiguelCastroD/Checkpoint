import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Filters from "./components/Filters.jsx";
import GameCard from "./components/GameCard.jsx";
import GameDetails from "./components/GameDetails.jsx";

const GAMES_PER_PAGE = 24;

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [visibleCount, setVisibleCount] = useState(GAMES_PER_PAGE);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadGames() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/games");

        if (!response.ok) {
          throw new Error("Resposta inválida da API: " + response.status);
        }

        const data = await response.json();

        if (!cancelled) {
          setGames(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Não foi possível carregar os jogos agora. Verifique sua conexão e tente novamente.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadGames();

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const genres = [...new Set(games.map((game) => game.genre))].sort();
  const platforms = [...new Set(games.map((game) => game.platform))].sort();

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(search.trim().toLowerCase());
    const matchesGenre = selectedGenre === "" || game.genre === selectedGenre;
    const matchesPlatform = selectedPlatform === "" || game.platform === selectedPlatform;
    return matchesSearch && matchesGenre && matchesPlatform;
  });

  const visibleGames = filteredGames.slice(0, visibleCount);

  function handleSearchChange(value) {
    setSearch(value);
    setVisibleCount(GAMES_PER_PAGE);
  }

  function handleGenreChange(value) {
    setSelectedGenre(value);
    setVisibleCount(GAMES_PER_PAGE);
  }

  function handlePlatformChange(value) {
    setSelectedPlatform(value);
    setVisibleCount(GAMES_PER_PAGE);
  }

  function clearFilters() {
    setSearch("");
    setSelectedGenre("");
    setSelectedPlatform("");
    setVisibleCount(GAMES_PER_PAGE);
  }

  function showMore() {
    setVisibleCount(visibleCount + GAMES_PER_PAGE);
  }

  return (
    <>
      <Header search={search} onSearchChange={handleSearchChange} />

      <main>
        <Hero total={games.length} loading={loading} />

        <section className="catalog" id="catalogo">
          <div className="catalog-title">
            <h2>Catálogo</h2>
            {!loading && !error && (
              <p>
                {filteredGames.length === 1
                  ? "1 jogo encontrado"
                  : filteredGames.length + " jogos encontrados"}
              </p>
            )}
          </div>

          <Filters
            genres={genres}
            platforms={platforms}
            selectedGenre={selectedGenre}
            selectedPlatform={selectedPlatform}
            onGenreChange={handleGenreChange}
            onPlatformChange={handlePlatformChange}
            onClear={clearFilters}
            disabled={loading || error !== ""}
          />

          {loading && <p className="message">Carregando jogos...</p>}

          {error && (
            <div className="message message-error">
              <p>{error}</p>
              <button type="button" className="button" onClick={() => setReloadKey(reloadKey + 1)}>
                Tentar novamente
              </button>
            </div>
          )}

          {!loading && !error && filteredGames.length === 0 && (
            <div className="message">
              <p>Nenhum jogo encontrado com esses critérios.</p>
              <button type="button" className="button" onClick={clearFilters}>
                Limpar pesquisa e filtros
              </button>
            </div>
          )}

          {!loading && !error && filteredGames.length > 0 && (
            <>
              <div className="game-grid">
                {visibleGames.map((game) => (
                  <GameCard key={game.id} game={game} onSelect={setSelectedGame} />
                ))}
              </div>

              {visibleCount < filteredGames.length && (
                <div className="more">
                  <button type="button" className="button" onClick={showMore}>
                    Mostrar mais jogos
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>CHECKPOINT é um projeto acadêmico.</p>
        <p>
          Dados fornecidos pela API{" "}
          <a href="https://www.freetogame.com/api-doc" target="_blank" rel="noreferrer">
            FreeToGame
          </a>
          .
        </p>
        <p>Desenvolvido por Miguel Castro Dias</p>
      </footer>

      {selectedGame && (
        <GameDetails game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </>
  );
}

export default App;

