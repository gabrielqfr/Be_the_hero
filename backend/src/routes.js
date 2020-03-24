/**
 * Arquivo para organização das rotas da aplicação
 */

/**Bibliotecas */
const express = require('express');

/**Controllers */
const OngController = require('./controllers/OngController');
const CasosController = require('./controllers/CasosController');
const PerfilController = require('./controllers/PerfilController');
const LoginController = require('./controllers/LoginController');

/**Router */
const routes = express.Router();

/**Rotas */

/**Login */
routes.post('/login', LoginController.create);

/**CRUD ONG */
routes.post('/ongs', OngController.create);
routes.get('/ongs', OngController.index);
routes.delete('/ongs/:id', OngController.delete);

/**CRUD casos */
routes.post('/casos', CasosController.create);
routes.get('/casos', CasosController.index);
routes.delete('/casos/:id', CasosController.delete);

/**Listar casos de uma ONG */
routes.get('/perfil', PerfilController.index);

module.exports = routes;