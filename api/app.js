const express = require('express');
const app = express();
const PORT = 8080;
const routes = require('./routes/routes.js');
const cors = require('cors')

app.use(cors())
app.use('/api/', routes);

app.listen(PORT);

