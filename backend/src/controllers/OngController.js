/** Controller das funcionalidades relativas as ONGs */

/**Bibliotecas */
const crypto = require('crypto');

/**Conexão com o banco */
const conexoes = require('../database/conexoes');

module.exports = {
    /**Criar ONG */
    async create( request, response) {
        const { nome, email, whatsapp, cidade, UF } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await conexoes('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            cidade,
            UF
        })

        return response.json({ id });
    },

    /**Listar ONGs */
    async index( request, response ) {
    
        const ongs = await conexoes('ongs').select('*');

        return response.json(ongs);
    },

    /**Delete ONG */
    async delete( request, response ) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const ong = await conexoes('ongs')
            .where('id', id)
            .select('id')
            .first();

        if (ong_id != id) {
            return response.status(401).json({ error: 'Operação não permitida.'})
        }

        await conexoes('ongs')
            .where('id', id)
            .delete();
        
        return response.status(204).send();

    }

}