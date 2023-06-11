const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes/routes');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Middleware to parse JSON requests
app.use(express.json());

// Use the routes defined in routes.js
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
