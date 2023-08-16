document.addEventListener('DOMContentLoaded', function() {
window.apiUrl = 'http://localhost:3000/api/1.0/productos/'; 
window.qys = x => document.querySelector(x);
window.modal = qys('#myModal');
window.openModalBtn = qys('#openModalBtn');
window.closeModalBtn = qys('.close');
window.productForm = qys('#productForm');
window.productosBody = qys('#productosBody');
window.searchInput = qys('#searchInput')
window.btnModalCrear = qys('#crear');
window.btnModalActualizar = qys('#actualizar');
window.cargarImagen = qys('#imagen');
cargarProductos();
crearProduct ();

});

