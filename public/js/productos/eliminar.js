function eliminarProducto(button) {
    const id = button.getAttribute('data-productid');
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
      text: "¡ Una vez eliminado este Producto, no podrá recuperalo !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        fetch(apiUrl + id, option)
        .then((response) => response.json())
        .then(() => {
          swal("Se Elimino el Producto !", {
            icon: "success",
          });    
          cargarProductos();
        })
        .catch((error) => console.error('Error al eliminar el producto:', error));
  
        
      } else {
        swal("Producto No Eliminado!");
      }
    });
      
  }


  
  