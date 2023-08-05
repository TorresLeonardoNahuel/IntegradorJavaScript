//   Para el Boton de Editar y Guardar en Mi Cuenta
function habilitarEdicion() {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type !== "button") {
        inputs[i].removeAttribute("disabled");
      }
    }

    document.querySelector('input[value="Editar"]').style.display = "none";
    document.querySelector('input[value="Guardar"]').style.display = "inline-block";
  }

  function deshabilitarEdicion() {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type !== "button") {
        inputs[i].setAttribute("disabled", "disabled");
      }
    }

    document.querySelector('input[value="Editar"]').style.display = "inline-block";
    document.querySelector('input[value="Guardar"]').style.display = "none";
  
  }