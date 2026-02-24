const API_URL = 'http://localhost:3000/api';

const listaServices = {
    /**
     * Crear un nuevo estudiante
     * @param {Object} estudiante - Datos del estudiante
     * @returns {Promise<Object>} - Respuesta de la API
     */
    crear: async (lista) => {
        try{
            const response = await fetch(`${API_URL}/listas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(lista)
            });
            const result = await response.json();

            if (!response.ok){
                throw new Error(result.error || 'Error al crear el lista');
            }
            console.log('Creacion de lista correcta')
            return result;

        }catch (error){
            throw error;
        }
    },

    obtenerTodos: async () =>{
        try{
            const response = await fetch(`${API_URL}/listas`);
            const result = await response.json();
            if (!response.ok){
                throw new Error(result.error || 'Error al obtener listas');
            }
            return result;
        }catch(error){
            throw error;
        }
    },

    llamarLista: async (id, curso_id)=>{
        try{
            const response = await fetch(`${API_URL}/listas/${id}/llamar-lista`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ curso_id })
            });
            const result = await response.json();
            if (!response.ok){
                throw new Error(result.message || 'Error al llamar la lista');
            }
            return result;
        }catch(error){
            throw error;
        }
    }
} 

export default listaServices;