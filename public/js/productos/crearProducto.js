const apiUrl = 'http://localhost:3000/api/1.0/productos/'; // Reemplaza 'URL_DE_TU_API' con la URL de tu API

// Función para cargar la lista de productos al cargar la página
window.onload = function () {
  cargarProductos();
};

// Función para cargar la lista de productos desde la API
function cargarProductos() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => mostrarProductos(data))
    .catch((error) => console.error('Error al cargar los productos:', error));
}

// Función para mostrar los productos en la tabla
function mostrarProductos(productos) {
  const productosBody = document.getElementById('productosBody');
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

// Función para crear un nuevo producto

// Función para editar un producto
function editarProducto(id) {
  const nameInput = document.getElementById('nombreEditar');
  const priceInput = document.getElementById('precioEditar');
  const discountInput = document.getElementById('descuentoEditar');
  const categoryInput = document.getElementById('categoriaEditar');
  const descriptionInput = document.getElementById('descripcionEditar');

  const productoActualizado = {
    name: nameInput.value.trim(),
    price: parseFloat(priceInput.value),
    discount: parseFloat(discountInput.value),
    category: categoryInput.value.trim(),
    description: descriptionInput.value.trim(),
  };

  fetch(apiUrl + '/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productoActualizado),
  })
    .then((response) => response.json())
    .then((data) => {
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
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    fetch(apiUrl + '/' + id, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => cargarProductos())
      .catch((error) => console.error('Error al eliminar el producto:', error));
  }
}
