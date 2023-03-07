const inputEmReal = document.getElementById("valorEmReal");
const inputEmDolar = document.getElementById("valorEmDolar");
const inputEmEuro = document.getElementById("valorEmEuro");
const inputEmBitcoin = document.getElementById("valorEmBitcoin");

const botaoConverterDoReal = document.getElementById("converterDoReal");
const botaoConverterDoDolar = document.getElementById("converterDoDolar");
const botaoConverterDoEuro = document.getElementById("converterDoEuro");
const botaoConverterDoBitcoin = document.getElementById("converterDoBitcoin");

let cambioDolarReal = 0;
let cambioEuroReal = 0;
let cambioBitcoinReal = 0;

fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
    .then((response) => response.json())
    .then((data) => {
        cambioDolarReal = Number(data.USDBRL.high);
        inputEmDolar.placeholder = `$ ${(1 / cambioDolarReal).toFixed(2)}`;
    });

fetch("https://economia.awesomeapi.com.br/json/last/EUR-BRL")
    .then((response) => response.json())
    .then((data) => {
        cambioEuroReal = Number(data.EURBRL.high);
        inputEmEuro.placeholder = `€ ${(1 / cambioEuroReal).toFixed(2)}`;
    });

fetch("https://economia.awesomeapi.com.br/json/last/BTC-BRL")
    .then((response) => response.json())
    .then((data) => {
        cambioBitcoinReal = Number(data.BTCBRL.high) * 1000;
        inputEmBitcoin.placeholder = `₿ ${(1 / cambioBitcoinReal).toFixed(4)}`;
    });

function converterDoReal() {
    if (inputEmReal.value != "") {
        inputEmDolar.value = (Number(inputEmReal.value) / cambioDolarReal).toFixed(
            2
        );
        inputEmEuro.value = (Number(inputEmReal.value) / cambioEuroReal).toFixed(2);
        inputEmBitcoin.value = (
            Number(inputEmReal.value) / cambioBitcoinReal
        ).toFixed(4);
        formatarTudo();
    }
}

function converterDoDolar() {
    if (inputEmDolar.value != "") {
        inputEmReal.value = (Number(inputEmDolar.value) * cambioDolarReal).toFixed(
            2
        );
        inputEmEuro.value = (
            (Number(inputEmDolar.value) * cambioDolarReal) /
            cambioEuroReal
        ).toFixed(2);
        inputEmBitcoin.value = (
            (Number(inputEmDolar.value) * cambioDolarReal) /
            cambioBitcoinReal
        ).toFixed(4);
        formatarTudo();
    }
}

function converterDoEuro() {
    if (inputEmEuro.value != "") {
        inputEmReal.value = (Number(inputEmEuro.value) * cambioEuroReal).toFixed(2);
        inputEmDolar.value = (
            (Number(inputEmEuro.value) * cambioEuroReal) /
            cambioDolarReal
        ).toFixed(2);
        inputEmBitcoin.value = (
            (Number(inputEmEuro.value) * cambioEuroReal) /
            cambioBitcoinReal
        ).toFixed(4);
        formatarTudo();
    }
}

function converterDoBitcoin() {
    if (inputEmBitcoin.value != "") {
        inputEmReal.value = (
            Number(inputEmBitcoin.value) * cambioBitcoinReal
        ).toFixed(2);
        inputEmDolar.value = (
            (Number(inputEmBitcoin.value) * cambioBitcoinReal) /
            cambioDolarReal
        ).toFixed(2);
        inputEmEuro.value = (
            (Number(inputEmBitcoin.value) * cambioBitcoinReal) /
            cambioEuroReal
        ).toFixed(2);
        formatarTudo();
    }
}

const formatterBRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
});

const formatterUSD = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
});

const formatterEUR = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2
});

function formatarTudo() {
    inputEmReal.value = formatterBRL.format(inputEmReal.value);
    inputEmDolar.value = formatterUSD.format(inputEmDolar.value);
    inputEmEuro.value = formatterEUR.format(inputEmEuro.value);
    inputEmBitcoin.value = `₿ ${Number(inputEmBitcoin.value).toFixed(4)}`.replace(
        ".",
        ","
    );
}
