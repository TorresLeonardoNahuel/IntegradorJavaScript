  document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('myModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.querySelector('.close');
    const productForm = document.getElementById('productForm');

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
      formData.append('imagen', imagenFile); 
      
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type':'multipart/form-data;',
            'Connection':'keep-alive',
            'user': 'admin',
            'pass': '123456'
          },
          body: formData,
        })
          .then(function (response) {
            return response.json();
        })
          .then((data) => {
            // Limpiar el formulario después de crear el producto
            console.log('Producto creado:', data);
            nameInput.value = '';
            priceInput.value = '';
            discountInput.value = '';
            categoryInput.value = '';
            descriptionInput.value = '';
            // Actualizar la lista de productos
            cargarProductos();
            // Cerrar el modal de crear
            $('#crearModal').modal('hide');
          })
          .catch((error) => console.error('Error al crear el producto:', error));
          
        });
  });

