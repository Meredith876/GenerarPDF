function cambiarTamaño(textarea) {
  textarea.style.height = 'auto'; // Resetea la altura
  textarea.style.height = (textarea.scrollHeight) + 'px'; // Ajusta la altura al contenido
}

function agregarFil() {
  // Obtener la tabla por su ID
  var table = document.getElementById('myTable').getElementsByTagName('tbody')[0];

  // Crear una nueva fila
  var newRow = table.insertRow();

  // Crear nuevas celdas y textareas en cada celda
  for (var i = 0; i < 3; i++) {
      var newCell = newRow.insertCell(i);
      var textarea = document.createElement('textarea');
      textarea.rows = 1;
      textarea.setAttribute('oninput', 'autoResize(this)');
      newCell.appendChild(textarea);
  }
}

function generarPDF() {
  const { jsPDF } = window.jspdf;
  var doc = new jsPDF();

  // Obtener la tabla
  var table = document.getElementById('myTable');
  var rows = table.getElementsByTagName('tr');
  var data = [];

  // Recorre cada fila de la tabla
  for (var i = 0; i < rows.length; i++) {
      var cells = rows[i].getElementsByTagName('td');
      var rowContent = [];
      
      // Recorre cada celda de la fila
      for (var j = 0; j < cells.length; j++) {
          var textarea = cells[j].getElementsByTagName('textarea')[0];
          rowContent.push(textarea ? textarea.value : cells[j].innerText);
      }

      // Si no es la fila de encabezado, añade la fila al array de datos
      if (rowContent.length > 0) {
          data.push(rowContent);
      }
  }

  // Usar autoTable para agregar la tabla al PDF con estilos personalizados
  doc.autoTable({
      head: [['Nombre', 'Edad', 'Ciudad']],
      body: data,
      theme: 'grid',
      headStyles: {
          fillColor: [50, 50, 50], // Color de fondo del encabezado (gris oscuro)
          textColor: [255, 255, 255], // Color del texto del encabezado (blanco)
          halign: 'center' // Alineación horizontal del texto del encabezado
      },
      styles: {
          fillColor: [245, 245, 245], // Color de fondo de las filas (gris claro)
          textColor: [0, 0, 0], // Color del texto de las filas (negro)
          halign: 'left', // Alineación horizontal del texto de las filas
          lineWidth: 0.1, // Grosor de los bordes
          lineColor: [0, 0, 0] // Color de los bordes (negro)
      },
      alternateRowStyles: {
          fillColor: [255, 255, 255] // Color de fondo de las filas alternas (blanco)
      }
  });

  return doc;
}

function verPDF() {
  var doc = generarPDF();
  // Crear un Blob del PDF y abrirlo en una nueva ventana
  var string = doc.output('bloburl');
  window.open(string);
}

function descargarPDF() {
  var doc = generarPDF();
  doc.save('tabla.pdf');
}

