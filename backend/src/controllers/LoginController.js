/**Controller da sessão do usuário */

/**Conexão com o banco */
const conexoes = require('../database/conexoes');

module.exports = {
    /**Retorna o nome da ONG logada */
    async create( request, response ) {
        const { id } = request.body;

        const ong = await conexoes('ongs')
            .where('id', id)
            .select('nome')
            .first();
        
        if (!ong) {
            return response.status(400).json({ error: "Não foi encontrado ONG com este ID." });
        }

        return response.json(ong);
    }
}