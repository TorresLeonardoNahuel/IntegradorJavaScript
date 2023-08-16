function ocultarFormularioEdicion() {
    // Restaurar el formulario a su estado original
    qys("#name").value = "";
    qys("#price").value = "";
    qys("#discount").value = "";
    qys("#category").value = "";
    qys("#description").value = "";
    modal.style.visibility = "hidden";
    btnModalCrear.style.visibility = "hidden";
    btnModalActualizar.style.visibility = "hidden";
}

// Función para cargar los datos del producto en el formulario de edición
function cargarProductoEditado( producto) {
    const name = qys("#name").value;
    const price = parseInt(qys("#price").value,10);
    const discount = parseInt(qys("#discount").value,10);
    const category = qys("#category").value;
    const description = qys("#description").value;
    const imagenFile = qys("#imagen").files[0]; // Obtener el archivo seleccionado
    //console.log(name,price,discount,category,description,imagenFile);
    // Crear un objeto FormData para enviar los datos y la imagen al servidor
    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append(`category`, category);
    formData.append("description", description);
    formData.append("imagen", imagenFile);

    console.log(formData.get('name'), formData.get('price'), formData.get('discount'), formData.get('category'), formData.get('description'))

    let option = {
      method: "PUT",
      headers: {
        user: "admin",
        pass: "123456",
      },
      body: formData,
    };
    console.log(option);
    fetch(apiUrl + producto._id, option)
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        // Limpiar el formulario después de crear el producto
        if (data.validaciones) {
          let aviso = ""; // Inicializar la variable 'aviso'
          data.validaciones.forEach((error) => {
            aviso += error.msg + "\n"; // Agregar cada mensaje de error con un salto de línea
          });
          console.log(aviso);
          swal({
            icon: "error",
            title: "Error",
            text: aviso,
          });
        } else {
          console.log("Producto Actualizado:", data);
          qys("#name").value = "";
          qys("#price").value = "";
          qys("#discount").value = "";
          qys("#category").value = "";
          qys("#description").value = "";
          // Actualizar la lista de productos
          
          swal({
            icon: "success",
            title: "Producto Actualizado",
            text: "Se Actualizaron los datos del Producto Correctamente",
          });
          ocultarFormularioEdicion();
          cargarProductos(apiUrl, mostrarProductos, productosBody);
        }
      })
      .catch((error) => {
        console.error("Error al Actualizar el producto:", error);
      });

}
// Función para mostrar el formulario de edición
function mostrarFormularioEdicion(producto) {
    let enviarProducto = producto;
    modal.style.visibility = "visible";
    btnModalCrear.style.visibility = "hidden";
    btnModalActualizar.style.visibility = "visible";
    qys("#name").value = producto.name
    qys("#price").value = producto.price
    qys("#discount").value = producto.discount
    qys("#category").value = producto.category
    qys("#description").value = producto.description
    qys("#preViewsImg").innerHTML = `
    <img src="http://localhost:3000/images/products/${producto.image}" alt="${producto.image}"></img>`
    
    cargarImagen.addEventListener('click', function(){
        qys("#preViewsImg").innerHTML = '';
    })
    btnModalActualizar.addEventListener("click", function (event) {
      event.preventDefault();
    cargarProductoEditado(enviarProducto);
    })

}

// Función para ocultar el formulario de edición

function editarProducto(button){
    const id = button.getAttribute('data-productid');
    
        fetch(apiUrl + id)
          .then((response) => response.json())
          .then((data) => {
            mostrarFormularioEdicion(data);
        })
          .catch((error) => console.error('Error al cargar los productos:', error));
    
}
src="../../js/index.js"
src="../../js/productos/listar.js" 
