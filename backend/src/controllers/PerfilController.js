/**Controller das funcionalidades vinculadas a um perfil de ONG específico */

/**Conexão com o banco */
const conexoes = require('../database/conexoes');

module.exports = {
    /** Listar casos de uma ONG */
    async index( request, response ) {
        const ong_id = request.headers.authorization;

        const casos = await conexoes('casos')
            .where('ong_id', ong_id)
            .select('*');

        return response.json(casos);
    },
}