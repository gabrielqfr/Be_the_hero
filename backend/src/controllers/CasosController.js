/**Controller das funcionalidades relativas aos Casos */

/**Conexão com o banco */
const conexoes = require('../database/conexoes');

module.exports = {
    /**Criar caso */
    async create( request, response) {
        const { titulo, descricao, valor } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await conexoes('casos').insert({
            titulo,
            descricao,
            valor,
            ong_id
        })

        return response.json({ id });
    },

    /** Listar casos */
    async index( request, response ) {
        const { page = 1} = request.query;

        const [count] = await conexoes('casos').count();

        const casos = await conexoes('casos')
            .join('ongs', 'ongs.id', '=', 'casos.ong_id')
            .limit(5)
            .offset((page-1)*5)
            .select(['casos.*', 
                'ongs.nome', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.cidade', 
                'ongs.UF'
        ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(casos);
    },

    /**Delete caso */
    async delete( request, response ) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const caso = await conexoes('casos')
            .where('id', id)
            .select('ong_id')
            .first();

        if (caso.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operação não permitida.'})
        }

        await conexoes('casos')
            .where('id', id)
            .delete();
        
        return response.status(204).send();

    }
}