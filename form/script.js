const nextButton = document.querySelector(".btn-next");
const prevButton = document.querySelector(".btn-prev");
const subButton = document.getElementById("btn-submit");
const steps = document.querySelectorAll(".step");
const form_steps = document.querySelectorAll(".form-step");

const partnerCheckbox = document.querySelector('input[name="check-partner"]');
const partnerNumberInput = document.querySelector('input[name="partnerID"]');

let labels = [
  "Nombre",
  "Apellido",
  "DNI",
  "Género",
  "Fecha de nacimiento",
  "Email",
  "Teléfono",
  "Ciudad",
  "Circuito",
  "Talle camiseta",
  "N° socio",
];

let talles = [
  { id: "talle_s", value: "Camiseta Talle S" },
  { id: "talle_m", value: "Camiseta Talle M" },
  { id: "talle_l", value: "Camiseta Talle L" },
  { id: "talle_xl", value: "Camiseta Talle XL" },
  { id: "talle_xxl", value: "Camiseta Talle XXL" },
];

let categories;

//! Obtenemos las categorías
async function getCategories() {
  try {
    const response = await fetch("https://api.mmrun.hvdevs.com/categories");
    // Obtenemos las categorías
    categories = await response.json();
    // Las colocamos en el select
    const selectElement = document.getElementById("category");

    // Eliminar opciones existentes
    selectElement.innerHTML = "";

    // Recorrer los datos y crear opciones
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.title; // El valor de la opción será el título de la categoría
      option.textContent = `Circuito: ${
        category.title
      } $ ${(+category.precio).toFixed(2)}`; // Texto visible para el usuario
      selectElement.appendChild(option);
    });
  } catch (error) {
    console.log(error);
  }
}
//! Llamamos la fx
getCategories();

let active = 1;

nextButton.addEventListener("click", () => {
  const inputs = document.getElementsByClassName("items");
  let next = true;
  switch (active) {
    case 1: {
      for (let i = 0; i < 7; i++) {
        if (!inputs[i].value) {
          inputs[i].classList.add("error");
          next = false;
          return;
        } else {
          inputs[i].classList.remove("error");
        }
      }
      break;
    }
    case 2: {
      for (let i = 7; i < 10; i++) {
        if (!inputs[i].value) {
          inputs[i].classList.add("error");
          next = false;
          return;
        } else {
          inputs[i].classList.remove("error");
        }
      }
      break;
    }
  }
  if (next) {
    active++;
    if (active > steps.length) {
      active = steps.length;
    }
    updateProgress();
  } else {
    Swal.fire({
      title: "¡Error!",
      text: "¡Falta completar algunos campos!",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
});

prevButton.addEventListener("click", () => {
  active--;
  if (active < 1) {
    active = 1;
  }
  updateProgress();
});

const updateProgress = () => {
  /* toggle .active class for each list item */

  steps.forEach((step, i) => {
    if (i == active - 1) {
      step.classList.add("active");
      if (form_steps[i]) {
        form_steps[i].classList.add("active");
      }
    } else {
      step.classList.remove("active");
      if (form_steps[i]) {
        form_steps[i].classList.remove("active");
      }
    }
  });

  if (active === 1) {
    prevButton.disabled = true;
  } else if (active === steps.length) {
    nextButton.disabled = true;
    showData();
  } else {
    prevButton.disabled = false;
    nextButton.disabled = false;
  }
};

updateProgress();

/* campo de texto del checkbox */

// partnerCheckbox.addEventListener("change", () => {
//   if (partnerCheckbox.checked) {
//     partnerNumberInput.disabled = false;
//   } else {
//     partnerNumberInput.disabled = true;
//     partnerNumberInput.value = "";
//   }
// });

/** @description Cada input tiene un rango de entrada, pasa al siguiente con focus */
function dateListener() {
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");

  // Función para mover el enfoque al siguiente campo de entrada
  function moveFocus(currentInput, nextInput) {
    if (currentInput.value.length === 2) {
      nextInput.focus();
    }
  }

  // Agregar event listeners a los campos de entrada
  dayInput.addEventListener("input", function () {
    moveFocus(dayInput, monthInput);
  });

  monthInput.addEventListener("input", function () {
    moveFocus(monthInput, yearInput);
  });

  yearInput.addEventListener("input", function () {
    if (yearInput.value.length === 4) {
      nextButton.focus();
    }
  });
}

dateListener();

function showData() {
  const status = document.getElementById("payment-status");
  if (status) status.remove();
  const inputs = document.getElementsByClassName("items");
  var nextEl = document.getElementById("next-element");
  var div = document.createElement("div");
  div.id = "payment-status";
  let row = document.createElement("div");
  row.className = "row";
  let j = 0;
  for (i = 0; i < inputs.length; i++) {
    let hr = document.createElement("hr");
    if (i === 0 || i === 7 || i === 10) {
      var title = document.createElement("h3");
      title.textContent =
        i === 0
          ? "Datos personales"
          : i === 7
          ? "Contacto"
          : "Datos de la inscripción";
      div.appendChild(title);
      div.appendChild(hr);
    }
    if (i !== 5 && i !== 6 && i !== 12) {
      // Crear el elemento div con la clase "col col-sm col-md col-lg"
      var col = document.createElement("div");
      col.className = "col col-sm col-md col-lg";

      // col.className = "col col-lg";

      // Crear el elemento h3 con el texto del label
      var heading = document.createElement("h3");
      heading.textContent = labels[j];
      j++;

      let talle;
      if (i === 11) {
        talle = talles.find((item) => item.id === inputs[11].value);
      }

      // Crear el elemento p con el texto del valor
      var paragraph = document.createElement("p");
      paragraph.textContent =
        i === 4
          ? inputs[i].value +
            "/" +
            inputs[i + 1].value +
            "/" +
            inputs[i + 2].value
          : i === 13
          ? inputs[12].checked
            ? inputs[13].value
            : "No aplica"
          : i === 11
          ? talle
            ? talle.value
            : "No asignado"
          : inputs[i].value;

      // Agregar los elementos al div de la columna
      col.appendChild(heading);
      col.appendChild(paragraph);

      // Agregar la columna al div de la fila
      row.appendChild(col);
      if (i === 4 || i === 9 || i === 13) {
        div.appendChild(row);
        row = document.createElement("div");
        row.className = "row";
      }
    }
  }
  const hr = document.createElement("hr");
  div.appendChild(hr);
  const total = document.createElement("div");
  total.className = "total";
  const h3 = document.createElement("h3");
  h3.textContent = "Total:";
  const p = document.createElement("p");
  var category = categories.find((item) => item.title === inputs[10].value);
  p.textContent = `$ ${
    category ? (+category.precio).toFixed(2) : "No asignado"
  }`;
  total.appendChild(h3);
  total.appendChild(p);
  div.appendChild(total);
  const hr2 = document.createElement("hr");
  div.appendChild(hr2);
  nextEl.insertAdjacentElement("afterend", div);
}

async function getFormData() {
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("no-display");
  const inputs = document.getElementsByClassName("items");
  const category = categories.find((item) => item.title === inputs[10].value);
  var formulario = document.getElementById("form");
  var formData = new FormData(formulario);
  let name = "";
  let runnerBirthDate = "";
  for (const entry of formData.entries()) {
    if (entry[0] === "firstname") name = entry[1];
    if (entry[0] === "lastname") name = name + " " + entry[1];
    if (entry[0] === "day") runnerBirthDate = entry[1];
    if (entry[0] === "month")
      runnerBirthDate = runnerBirthDate + "/" + entry[1];
    if (entry[0] === "year") runnerBirthDate = runnerBirthDate + "/" + entry[1];
  }
  formData.delete("firstname");
  formData.delete("lastname");
  formData.delete("day");
  formData.delete("month");
  formData.delete("year");
  formData.append("name", name);
  formData.append("runnerBirthDate", runnerBirthDate);

  //* Calculamos la edad
  const numbers = runnerBirthDate.split("/");
  const date = new Date(+numbers[2], +numbers[1] - 1, numbers[0]);
  const today = new Date();
  var difference = today.getTime() - date.getTime();
  var age = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
  formData.append("runnerAge", age);

  //* agregamos el item para crear la preferencia:
  //! Some random item (test only)
  formData.append("title", "MMRUN'2024");
  formData.append("description", category ? category.title : "No especificado");
  formData.append("quantity", 1);
  formData.append("currency_id", "ARS");
  formData.append("unit_price", category ? category.precio : 0);

  for (const entry of formData.entries()) {
    console.log(entry[0], entry[1]);
  }

  const url =
    "https://mp.mmrun.hvdevs.com/api/mercadopago/create-preference";

  const options = {
    method: "POST",
    body: formData,
  };

  try {
    const response = await fetch(url, options);
    spinner.classList.add("no-display");
    if (response.ok) {
      subButton.disabled = true;
      const data = await response.json();
      console.log(data.init_point);
      window.location.href = data.init_point;
    }
  } catch (error) {
    console.log(error);
    spinner.classList.add("no-display");
    subButton.disabled = false;
    Swal.fire({
      title: "Error",
      text: "Algo salió mal con la petición",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
}

function handleQueryParamChange() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get("status");
  console.log(paramValue);

  switch (paramValue) {
    case "approved": {
      Swal.fire({
        title: "Éxito",
        text: "El pago fue acreditado con éxito. Puede inscribir otro corredor, o volver a la página principal.",
        icon: "success",
        showDenyButton: true,
        confirmButtonText: "Inscribir otro corredor",
        denyButtonText: "Volver a la web principal",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "https://mmrun.com.ar/form/index.html";
        } else {
          window.location.href = "https://mmrun.com.ar/";
        }
      });
      break;
    }
    case "rejected": {
      Swal.fire({
        title: "Error",
        text: "Algo salió mal con la petición",
        icon: "error",
        confirmButtonText: "Ok",
      });
      break;
    }
  }
}

// EventListener para detectar cambios en la URL
window.addEventListener("popstate", handleQueryParamChange);

handleQueryParamChange();
