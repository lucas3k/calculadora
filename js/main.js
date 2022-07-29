"use strict";

// Pegando os elementos do DOM
const display = document.querySelector('[data-display="exibe-numero"]');
const btnNumbers = document.querySelectorAll('[data-btn^="numero"]');
const operadores = document.querySelectorAll('[data-btn^="operador-"]');
const btnIgual = document.querySelector('[data-btn="exibe-resultado-final"]');
const btnLimparDisplay = document.querySelector('[data-btn="limpar-display"]');
const btnLimparCalculo = document.querySelector('[data-btn="limpar-calculo"]');
const btnRemoverUltimoDigito = document.querySelector(
  '[data-btn="remover-ultimo-numero"]'
);
const btnInverter = document.querySelector('[data-btn="inverter"]');
const btnDecimal = document.querySelector('[data-btn="decimal"]');

// Variáveis de interação com o DOM
let novoNumero = true,
  operador,
  numeroAnterior;

// Função que atualiza o display
const atualizarDisplay = (texto) => {
  if (novoNumero) {
    display.textContent = texto.toLocaleString("BR");
    novoNumero = false;
  } else {
    display.textContent += texto.toLocaleString("BR");
  }
};

// Função que pega o valor do botão clicado e atualiza o display
const pegarNumero = (e) => {
  atualizarDisplay(+e.target.textContent);
};

// Função que faz o cálculo
const calcular = () => {
  if (operador !== undefined) {
    novoNumero = true;
    const numeroAtual = +display.textContent.replace(",", ".");
    numeroAnterior = isNaN(numeroAnterior) ? 0 : numeroAnterior;
    const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
    atualizarDisplay(resultado);
  }
};

// Função que pega o operador clicado e atualiza o display
const handleOperador = (e) => {
  if (!novoNumero) {
    calcular();
    numeroAnterior = +display.textContent.replace(",", ".");
    novoNumero = true;
  }
  operador = e.target.textContent;
};

// Chamando a função que calcula e atualiza o display com valor calculado
const handleIgualClick = () => {
  calcular();
  operador = undefined;
};

// Chamando a função que atualiza o display com valor limpo
const limparDisplay = () => (display.textContent = "");

// Chamando a função que atualiza o display com valor limpo e zera o calculo
const limparCalculo = () => {
  limparDisplay();
  operador = undefined;
  novoNumero = true;
  numeroAnterior = undefined;
};

// Função que remove o último digito do display
const removerUltimoDigito = () => {
  display.textContent = display.textContent.slice(0, -1);
};

// Função que inverte o valor do display
const inverterSinal = () => {
  novoNumero = true;
  atualizarDisplay(-display.textContent);
};

// inserindo a casa decimal no valor e atualizando o display
const inserirDecimal = () => {
  // Se o display já tiver um ponto, não faz nada
  if (!display.textContent.includes(",")) {
    // Se o display estiver vazio, adiciona 0 antes do ponto
    if (display.textContent !== "") {
      atualizarDisplay(",");
    } else {
      atualizarDisplay("0,");
    }
  } else {
    atualizarDisplay("");
  }
};

// Adicionando eventos aos botões
const inserirEvento = (tag, funcao) => {
  tag.addEventListener("click", funcao);
};

btnNumbers.forEach((btn) => inserirEvento(btn, pegarNumero));
operadores.forEach((opr) => inserirEvento(opr, handleOperador));
inserirEvento(btnIgual, handleIgualClick);
inserirEvento(btnLimparDisplay, limparDisplay);
inserirEvento(btnLimparCalculo, limparCalculo);
inserirEvento(btnRemoverUltimoDigito, removerUltimoDigito);
inserirEvento(btnInverter, inverterSinal);
inserirEvento(btnDecimal, inserirDecimal);

// Mapeando o teclado
const mapaTeclado = {
  0: 'data-btn="numero0"',
  1: 'data-btn="numero1"',
  2: 'data-btn="numero2"',
  3: 'data-btn="numero3"',
  4: 'data-btn="numero4"',
  5: 'data-btn="numero5"',
  6: 'data-btn="numero6"',
  7: 'data-btn="numero7"',
  8: 'data-btn="numero8"',
  9: 'data-btn="numero9"',
  "+": 'data-btn="operador-adicao"',
  "-": 'data-btn="operador-subtracao"',
  "*": 'data-btn="operador-multiplicacao"',
  "/": 'data-btn="operador-divisao"',
  ".": 'data-btn="decimal"',
  ",": 'data-btn="decimal"',
  "=": 'data-btn="exibe-resultado-final"',
  Enter: 'data-btn="exibe-resultado-final"',
  Backspace: 'data-btn="remover-ultimo-numero"',
  C: 'data-btn="limpar-display"',
  D: 'data-btn="limpar-calculo"',
  I: 'data-btn="inverter"',
  c: 'data-btn="limpar-display"',
  d: 'data-btn="limpar-calculo"',
  i: 'data-btn="inverter"',
};

// Função que pega o valor do teclado e atualiza o display
const mapearTeclado = (e) => {
  const tecla = e.key;
  // Se a tecla pressionada for um número, atualiza o display
  if (mapaTeclado.hasOwnProperty(tecla)) {
    // Se o display estiver vazio, adiciona o número
    document.querySelector(`[${mapaTeclado[tecla]}]`).click();
  }
};

// Adicionando evento ao teclado
document.addEventListener("keydown", mapearTeclado);
