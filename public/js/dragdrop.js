(() => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it
/* Volcar en la textarea de entrada
 * #original el contenido del fichero fileName */
 //mongo
const dump = (fileName) => {
  $.get(fileName, function (data) {
      $("#original").val(data);
  });
};

/* Volcar la tabla con el resultado en el HTML */
const resultado = (data) => {
        $("#salida").html(JSON.stringify(data.tree, null, 2));
    };

//File
const handleFileSelect = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  var files = evt.target.files;
   var reader = new FileReader();
   reader.onload = (e) => {
     $("#original").val(e.target.result);
   };
   reader.readAsText(files[0])
}

//File
/* Drag and drop: el fichero arrastrado se vuelca en la textarea de entrada */
const handleDragFileSelect = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files; // FileList object.

  var reader = new FileReader();
  reader.onload = (e) => {
    $("#original").val(e.target.result);
    evt.target.style.background = "white";
  };
  reader.readAsText(files[0])
}

const handleDragOver = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  evt.target.style.background = "pink";
}

//localstorage, inicializacion de ruta botones,
$(document).ready(() => {
    let original = document.getElementById("original");
    if (window.localStorage && localStorage.original) {
      original.value = localStorage.original;
    }

    //Tabla
    $("#parse").click(() => {
           if (window.localStorage) localStorage.original = original.value;
           $.get("/arbol", {
                   input: original.value
               },
               resultado,
               'json'
           );
       });

   /* botones para rellenar el textarea */
   $('button.example').each( (_,y) => {
     $(y).click( () => { dump(`examples/${$(y).text()}.txt`); });
   });

    // Setup the drag and drop listeners.
    //var dropZone = document.getElementsByClassName('drop_zone')[0];
    let dropZone = $('.drop_zone')[0];
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleDragFileSelect, false);

    //Cargar fichero
    let inputFile = $('.inputfile')[0];
    inputFile.addEventListener('change', handleFileSelect, false);
 });
})();