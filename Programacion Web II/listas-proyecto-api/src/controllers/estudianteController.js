import { Estudiante }  from '../models/index.js';

//obtener todas las personas
const obtenerTodos =  async (req, res)=> {
    try{
        const personas = await Estudiante.findAll({
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

//Crear una nueva persona
const crear  = async (req, res) => {
    try{
        const { nombre, apellido, email, curso_id } = req.body;

        const nuevaPersona = await Estudiante.create({
            nombre,
            apellido,
            email,
            curso_id
        });

        res.status(201).json({
            success: true,
            message: 'Estudiante creado exitosamente',
            data: nuevaPersona,
            error: null
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al crear estudiante',
            data: null,
            error: error.message    
        });
    }
}

export default {
    obtenerTodos,
    crear
}