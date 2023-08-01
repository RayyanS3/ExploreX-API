const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World', Author: 'Rayyan Suhail' });
});
