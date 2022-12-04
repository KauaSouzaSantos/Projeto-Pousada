const suite = document.getElementById("suite");
const hospedes = document.getElementById("qtdHospedes");
const checkIn = document.getElementById("check-in");
const checkOut = document.getElementById("check-out");
const rdRefeicao = document.querySelectorAll("input[name='rdRefeicao']");
const optionRadio = document.getElementById("option-radio");
const reservContainer = document.querySelector(".reserv-container");
const resumeContainer = document.querySelector(".resume-container");
const cbSvAdicional = document.querySelectorAll(".cbSvAdicional");
const cbSvAdicionalText = document.querySelectorAll(".cbSvAdicionalText");
const resumeSuiteImage = document.getElementById("suite-image");

function reservar() {
  limpar();
  verificarInputs();
  calcular();
  irResumo();

  const formControls = form.querySelectorAll(".form-control");
  const formValido = [...formControls].every(function (formControl) {
    return formControl.className === "form-control success";
  });
  if (formValido) {
    travar();
  }
}

function cancelar() {
  voltarResumo();
  destravar();
}

function confirmar() {
  const confirmDiv = document.getElementById("confirm");
  const confirmIcon = document.getElementById("confirm-icon");
  const confirmText = document.getElementById("confirm-text");

  resumeContainer.style.display = "none";
  reservContainer.style.display = "none";
  confirmDiv.style.zIndex = "2";
  confirmDiv.style.opacity = "1";
  confirmIcon.style.transform = "translateY(-150px)";
  confirmIcon.style.fontSize = "150px";
  setTimeout(() => {
    confirmText.style.opacity = "1";
  }, 1500);
  for (i = 360; i >= 0; i--) {
    console.log(`Rotacionei: ${i} deg`);
    confirmIcon.className = `fas fa-check-circle fa-rotate-${i}`;
  }
}

function calcular() {
  let total = 0;

  const txtTotal = document.getElementById("txtTotal");
  const txtSuite = document.getElementById("txtSuite");
  const txtSuiteValor = document.getElementById("txtsuiteValor");
  const suiteSelecionada = suite.selectedIndex - 1;

  let suites = [
    "Ocean Master",
    "Ocean Basic",
    "Shiny Lake",
    "Soft Sea",
    "Blue River",
  ];
  let suiteImagem = [
    "url(../images/Ocean-Master.png)",
    "url(../images/Ocean-Basic.png)",
    "url(../images/Shiny-Lake.png)",
    "url(../images/Soft-Sea.png)",
    "url(../images/Blue-River.png)",
  ];
  let suitesValores = [934, 628.9, 734, 526.48, 552.71];

  txtSuite.textContent = suites[suiteSelecionada];
  resumeSuiteImage.style.backgroundImage = suiteImagem[suiteSelecionada];
  txtSuiteValor.textContent = suitesValores[suiteSelecionada];
  total = suitesValores[suiteSelecionada];

  const txtHospedes = document.getElementById("txtHospedes");
  const hospedesValor = document.getElementById("hospedesValor");
  const qtdHospedes = hospedes.value;

  txtHospedes.textContent = qtdHospedes;

  hospedesValor.textContent = qtdHospedes * 200;
  total += qtdHospedes * 200;

  const diasEstadia = estadia();
  const txtEstadia = document.getElementById("txtEstadia");
  const txtEstadiaValor = document.getElementById("estadiaValor");

  txtEstadia.textContent = diasEstadia;
  txtEstadiaValor.textContent = diasEstadia * 150;
  total += diasEstadia * 150;

  const txtRefeicao = document.getElementById("txtRefeicao");
  const txtRefeicaoValor = document.getElementById("refeicaoValor");

  let refeicoes = ["Café da Manhã", "Meia Pensão", "Pensão completa"];
  let refeicaoValores = [100, 150, 250];

  for (let i = 0; i < rdRefeicao.length; i++) {
    if (rdRefeicao[i].checked) {
      txtRefeicao.textContent = refeicoes[i];
      txtRefeicaoValor.textContent = refeicaoValores[i];
      total += refeicaoValores[i];
      break;
    }
  }

  const txtSvAdicional = document.getElementById("txtSvAdicional");
  let svAdicionais = ["Traslado", "City Tour", "Passeio"];
  let svAdicionaisValores = [100, 150, 250];

  for (let i = 0; i < cbSvAdicional.length; i++) {
    if (cbSvAdicional[i].checked) {
      txtSvAdicional.textContent += `${svAdicionais[i]} `;
      total += svAdicionaisValores[i];
    }
  }

  if (txtSvAdicional.textContent == "") {
    txtSvAdicional.style.fontStyle = "italic";
    txtSvAdicional.textContent = "Nenhum Serviço foi selecionado...";
  }
  txtTotal.textContent = total;
}

function estadia() {
  // Calcula o tempo em dias de estadia
  const entrada = new Date(checkIn.value);
  const saida = new Date(checkOut.value);
  return (saida - entrada) / (1000 * 60 * 60 * 24);
}

function limpar() {
  // Limpa os valores dos inputs e selects
  const resumeContainerSpan = document.querySelectorAll("span");
  resumeSuiteImage.style.backgroundImage = "";
  resumeContainerSpan.forEach((span) => {
    span.textContent = "";
  });
}

function travar() {
  // Trava os inputs e selects do container de reserva quando o container de resumo está ativo
  const allInputs = document.querySelectorAll("input, select");

  allInputs.forEach((input) => {
    if (input.value != "Confirmar" && input.value != "Cancelar") {
      input.setAttribute("disabled", "disabled");
    }

    if (input.value == "Fazer Reserva") {
      input.style.cursor = "default";
    }
  });
}

function destravar() {
  // Destrava os inputs e selects do container de reserva depois que o botão de cancelar é apertado
  const allInputs = document.querySelectorAll("input, select");

  allInputs.forEach((input) => {
    if (input.value != "Confirmar" && input.value != "Cancelar") {
      input.removeAttribute("disabled");
    }
    if (input.value == "Fazer Reserva") {
      input.style.cursor = "pointer";
    }
  });
}

function verificarInputs() {
  // Verifica todos os inputs e selects do formulario se são válidos ou não

  if (suite.selectedIndex == "") {
    erroPara(suite, "Por favor, selecione uma suíte");
  } else {
    sucessoPara(suite);
  }

  if (hospedes.value == "" || hospedes.value <= 0) {
    erroPara(hospedes, "A quantidade de hospedes é inválida: Mínimo = 1");
  } else if (hospedes.value > 10) {
    erroPara(hospedes, "A quantidade de hospedes foi excedida: Máximo = 10");
  } else {
    sucessoPara(hospedes);
  }

  if (estadia() <= 0 || estadia() >= 365) {
    erroPara(checkIn, "As datas não podem ser...");
    erroPara(checkOut, "menores ou iguais a 0");
  } else {
    if (checkIn.value == "") {
      erroPara(checkIn, "Informe uma data de Check-In");
    } else {
      sucessoPara(checkIn);
    }

    if (checkOut.value == "") {
      erroPara(checkOut, "Informe uma data de Check-Out");
    } else {
      sucessoPara(checkOut);
    }
  }

  for (let i = 0; i < rdRefeicao.length; i++) {
    if (rdRefeicao[i].checked) {
      sucessoPara(optionRadio);
      break;
    } else {
      erroPara(optionRadio, "Escolha uma opção");
    }
  }
}

function erroPara(input, message) {
  // Retorna classe de erro para inputs ou select
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  formControl.className = "form-control error";
}

function sucessoPara(input) {
  // Retorna classe de sucesso para inputs ou selects
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function irResumo() {
  // Inicia a animação e apresenta o container de resumo
  const formControls = form.querySelectorAll(".form-control");
  const formValido = [...formControls].every(function (formControl) {
    return formControl.className === "form-control success";
  });
  if (formValido) {
    reservContainer.style.transform = "translatex(-15vw) rotate(-5deg)";
    reservContainer.style.opacity = "0.1";
    resumeContainer.style.transform = "translatex(5vw)";
    resumeContainer.style.opacity = "1";
    resumeContainer.style.zIndex = "1";
  }
}

function voltarResumo() {
  // Inicia outra animação e volta para o container de reserva
  reservContainer.style.transform = "translatex(0vw) rotate(0deg)";
  reservContainer.style.opacity = "1";
  resumeContainer.style.transform = "translatex(0vw)";
  resumeContainer.style.opacity = "0";
  resumeContainer.style.zIndex = "-1";
}
