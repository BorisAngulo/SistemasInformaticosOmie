import Persona  from '../models/Persona.js';

//obtener todas las personas
const obtenerTodos =  async (req, res)=> {
    try{
        const personas = await Persona.findAll({
            order: [['id', 'ASC']]
        }) 
        res.json(
            {
                success: true,
                data: personas,
                total: personas.length
            }
        );
    }catch (error){
        res.status(500).json(
            {
                success: false,
                message: 'Error al obtener personas',
                error: error.message
            }
        );
    }
};

export default {
    obtenerTodos
}