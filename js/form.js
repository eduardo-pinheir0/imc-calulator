const addButton = document.querySelector("#adicionar-paciente");

addButton.addEventListener("click", (e) => {
  e.preventDefault();

  // Seleciona o formulário
  let form = document.querySelector("#form");

  // Captura informações do formulário e cria o objeto patient
  let patient = getPatientForm(form);

  var error = patientValidate(patient);

  // Monta o paciente na tabela
  let trPatient = assembleTr(patient);

  console.log(error);
  if (error.length > 0) {
    showErrorMessages(error);
    return;
  }

  const tabela = document.querySelector("#tabela-pacientes");
  tabela.appendChild(trPatient);

  const ul = document.querySelector("#errorMessages");
  ul.innerHTML = "";
  form.reset();
});

function getPatientForm(form) {
  let patient = {
    name: form.nome.value,
    weight: form.peso.value,
    height: form.altura.value,
    fat: form.gordura.value,
    imc: imcCalculate(form.peso.value, form.altura.value),
  };
  return patient;
}

function patientValidate(patient) {
  let errors = [];

  if (patient.name.length == 0)
    errors.push('O campo "Nome" não pode ser vazio!');

  if (patient.weight.length == 0)
    errors.push('O campo "Peso" não pode ser vazio!');

  if (patient.height.length == 0)
    errors.push('O campo "Altura" não pode ser vazio!');

  if (patient.fat.length == 0)
    errors.push('O campo "% de Gordura" não pode ser vazio!');

  if (!weightIsValid(patient.weight)) errors.push("Peso Inválido!");

  if (!heightIsValid(patient.height)) errors.push("Altura Inválida!");

  return errors;
}

function showErrorMessages(errors) {
  let ul = document.querySelector("#errorMessages");
  ul.innerHTML = "";

  errors.forEach(function (e) {
    var li = document.createElement("li");
    li.textContent = e;
    ul.appendChild(li);
  });
}

// Monta um "tr" com as informações do paciente fornecidas pelo formulário
function assembleTr(patient) {
  // Cria um "tr" e atribui à ele a classe "paciente"
  let trPatient = document.createElement("tr");
  trPatient.classList.add("paciente");

  // Cria um campo filho dentro da "tr" pra cada informação do paciente
  // fornecida pelo formulário
  trPatient.appendChild(assembleTd(patient.name, "info-nome"));
  trPatient.appendChild(assembleTd(patient.weight, "info-peso"));
  trPatient.appendChild(assembleTd(patient.height, "info-altura"));
  trPatient.appendChild(assembleTd(patient.fat, "info-gordura"));
  trPatient.appendChild(assembleTd(patient.imc, "info-imc"));

  return trPatient;
}

// Monta um "td" com a classe e o conteúdo fornecidos
function assembleTd(data, className) {
  let td = document.createElement("td");
  td.textContent = data;
  td.classList.add(className);

  return td;
}
// Cria um array de erros de validação para o paciente
