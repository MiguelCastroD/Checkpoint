function Filters({
  genres,
  platforms,
  selectedGenre,
  selectedPlatform,
  onGenreChange,
  onPlatformChange,
  onClear,
  disabled
}) {
  return (
    <div className="filters">
      <div className="field">
        <label htmlFor="genre-select">Gênero</label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={(event) => onGenreChange(event.target.value)}
          disabled={disabled}
        >
          <option value="">Todos os gêneros</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="platform-select">Plataforma</label>
        <select
          id="platform-select"
          value={selectedPlatform}
          onChange={(event) => onPlatformChange(event.target.value)}
          disabled={disabled}
        >
          <option value="">Todas as plataformas</option>
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>

      <button type="button" className="button" onClick={onClear} disabled={disabled}>
        Limpar tudo
      </button>
    </div>
  );
}

export default Filters;
