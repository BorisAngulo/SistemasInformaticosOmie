import { Lista, Curso, Estudiante, EstudianteLista }  from '../models/index.js';
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
};

// Obtener una lista por ID
const obtenerPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const lista = await Lista.findByPk(id);

        if (!lista) {
            return res.status(404).json({
                success: false,
                message: 'Lista no encontrada',
                data: null
            });
        }

        res.json({
            success: true,
            data: lista
        });
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al obtener lista',
            error: error.message
        });
    }
};

// Actualizar una lista
const actualizar = async (req, res) => {
    try{
        const { id } = req.params;
        const { fechaLista } = req.body;

        const lista = await Lista.findByPk(id);

        if (!lista) {
            return res.status(404).json({
                success: false,
                message: 'Lista no encontrada',
                data: null
            });
        }

        await lista.update({
            fechaLista
        });

        res.json({
            success: true,
            message: 'Lista actualizada exitosamente',
            data: lista
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al actualizar lista',
            error: error.message
        });
    }
};

// Eliminar una lista
const eliminar = async (req, res) => {
    try{
        const { id } = req.params;
        const lista = await Lista.findByPk(id);

        if (!lista) {
            return res.status(404).json({
                success: false,
                message: 'Lista no encontrada',
                data: null
            });
        }

        await lista.destroy();

        res.json({
            success: true,
            message: 'Lista eliminada exitosamente',
            data: null
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al eliminar lista',
            error: error.message
        });
    }
};


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

        const existentes = await EstudianteLista.count({
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
        await EstudianteLista.bulkCreate(registros);

        const listaCompleta = await Lista.findByPk(id , {
            include: [{
                model: Estudiante,
                as: 'estudiantes',
                attributes: ['id', 'nombre', 'apellido', 'email'],
                through: {
                    attributes: ['estado']
                },
                include: [{
                    model: Curso,
                    as: 'curso',
                    attributes: ['id', 'nombreCurso', 'codigoCurso']
                }]
            }]
        });

        res.json({
            success: true,
            message: `Lista llamada a ${estudiantes.length} estudiantes del curso "${curso.nombreCurso} agregados"`,
            data: listaCompleta
        });

    }catch (error){ 
        res.status(500).json({
            success: false,
            message: 'Error al llamar lista',
            error: error.message
        });
    }
};

// Actualizar estado de un estudiante en la lista (marcar asistencia)
const actualizarEstado = async (req, res) => {
    try{
        const { id, estudiante_id} = req.params;
        const { estado } = req.body;

        const registro = await EstudianteLista.findOne({
            where: { lista_id: id, estudiante_id: estudiante_id }
        })

        if(!registro){
            return res.status(404).json({
                success: false,
                message: 'Estudiante o Lista no encontrada'
            });

            await registro.update({
                estado
            });

            res.json({
                success: true,
                message: "Estudiante actualizado existosamente",
                data: registro
            });
        }
    }catch (error){
        res.status(500).json({
            success: false,
            message: 'Error al actualizar estado del estudiante',
            error: error.message
        });
    }
}

export default {
    obtenerTodos,
    crear,
    actualizar,
    obtenerPorId,
    eliminar,
    llamarLista,
    actualizarEstado
}