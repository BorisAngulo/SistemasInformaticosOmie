import { Lista }  from '../models/index.js';

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
            sucess: false,
            message: 'Error al crear lista',
            data: null,
            error: error.message    
        });
    }
}

export default {
    obtenerTodos,
    crear
}