const express = require('express');
const multer = require('multer');
const path = require('path');
const sizeOf = require('image-size'); // Add this line

const app = express();
const port = 3000;

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.post('/upload', upload.single('image'), (req, res) => {
  try {
    // Check if a file was provided
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Check file type
    if (req.file.mimetype !== 'image/png') {
      return res.status(400).send('Only PNG images are allowed.');
    }

    // Check image dimensions
    const dimensions = sizeOf(req.file.buffer);
    if (dimensions.width !== 512 || dimensions.height !== 512) {
      return res.status(400).send('Image must be 512x512 pixels.');
    }

    // If all checks pass, you can process the file or store it
    // For now, just respond with a success message
    res.status(200).send('File uploaded successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
