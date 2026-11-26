function Header({ search, onSearchChange }) {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="#inicio" className="logo">
          CHECK<span>POINT</span>
        </a>

        <nav className="nav">
          <a href="#inicio">Início</a>
          <a href="#catalogo">Catálogo</a>
        </nav>

        <div className="search">
          <label htmlFor="search-input" className="visually-hidden">
            Pesquisar jogo pelo nome
          </label>
          <input
            id="search-input"
            type="search"
            placeholder="Pesquisar jogo"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
