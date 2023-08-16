// Función para cargar la lista de productos al cargar la página
function crearProduct() {
  modal.addEventListener("dblclick", function (event) {
    qys("#name").value = "";
    qys("#price").value = "";
    qys("#discount").value = "";
    qys("#category").value = "";
    qys("#description").value = "";
    qys("#preViewsImg").innerHTML = '';
    
    if (event.target === modal) {
      modal.style.visibility = "hidden";
      btnModalActualizar.style.visibility = "hidden";
      btnModalCrear.style.visibility = "hidden";
    }
  });
  closeModalBtn.addEventListener("click", function () {
    qys("#name").value = "";
    qys("#price").value = "";
    qys("#preViewsImg").innerHTML = '';
    qys("#discount").value = "";
    qys("#category").value = "";
    qys("#description").value = "";
    modal.style.visibility = "hidden";
    btnModalActualizar.style.visibility = "hidden";
    btnModalCrear.style.visibility = "hidden";
  });
  openModalBtn.addEventListener("click", function () {
    qys("#name").value = "";
    qys("#price").value = "";
    qys("#discount").value = "";
    qys("#category").value = "";
    qys("#description").value = "";
    modal.style.visibility = "visible";
    btnModalActualizar.style.visibility = "hidden";
    btnModalCrear.style.visibility = "visible";
  });

  btnModalCrear.addEventListener("click", function (event) {
    event.preventDefault();
    const name = qys("#name").value;
    const price = parseInt(qys("#price").value, 10);
    const discount = parseInt(qys("#discount").value, 10);
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

    //console.log(formData.get('name'), formData.get('price'), formData.get('discount'), formData.get('category'), formData.get('description'))

    let option = {
      method: "POST",
      headers: {
        user: "admin",
        pass: "123456",
      },
      body: formData,
    };
    console.log(
      option.body.get("name"),
      option.body.get("price"),
      option.body.get("discount"),
      option.body.get("category")
    );

    fetch(apiUrl, option)
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
          console.log("Producto creado:", data);
          qys("#name").value = "";
          qys("#price").value = "";
          qys("#discount").value = "";
          qys("#category").value = "";
          qys("#description").value = "";
          // Actualizar la lista de productos
          cargarProductos(apiUrl, mostrarProductos, productosBody);
          swal({
            icon: "success",
            title: "Producto Creado",
            text: "Se Creo el Nuevo Producto Correctamente",
          });
          // Cerrar el modal de crear
          $(".modal").css("visibility", "hidden");
        }
      })
      .catch((error) => {
        console.error("Error al crear el producto:", error);
      });
  });
}

src = "../../js/index.js";
src = "../../js/productos/crear.js";
