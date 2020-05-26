const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1} = request.query;  // PAGINAÇÃO

        const [count] = await connection('incidents').count(); // o colchetes é para retornar só um resultado (conta o número de casos)

        console.log(count); // mostra um objeto COUNT

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // importante (join) (mostra todos os dados)!!
        .limit(5) // 5 por página
        .offset((page - 1) * 5)
        .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']); // seleciona os dados a serem mostrados

        response.header('X-Total-Count', count['count(*)']); // retorna no header da resposta o count (numero de casos)

        return response.json(incidents);
    },

    async create(request, response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;  // o nome authorization depende do header (pode ser outro)

        const [id] = await connection('incidents').insert({ // id está em um array
            title, 
            description,
            value,
            ong_id,
        });
        return response.json({id});
    },
    async delete(request, response){
        const {id} = request.params;  // pega o ID colocado no metodo
        const ong_id = request.headers.authorization;  // checagem

        const incident = await connection('incidents')
         .where('id', id)
         .select('ong_id')
         .first();    // retorna um resultado só

        if (incident.ong_id != ong_id){ // verifica
            return response.status(401).json({error: 'Operation not permitted'})
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); //resposta de sucesso
    }
};