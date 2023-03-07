const numeroLetras = document.getElementById("numeroLetras");
const displayPalavra = document.getElementById("palavra");
const inputChute = document.getElementById("chute");
const displayErros = document.getElementById("erros");
const canvas = document.getElementById("canvas");
const caixaPerguntas = document.getElementById("perguntas");

const cabeca = '<img src="https://i.imgur.com/h7TwB49.png" class="cabeca">';
const coluna = '<img src="https://i.imgur.com/c7smrws.png" class="coluna">';
const bracoEsquerdo = '<img src="https://i.imgur.com/ITqoXZL.png" class="braco-esquerdo">';
const bracoDireito = '<img src="https://i.imgur.com/mpeg0Cq.png" class="braco-direito">';
const pernaEsquerda = '<img src="https://i.imgur.com/CyKbyyy.png" class="perna-esquerda">';
const pernaDireita = '<img src="https://i.imgur.com/9c9pMji.png" class="perna-direita">';

let palavra = "";
let arrayDaPalavra = [];
let arrayRevelado = [];
let arrayDosErros = [];
let erros = 0;
let letrasErradas = [];

fetch("https://api.dicionario-aberto.net/random")
    .then((response) => response.json())
    .then((data) => {
        palavra = data.word.toUpperCase();
        for (let i = 0; i < palavra.length; i++) {
            let letra = palavra[i];
            arrayDaPalavra.push(letra);
            if(letra == "-") {
                arrayRevelado.push("-")
                displayPalavra.innerHTML += "<li class='letra'>-</li>"
            } else {
                arrayRevelado.push("");
                displayPalavra.innerHTML += "<li class='letra'></li>"
            }
        }
        // console.log(arrayDaPalavra);
        numeroLetras.innerHTML = palavra.length;
    });

inputChute.onfocus = (e) => {
    inputChute.value = "";
};

inputChute.onkeyup = (e) => {
    if (inputChute.value.length > 1) {
        inputChute.value = inputChute.value[inputChute.value.length - 1].toUpperCase();
    } else if (inputChute.value.length == 1) {
        inputChute.value = e.key.toUpperCase();
    } else {
        inputChute.value = "";
    }
};

function processarChute() {
    let chute = inputChute.value;

    if (chute == '') { return };

    let acerto = arrayDaPalavra.some(element => element == chute);

    if (acerto) {
        const letras = document.getElementsByClassName('letra');
        // console.log(letras[0]);
        for (i = 0; i < palavra.length; i++) {
            if (palavra[i] == chute) {
                letras[i].innerHTML = chute;
                arrayRevelado[i] = chute;
            }
        }
        if (!arrayRevelado.some(element => element == "")) {
            fimDeJogo("vitoria");
        }

    } else {
        if (letrasErradas.some(element => element == chute)) { return }
        displayErros.innerHTML += `<li class='erro'>${chute}</li>`;
        letrasErradas.push(chute);
        erros++;
        switch (erros) {
            case 1:
                canvas.innerHTML += cabeca;
                break;
            case 2:
                canvas.innerHTML += coluna;
                break;
            case 3:
                canvas.innerHTML += bracoEsquerdo;
                break;
            case 4:
                canvas.innerHTML += bracoDireito;
                break;
            case 5:
                canvas.innerHTML += pernaEsquerda;
                break;
            case 6:
                canvas.innerHTML += pernaDireita;
                break;
        };
        if (erros == 6) {
            fimDeJogo("derrota");
        };
    };


    inputChute.value = "";
}

function fimDeJogo(condicao) {
    switch (condicao) {
        case "vitoria":
            caixaPerguntas.innerHTML = "<p class='vitoria'>Parabéns você venceu!</p>"
            break;
        case "derrota":
            caixaPerguntas.innerHTML = `<p class='derrota'>Que pena, você perdeu. A palavra era ${palavra}</p>`
            break
    }
}