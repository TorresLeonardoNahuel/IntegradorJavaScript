
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
    window.productosBody.innerHTML = '';
    productos.forEach((producto) => {
      const row = document.createElement('tr');
      row.setAttribute("id",`${producto._id}`);
      row.innerHTML = `
        <td clase="name-image"><img  src="http://localhost:3000/images/products/${producto.image}"  alt="${producto.image}"></td>
        <td clase="name-product">${producto.name}</td>
        <td clase="price-product">$ ${producto.price}</td>
        <td clase="category-product">${producto.category}</td>
        <td clase="discount-product">${producto.discount}</td>
        <td clase="description-product">${producto.description}</td>
        <td>
          <button type="button" class="btn btn-primary" data-productid="${producto._id}" onclick="editarProducto(this)">Editar</button>
          <button type="button" class="btn btn-danger" data-productid="${producto._id}" onclick="eliminarProducto(this)">Eliminar</button>
        </td>
      `;
      window.productosBody.appendChild(row);
    });
  }
  src="../../js/index.js"
  src="../../js/productos/listar.js" 