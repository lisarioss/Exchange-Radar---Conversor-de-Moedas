# 💱 Exchange Radar

Aplicação web para **conversão de moedas em tempo real**, consumindo **APIs externas**, com atualização automática de cotações e integração com **criptomoedas (Bitcoin)**.

Projeto desenvolvido com foco em **boas práticas front-end**, consumo de APIs REST e organização visual de dashboard.

---

## 🚀 Funcionalidades

- Conversão entre moedas tradicionais (BRL, USD, EUR, GBP)
- Conversão entre **Real ↔ Bitcoin**
- Cotações atualizadas automaticamente a cada 60 segundos
- Indicador visual de variação (🔼 🔽)
- Interface limpa, responsiva e organizada em layout de dashboard
- Ícones SVG nítidos e dinâmicos

---

## 🧠 Tecnologias Utilizadas

- **HTML5** – Estrutura semântica
- **CSS3** – Layout, responsividade e estilização
- **JavaScript (ES6+)**
  - Manipulação do DOM
  - Funções assíncronas (`async/await`)
  - Consumo de APIs externas
- **APIs**
  - ExchangeRate API (moedas tradicionais)
  - CoinGecko API (Bitcoin)

---

## 🔌 APIs Consumidas

### 🔹 ExchangeRate API
Utilizada para obter taxas de câmbio entre moedas fiduciárias: https://api.exchangerate-api.com/v4/latest/BRL


### 🔹 CoinGecko API
Utilizada para cotação do Bitcoin em tempo real: https://api.coingecko.com/api/v3/simple/price

---

## ⚙️ Como Funciona

1. O usuário informa o valor e seleciona as moedas de origem e destino.
2. O sistema identifica se a conversão envolve Bitcoin ou moedas tradicionais.
3. A aplicação consome a API adequada e calcula o valor convertido.
4. O resultado é exibido com animação suave.
5. A sidebar de cotações é atualizada automaticamente a cada 60 segundos.

---

## 📁 Estrutura de Pastas

exchange-radar/
│
├── index.html
├── style.css
├── script.js
│
└── assets/
└── icons/
├── real.svg
├── dollar.svg
├── euro.svg
├── pound.svg
└── bitcoin.svg

---

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido com foco em:
- Prática real de consumo de APIs
- Organização de código front-end
- Criação de um projeto de portfólio com valor para recrutadores

---

## 👩‍💻 Autora

**Lisa Rios**  
Desenvolvedora em formação, focada em evolução contínua e projetos práticos.

🔗 LinkedIn: *https://www.linkedin.com/in/lisa-rios-5681061ab/*  
🔗 GitHub: *https://github.com/lisarioss/*
