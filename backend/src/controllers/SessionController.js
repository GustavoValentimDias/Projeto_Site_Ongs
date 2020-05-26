const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const {id} = request.body;

        const ong = await connection('ongs')
         .where('id', id)
         .select('name')
         .first();

        if (!ong){ // se a ong não existir
            return response.status(400).json({error: 'No ONG found with this ID'})
        }

        return response.json(ong); // retorna dados da ONG
    }
}