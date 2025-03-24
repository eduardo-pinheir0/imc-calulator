var patients = document.querySelectorAll(".paciente");

for (var i = 0; i < patients.length; i++) {
  var patient = patients[i];

  let tdWeight = patient.querySelector(".info-peso");
  let weight = tdWeight.textContent;

  let tdHeight = patient.querySelector(".info-altura");
  let height = tdHeight.textContent;

  let tdImc = patient.querySelector(".info-imc");

  var isValidWeight = weightIsValid(weight);
  var isValidHeight = heightIsValid(height);

  if (!isValidWeight) {
    isValidWeight = false;
    tdImc.textContent = "Peso inválido.";
    patient.classList.add("paciente-invalido");
  }

  if (!isValidHeight) {
    isValidHeight = false;
    tdImc.textContent = "Altura inválida.";
    patient.classList.add("paciente-invalido");
  }

  if (isValidHeight && isValidWeight) {
    const imc = imcCalculate(weight, height);
    tdImc.textContent = imc;
  }
}

function weightIsValid(weight) {
  if (weight >= 0 && weight < 1000) {
    return true;
  } else {
    return false;
  }
}

function heightIsValid(height) {
  if (height >= 0 && height <= 3.0) {
    return true;
  } else {
    return false;
  }
}

function imcCalculate(weight, height) {
  let imc = 0;
  imc = weight / (height * height);
  return imc.toFixed(2);
}
