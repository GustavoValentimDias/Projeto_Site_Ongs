const crypto = require('crypto');
const connection = require('../database/connection');  // o ponto é pra abrir pasta


module.exports = {  // Os nomes index e create são arbitrarios
    async index(request, response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response){  // pra usar await tem que colocar async
    const {name, email, whatsapp, city, uf} = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({   // coloca na tabela (await para esperar o metodo terminar)
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })

    return response.json({id}); // resposta do comando post (aparece no body na aplicação) retorna o ID
    }

};