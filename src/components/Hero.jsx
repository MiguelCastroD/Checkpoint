function Hero({ total, loading }) {
  return (
    <section className="hero" id="inicio">
      <div className="hero-text">
        <p className="hero-label">Catálogo independente</p>
        <h1>Jogos gratuitos para quem gosta de descobrir.</h1>
        <p className="hero-description">
          O CHECKPOINT reúne jogos free-to-play de PC e navegador. Pesquise pelo nome,
          filtre por gênero e plataforma e abra os detalhes antes de decidir o que jogar.
        </p>
        <a href="#catalogo" className="button button-dark">
          Ver catálogo
        </a>
      </div>

      <div className="hero-counter">
        <span className="hero-number">{loading ? "..." : total}</span>
        <span className="hero-number-label">jogos disponíveis</span>
      </div>
    </section>
  );
}

export default Hero;
