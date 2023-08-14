const apiUrl = 'http://localhost:3000/api/1.0/productos/'; 

// Función para cargar la lista de productos al cargar la página
window.onload = function  () {
    cargarProductos();
    const modal = document.querySelector('#myModal');
    const openModalBtn = document.querySelector('#openModalBtn');
    const closeModalBtn = document.querySelector('.close');
    const productForm = document.querySelector('#productForm');


   openModalBtn.addEventListener('click', function () {
       modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('dblclick', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
   
   productForm.addEventListener('submit', function (event) {
        event.preventDefault();

        async function upload(formData) {
          let header =''
          if (formData.get('imagen')){
          header = {
              'Content-Type': 'application/x-www-form-urlencoded',          
              'user': 'admin',
              'pass': '123456'
            }
          }else{
            header = {
              'Content-Type': 'multipart/form-data',          
              'user': 'admin',
              'pass': '123456'
            }
          }
              let option ={
                method:'POST',
                headers: header,
                body: formData
              }
              console.log(option.body.get('name'), option.body.get('price'), option.body.get('discount'), option.body.get('category'));
              await fetch(apiUrl,option)
                .then(function (response) {
                  return  response.json();
              })
                .then((data) => {
                  console.log(data.validaciones);
                  // Limpiar el formulario después de crear el producto
                  if (data.validaciones.length > 0) {
                    let aviso = ""; // Inicializar la variable 'aviso'
        
                    data.validaciones.forEach((error) => {
                        aviso += error.msg + "\n"; // Agregar cada mensaje de error con un salto de línea
                    });
                    swal({
                      icon: "error"
                      ,title: "Error"
                    ,text: aviso
                    })
                  }else {
                    console.log('Producto creado:', data);
                    document.querySelector('#name').value = '';
                    document.querySelector('#price').value = '';
                    document.querySelector('#discount').value = '';
                    document.querySelector('#category').value = '';
                    document.querySelector('#description').value = '';
                    // Actualizar la lista de productos
                    cargarProductos();
                    // Cerrar el modal de crear
                    document.querySelector('#crearModal').modal('hide');
                  }
                })
              .catch((error) => {
                console.error('Error al crear el producto:', error)
              });              
      }
      const name = document.querySelector('#name').value;
      const price = document.querySelector('#price').value;
      const discount = document.querySelector('#discount').value;
      const category = document.querySelector('#category').value;
      const description = document.querySelector('#description').value;
      const imagenFile = document.querySelector("#imagen").files[0]; // Obtener el archivo seleccionado
      //console.log(name,price,discount,category,description,imagenFile);
      // Crear un objeto FormData para enviar los datos y la imagen al servidor
      const formData = new FormData();
      
      formData.append("name", name);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append(`category`, category);
      formData.append('description', description);
      formData.append('imagen', imagenFile);
      upload(formData);
      //console.log(formData.get('name'), formData.get('price'), formData.get('discount'), formData.get('category'), formData.get('description'))
        
            
      });
    };
// Función para cargar la lista de productos desde la API
function cargarProductos() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      
      mostrarProductos(data);})
    .catch((error) => console.error('Error al cargar los productos:', error));
}

// Función para mostrar los productos en la tabla
function mostrarProductos(productos) {
  const productosBody = document.querySelector('#productosBody');
  productosBody.innerHTML = '';

  productos.forEach((producto) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${producto.name}</td>
      <td>$ ${producto.price}</td>
      <td>${producto.category}</td>
      <td>${producto.description}</td>
      <td>
        <button type="button" class="btn btn-primary" onclick="editarProducto('${producto._id}')">Editar</button>
        <button type="button" class="btn btn-danger" onclick="eliminarProducto('${producto._id}')">Eliminar</button>
      </td>
    `;
    productosBody.appendChild(row);
  });
}

// Función para buscar productos por nombre
function buscarProductos() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.trim().toLowerCase();

  fetch(apiUrl + '/buscar/nombre?q=' + searchTerm)
    .then((response) => response.json())
    .then((data) => mostrarProductos(data))
    .catch((error) => console.error('Error al buscar productos:', error));
}

// Función para editar un producto
function editarProducto(id) {
  const nameInput = document.querySelector('#nombreEditar');
  const priceInput = document.querySelector('#precioEditar');
  const discountInput = document.querySelector('#descuentoEditar');
  const categoryInput = document.querySelector('#categoriaEditar');
  const descriptionInput = document.querySelector('#descripcionEditar');

  const productoActualizado = {
    name: nameInput.value.trim(),
    price: parseFloat(priceInput.value),
    discount: parseFloat(discountInput.value),
    category: categoryInput.value.trim(),
    description: descriptionInput.value.trim(),
  };
  let option ={
    method:'PATCH',
    headers: {
      'user': 'admin',
      'pass': '123456'
    },
    body: JSON.stringify(productoActualizado)
    
  }
  fetch(apiUrl + '/' + id , option)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Actualizar la lista de productos
      cargarProductos();
      // Cerrar el modal de editar
      $('#editarModal').modal('hide');
    })
    .catch((error) => console.error('Error al editar el producto:', error));

}

// Función para eliminar un producto
function eliminarProducto(id) {
  // Implementa la lógica para eliminar un producto desde la API
  // Puedes usar fetch para hacer una solicitud DELETE a la API
  let option ={
    method:'DELETE',
    headers: {
      'user': 'admin',
      'pass': '123456'
    }
    
  }
  swal({
    title: "¿Estás seguro?",
    text: "¡ Una vez eliminado, no podrá recuperar este archivo imaginario!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      fetch(apiUrl + '/' + id, option)
      .then((response) => response.json())
      .then(() => {
        swal("Puuf! Producto Eliminado!", {
          icon: "success",
        });    
        cargarProductos()
      })
      .catch((error) => console.error('Error al eliminar el producto:', error));

      
    } else {
      swal("Producto No Eliminado!");
    }
  });
    
}

