document.getElementById('pdfForm').addEventListener('submit', function(e) {
  e.preventDefault();

  var files = document.getElementById('images').files;
  var images = [];

  for(let i = 0; i < files.length; i++) {
    var reader = new FileReader();
    reader.onload = function(event) {
      var base64String = event.target.result.split(',')[1];
      images.push(base64String);

      if(images.length === files.length) {
        fetch('http://localhost:3000/generatePdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ images: images })
        })
        .then(response => response.blob())
        .then(blob => {
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = 'images.pdf';
          a.click();
          a.remove();
        });
      }
    };
    reader.readAsDataURL(files[i]);
  }
});
