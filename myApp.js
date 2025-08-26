// 1. Import Express and create the app
const express = require('express');
const app = express();

// 2. Define the GET route at "/"
app.get('/', function(req, res) {
  res.send('Hello Express');
});

// 3. Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
