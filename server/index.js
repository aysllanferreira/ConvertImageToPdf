import express from 'express';
import PDFDocument from 'pdfkit';
import cors from 'cors';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.post('/generatePdf', async (req, res) => {
  const doc = new PDFDocument;

  const images = req.body.images;

  for(let i=0; i<images.length; i++) {
    let buffer = Buffer.from(images[i], 'base64');

    doc.image(buffer, {
      fit: [500, 500],  
      align: 'center', 
      valign: 'center' 
    });

    if(i !== images.length-1) {
      doc.addPage();
    }
  }

  doc.pipe(res);
  doc.end();
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
