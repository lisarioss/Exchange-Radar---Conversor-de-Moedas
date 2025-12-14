// ---------------- ELEMENTOS ----------------
const btn = document.getElementById("converter");
const valorInput = document.getElementById("valor");
const origemSelect = document.getElementById("moeda-origem");
const destinoSelect = document.getElementById("moeda-destino");

const iconeOrigem = document.getElementById("icone-origem");
const iconeDestino = document.getElementById("icone-destino");

const resultadoCard = document.getElementById("resultado");
const resultadoTexto = document.getElementById("resultado-texto");

// ---------------- ÍCONES ----------------
const icones = {
  BRL: "assets/icons/real.svg",
  USD: "assets/icons/dollar.svg",
  EUR: "assets/icons/euro.svg",
  GBP: "assets/icons/pound.svg",
  BTC: "assets/icons/bitcoin.svg"
};

origemSelect.onchange = () => iconeOrigem.src = icones[origemSelect.value];
destinoSelect.onchange = () => iconeDestino.src = icones[destinoSelect.value];

// ---------------- CONVERSÃO ----------------
btn.onclick = async () => {
  const valor = Number(valorInput.value);
  const origem = origemSelect.value;
  const destino = destinoSelect.value;

  if (!valor || valor <= 0) {
    mostrar("Digite um valor válido");
    return;
  }

  try {
    // BTC ↔ BRL
    if (origem === "BTC" || destino === "BTC") {
      const r = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl"
      );
      const d = await r.json();
      const precoBTC = d.bitcoin.brl;

      if (origem === "BTC") {
        mostrar(`≈ R$ ${(valor * precoBTC).toLocaleString("pt-BR")}`);
      } else {
        mostrar(`≈ ${(valor / precoBTC).toFixed(6)} BTC`);
      }
      return;
    }

    // Moedas tradicionais
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${origem}`);
    const data = await res.json();
    const convertido = (valor * data.rates[destino]).toFixed(2);

    mostrar(`${convertido} ${destino}`);

  } catch {
    mostrar("Erro ao converter");
  }
};

function mostrar(texto) {
  resultadoTexto.innerHTML = texto;
  resultadoCard.classList.remove("oculto");
  setTimeout(() => resultadoCard.classList.add("visivel"), 10);
}

// ---------------- COTAÇÕES SIDEBAR ----------------
let anteriores = {};

async function carregarCotacoes() {
  try {
    // FIAT
    const r = await fetch("https://api.exchangerate-api.com/v4/latest/BRL");
    const d = await r.json();

    atualizar("USD", d.rates.USD, "usd-brl", "usd-var");
    atualizar("EUR", d.rates.EUR, "eur-brl", "eur-var");
    atualizar("GBP", d.rates.GBP, "gbp-brl", "gbp-var");

    // BITCOIN
    const btc = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl"
    );
    const btcData = await btc.json();
    atualizarBTC(btcData.bitcoin.brl);

  } catch (e) {
    console.error("Erro ao carregar cotações", e);
  }
}

function atualizar(moeda, taxa, idValor, idVar) {
  const valorAtual = Number((1 / taxa).toFixed(2));
  const valorAnterior = anteriores[moeda];

  const elValor = document.getElementById(idValor);
  const elVar = document.getElementById(idVar);

  elValor.innerText = `R$ ${valorAtual.toFixed(2)}`;

  if (valorAnterior !== undefined) {
    if (valorAtual > valorAnterior) {
      elVar.textContent = "🔼";
      elVar.className = "variacao subiu";
    } else if (valorAtual < valorAnterior) {
      elVar.textContent = "🔽";
      elVar.className = "variacao caiu";
    } else {
      elVar.textContent = "—";
    }
  }

  anteriores[moeda] = valorAtual;
}

function atualizarBTC(valorAtual) {
  const elValor = document.getElementById("btc-brl");
  const elVar = document.getElementById("btc-var");
  const valorAnterior = anteriores.BTC;

  elValor.innerText = `R$ ${valorAtual.toLocaleString("pt-BR")}`;

  if (valorAnterior !== undefined) {
    if (valorAtual > valorAnterior) {
      elVar.textContent = "🔼";
      elVar.className = "variacao subiu";
    } else if (valorAtual < valorAnterior) {
      elVar.textContent = "🔽";
      elVar.className = "variacao caiu";
    } else {
      elVar.textContent = "—";
    }
  }

  anteriores.BTC = valorAtual;
}

// inicial + atualização
carregarCotacoes();
setInterval(carregarCotacoes, 60000);
