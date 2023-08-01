$(function() {
    // Cargar Menu
    $("#header").load("header.html");
    // Cargar el pie de página
    $("#footer").load("footer.html");
    // Cargar Nav-Productos
    $("#Nav-Productos").load("Nav-Productos.html");

  });

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
  
  
  //Para productos agregar al carrito
  function agregarAlCarrito(nombre, precio) {
    var cart = document.querySelector('.cart');
    var item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = '<span class="name">' + nombre + '</span><span class="price">$ ' + precio.toFixed(2) + '</span>';
    var removeButton = document.createElement('button');
    removeButton.classList.add('btn');
    removeButton.textContent = 'Eliminar';
    removeButton.addEventListener('click', function() {
        quitarDelCarrito(item, precio);
        
    });
    
    var hr = document.createElement('hr');
    hr.classList.add('separador');
    

    item.appendChild(removeButton);
    cart.insertBefore(item, cart.firstChild);
    
    var totalElement = document.querySelector('.total');
    var total = parseFloat(totalElement.innerHTML.split(':')[1].trim().slice(1));
    total += precio;
    totalElement.innerHTML = 'Total: $ ' + total.toFixed(2);
    item.insertBefore(hr, removeButton);
    }
//Para productos quitar producto al carrito
function quitarDelCarrito(item, precio) {
    var cart = document.querySelector('.cart');
    cart.removeChild(item);

    var totalElement = document.querySelector('.total');
    var total = parseFloat(totalElement.innerHTML.split(':')[1].trim().slice(1));
    total -= precio;
    totalElement.innerHTML = 'Total: $ ' + total.toFixed(2);
    }

//Para ocultar el menu de Productos  
function toggleButton() {
var toggleButton = document.getElementById('toggleButton');
var productoscat = document.getElementById('productoscat');

toggleButton.addEventListener('click', function() {
  if (productoscat.style.display === 'none') {
    productoscat.style.display = 'block';
  } else {
    productoscat.style.display = 'none';
  }
})}