# CHECKPOINT

Catálogo de jogos gratuitos feito com React, Vite, JavaScript e CSS puro. Os jogos são carregados da API pública FreeToGame (https://www.freetogame.com/api-doc).

## Como executar

Pré-requisito: Node.js 18 ou superior (https://nodejs.org).

```bash
npm install
npm run dev
```

Depois abra o endereço mostrado no terminal, normalmente http://localhost:5173.

## Como abrir pelo VS Code

1. Extraia a pasta `checkpoint` do arquivo .zip.
2. Abra o VS Code e vá em Arquivo > Abrir Pasta, escolhendo a pasta `checkpoint`.
3. Abra o terminal com Ctrl + ' (ou Terminal > Novo Terminal).
4. Rode `npm install` e, quando terminar, `npm run dev`.
5. Clique no link http://localhost:5173 que aparece no terminal.

## Sobre a API e o proxy

O site usa dois endpoints da FreeToGame:

- `GET /api/games` para a lista de jogos.
- `GET /api/game?id={id}` para a descrição completa de um jogo.

Para evitar bloqueios de CORS no navegador, o arquivo `vite.config.js` configura um proxy: as requisições  feitas para `/api` no servidor de desenvolvimento são encaminhadas para `https://www.freetogame.com`. Por isso o projeto deve ser executado com `npm run dev`.

## Estrutura

```text
checkpoint/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Filters.jsx
│   │   ├── GameCard.jsx
│   │   └── GameDetails.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Onde estão os requisitos do trabalho

### Componentes

Ficam em `src/components/`:

- `Header.jsx`: logo, navegação e campo de pesquisa.
- `Hero.jsx`: apresentação do catálogo e contador de jogos.
- `Filters.jsx`: filtros de gênero e plataforma.
- `GameCard.jsx`: card de cada jogo.
- `GameDetails.jsx`: modal com os detalhes do jogo.

O `App.jsx` é o componente principal que une todos eles.

### Props

- `App.jsx` envia `search` e `onSearchChange` para o `Header`.
- `App.jsx` envia `total` e `loading` para o `Hero`.
- `App.jsx` envia `genres`, `platforms`, `selectedGenre`, `selectedPlatform` e as funções `onGenreChange`, `onPlatformChange` e `onClear` para o `Filters`.
- `App.jsx` envia `game` e a função `onSelect` para cada `GameCard`, que mostra título, imagem, gênero e plataforma.
- `App.jsx` envia `game` e a função `onClose` para o `GameDetails`, que mostra imagem, nome, descrição, gênero, plataforma e o link oficial.

### useState (em `App.jsx`)

- `games`: lista de jogos recebida da API.
- `loading` e `error`: mensagens de carregamento e de erro.
- `search`: texto da pesquisa.
- `selectedGenre` e `selectedPlatform`: filtros escolhidos.
- `selectedGame`: jogo aberto no modal (quando é `null`, o modal fica fechado).
- `visibleCount`: quantidade de cards exibidos antes de clicar em "Mostrar mais jogos".

Em `GameDetails.jsx`, `useState` também controla `details`, `loading` e `error` da descrição completa.

### useEffect

- `App.jsx`: busca a lista de jogos quando o site é aberto.
- `GameDetails.jsx`: busca a descrição completa do jogo selecionado e fecha o modal com a tecla Esc.

### API

As chamadas `fetch` estão em `App.jsx` (lista de jogos) e `GameDetails.jsx` (detalhes de um jogo).
