/**
 * Arquivo para organização das rotas da aplicação
 */

/**Bibliotecas */
const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

/**Controllers */
const OngController = require('./controllers/OngController');
const CasosController = require('./controllers/CasosController');
const PerfilController = require('./controllers/PerfilController');
const LoginController = require('./controllers/LoginController');

/**Router */
const routes = express.Router();

/**Rotas */

/**Login */
routes.post('/login', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
}), LoginController.create);

/**CRUD ONG */
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        cidade: Joi.string().required(),
        UF: Joi.string().required().length(2)
    })
}), OngController.create);

routes.get('/ongs', OngController.index);

routes.delete('/ongs/:id', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    })
}), OngController.delete);

/**CRUD casos */
routes.post('/casos', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        titulo: Joi.string().required(),
        descricao: Joi.string().required(),
        valor: Joi.number().required()
    })
}),CasosController.create);

routes.get('/casos', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), CasosController.index);

routes.delete('/casos/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), CasosController.delete);

/**Listar casos de uma ONG */
routes.get('/perfil', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), PerfilController.index);

module.exports = routes;