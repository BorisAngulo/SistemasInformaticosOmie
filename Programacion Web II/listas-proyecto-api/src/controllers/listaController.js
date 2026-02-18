import { Lista, Curso, Estudiante, ListaEstudiante }  from '../models/index.js';
//obtener todas las listas
const obtenerTodos =  async (req, res)=> {
    try{
        const listas = await Lista.findAll({
            order: [['id', 'ASC']]
        }) 
        res.json(
            {
                success: true,
                data: listas,
                total: listas.length
            }
        );
    }catch (error){
        res.status(500).json(
            {
                success: false,
                message: 'Error al obtener listas',
                error: error.message
            }
        );
    }
};

//Crear una nueva lista
const crear  = async (req, res) => {
    try{
        const { fechaLista } = req.body;

        const nuevaLista = await Lista.create({
            fechaLista
        });

        res.status(201).json({
            success: true,
            message: 'Lista creada exitosamente',
            data: nuevaLista,
            error: null
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al crear lista',
            data: null,
            error: error.message    
        });
    }
}

// Llamar lista de un curso - Agrega todos los estudiantes de una lista
const llamarLista = async (req, res) => {
    try{
        const { id } = req.params;
        const { curso_id, estado_inicial } = req.body; 

        // Verificar que la lista existe
        const lista = await Lista.findByPk(id);
        if (!lista) {
            return res.status(404).json({
                success: false,
                message: 'Lista no encontrada',
            });
        }

        //Verificar que el curso eciste
        const curso = await Curso.findByPk(curso_id);
        if (!curso) {
            return res.status(404).json({
                success: false,
                message: 'Curso no encontrado',
            });
        }
        // Obtener estudiantes del curso
        const estudiantes = await Estudiante.findAll({
            where: {curso_id: curso_id}
        })

        if (estudiantes.length === 0){
            return res.status(404).json({
                success: false,
                message: 'No hay estudiantes en este curso',
            });
        }

        const existentes = await ListaEstudiante.count({
            where: { lista_id: id}
        });
        if( existentes > 0){
            return res.status(400).json({
                success: false,
                message: ' La lista ya ha sido llamada'
            });
        };

        const registros = estudiantes.map(estudiante => ({
            lista_id: id,
            estudiante_id: estudiante.id,
            estado: estado_inicial || 'falta'
        }));

        //Crea una ListaEstudiante por cada registro
        await ListaEstudiante.bulkCreate(registros);

        res.json({
            success: true,
            message: 'Lista llamada exitosamente',
            data: registros
        });

    }catch (error){ 
        res.status(500).json({
            success: false,
            message: 'Error al llamar lista',
            error: error.message
        });
    }
};

export default {
    obtenerTodos,
    crear,
    llamarLista
}