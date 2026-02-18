import { Curso }  from '../models/index.js';

//obtener todas las cursos
const obtenerTodos =  async (req, res)=> {
    try{
        const cursos = await Curso.findAll({
            order: [['id', 'ASC']]
        }) 
        res.json(
            {
                success: true,
                data: cursos,
                total: cursos.length
            }
        );
    }catch (error){
        res.status(500).json(
            {
                success: false,
                message: 'Error al obtener cursos',
                error: error.message
            }
        );
    }
};

//Crear una nueva lista
const crear  = async (req, res) => {
    try{
        const { nombreCurso, codigoCurso, gestion } = req.body;

        const nuevoCurso = await Curso.create({
            nombreCurso,
            codigoCurso,
            gestion
        });

        res.status(201).json({
            success: true,
            message: 'Curso creado exitosamente',
            data: nuevoCurso,
            error: null
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al crear curso',
            data: null,
            error: error.message    
        });
    }
};

// Obtener un curso por ID
const obtenerPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await Curso.findByPk(id);

        if (!curso) {
            return res.status(404).json({
                success: false,
                message: 'Curso no encontrado',
                data: null
            });
        }

        res.json({
            success: true,
            data: curso
        });
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al obtener curso',
            error: error.message
        });
    }
};

// Actualizar un curso
const actualizar = async (req, res) => {
    try{
        const { id } = req.params;
        const { nombreCurso, codigoCurso, gestion} = req.body;

        const curso = await Curso.findByPk(id);

        if (!curso) {
            return res.status(404).json({
                success: false,
                message: 'Curso no encontrado',
                data: null
            });
        }

        await curso.update({
            nombreCurso,
            codigoCurso,
            gestion
        });

        res.json({
            success: true,
            message: 'Curso actualizado exitosamente',
            data: curso
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al actualizar curso',
            error: error.message
        });
    }
};

// Eliminar un curso
const eliminar = async (req, res) => {
    try{
        const { id } = req.params;
        const curso = await Curso.findByPk(id);

        if (!curso) {
            return res.status(404).json({
                success: false,
                message: 'Curso no encontrado',
                data: null
            });
        }

        await curso.destroy();

        res.json({
            success: true,
            message: 'Curso eliminado exitosamente',
            data: null
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al eliminar curso',
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