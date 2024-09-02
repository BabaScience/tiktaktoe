const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route handling
app.use('/', require('./routes/index'));

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
