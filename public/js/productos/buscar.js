// Función para buscar productos por nombre
function buscarProductos() {

    const searchTerm = searchInput.value.trim().toLowerCase();
  
    fetch(apiUrl + 'buscar/nombre?q=' + searchTerm)
      .then((response) => response.json())
      .then((data) => mostrarProductos(data))
      .catch((error) => console.error('Error al buscar productos:', error));
  }