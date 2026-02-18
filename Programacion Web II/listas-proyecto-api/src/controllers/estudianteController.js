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
};

// Obtener un estudiante por ID
const obtenerPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const estudiante = await Estudiante.findByPk(id);

        if (!estudiante) {
            return res.status(404).json({
                success: false,
                message: 'Estudiante no encontrado',
                data: null
            });
        }

        res.json({
            success: true,
            data: estudiante
        });
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al obtener estudiante',
            error: error.message
        });
    }
};

// Actualizar un estudiante
const actualizar = async (req, res) => {
    try{
        const { id } = req.params;
        const { nombre, apellido, email, curso_id} = req.body;

        const estudiante = await Estudiante.findByPk(id);

        if (!estudiante) {
            return res.status(404).json({
                success: false,
                message: 'Estudiante no encontrado',
                data: null
            });
        }

        await estudiante.update({
            nombre,
            apellido,
            email,
            curso_id
        });

        res.json({
            success: true,
            message: 'Estudiante actualizado exitosamente',
            data: estudiante
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al actualizar estudiante',
            error: error.message
        });
    }
};

// Eliminar un eestudiante
const eliminar = async (req, res) => {
    try{
        const { id } = req.params;
        const estudiante = await Estudiante.findByPk(id);

        if (!estudiante) {
            return res.status(404).json({
                success: false,
                message: 'Estudiante no encontrado',
                data: null
            });
        }

        await estudiante.destroy();

        res.json({
            success: true,
            message: 'Estudiante eliminado exitosamente',
            data: null
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al eliminar estudiante',
            error: error.message
        });
    }
};


export default {
    obtenerTodos,
    crear,
    obtenerPorId,
    actualizar,
    eliminar
}