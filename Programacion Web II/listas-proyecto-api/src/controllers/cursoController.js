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
}

export default {
    obtenerTodos,
    crear
}