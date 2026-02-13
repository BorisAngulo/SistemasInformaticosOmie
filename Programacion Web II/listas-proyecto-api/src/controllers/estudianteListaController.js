import { EstudianteLista }  from '../models/index.js';

//obtener todas las personas
const obtenerTodos =  async (req, res)=> {
    try{
        const estudianteListas = await EstudianteLista.findAll({
            order: [['id', 'ASC']]
        }) 
        res.json(
            {
                success: true,
                data: estudianteListas,
                total: estudianteListas.length
            }
        );
    }catch (error){
        res.status(500).json(
            {
                success: false,
                message: 'Error al obtener estudiantes en listas',
                error: error.message
            }
        );
    }
};

//Crear una nueva persona
const crear  = async (req, res) => {
    try{
        const { estudiante_id, lista_id, estado } = req.body;

        const nuevoEstudianteListas = await EstudianteLista.create({
            estudiante_id,
            lista_id,
            estado
        });

        res.status(201).json({
            success: true,
            message: 'nuevoEstudianteListas creada exitosamente',
            data: nuevoEstudianteListas,
            error: null
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al crear estudiante en lista',
            data: null,
            error: error.message    
        });
    }
}

export default {
    obtenerTodos,
    crear
}