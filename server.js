//This file should be moved to same folder as app build

const express = require('express');
const path = require('path');
const compression = require('compression');
const port = 80;
const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);
console.log('Server started');
