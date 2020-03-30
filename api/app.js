const express = require('express');
const app = express();
const PORT = 8080;
const locationRoutes = require('./routes/routes.js');
const cors = require('cors')

app.use(cors())
app.use('/api/', locationRoutes);

app.listen(PORT);

