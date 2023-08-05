document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('myModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementsByClassName('close')[0];
  const productForm = document.getElementById('productForm');

  openModalBtn.addEventListener('click', function () {
      modal.style.display = 'block';
  });

  closeModalBtn.addEventListener('click', function () {
      modal.style.display = 'none';
  });

  window.addEventListener('dblclick', function (event) {
      if (event.target == modal) {
          modal.style.display = 'none';
      }
  });

  productForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const price = document.getElementById('price').value;
      const discount = document.getElementById('discount').value;
      const category = document.getElementById('category').value;
      const description = document.getElementById('description').value;
      const imagenInput = document.getElementById('imagen'); // Input de tipo "file"
      const imagenFile = imagenInput.files[0]; // Obtener el archivo seleccionado

      // Crear un objeto FormData para enviar los datos y la imagen al servidor
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('discount', discount);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('imagen', imagenFile); // Agregar la imagen al FormData

      // Aquí puedes enviar la solicitud POST al servidor utilizando fetch
      fetch('/api/1.0/products', {
          method: 'POST',
          body: formData, // Usar el objeto FormData como cuerpo de la solicitud
          headers: {
              // No es necesario establecer el Content-Type en este caso, el navegador lo manejará automáticamente
              'user': 'admin',
              'pass': '123456'
          },
      })
      .then(response => response.json())
      .then(data => {
          console.log('Producto creado:', data);
          // Puedes manejar la respuesta aquí, como mostrar un mensaje de éxito o actualizar la lista de productos, etc.
      })
      .catch(error => {
          console.error('Error al crear el Producto', error);
          // Puedes manejar errores aquí, como mostrar un mensaje de error al usuario, etc.
      });

      // Después de manejar los datos, puedes cerrar el modal.
      modal.style.display = 'none';
  });
});
