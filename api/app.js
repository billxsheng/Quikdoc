const express = require('express');
const app = express();
const PORT = 8080;
const routes = require('./routes/routes.js');
const cors = require('cors')
var bodyParser = require('body-parser')


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/', routes);

app.listen(PORT);

