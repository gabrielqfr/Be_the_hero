/**Bibliotecas */
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

/**Variáveis */
const app = express();

/**Funções */
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);