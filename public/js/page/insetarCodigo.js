$(function() {
  // Cargar contenido en elementos con atributo data-load
  $("[data-load]").each(function() {
    var $this = $(this);
    var url = $this.data("load");
    $this.load(url);
  });
});
