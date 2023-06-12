const express = require('express');
const app = express();
const port = 3001;
const routes = require('./routes/index.js');

app.use(express.static('public'));
app.use(express.json());
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});