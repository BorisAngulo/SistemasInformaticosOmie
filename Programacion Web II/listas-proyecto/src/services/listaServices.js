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
    },

    obtenerPorId: async (id) => {
        try{
            const response = await fetch(`${API_URL}/listas/${id}`);
            const result = await response.json();
            if (!response.ok){
                throw new Error(result.error || 'Error al obtener la lista');
            }
            return result;
        }catch(error){
            throw error;
        }
    },

    actualizarEstado: async (listaId, estudianteId, estado) => {
        try{
            const response = await fetch(`${API_URL}/listas/${listaId}/estudiantes/${estudianteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ estado })
            });
            const result = await response.json();
            if (!response.ok){
                throw new Error(result.message || 'Error al actualizar estado');
            }
            return result;
        }catch(error){
            throw error;
        }
    },

    actualizarEstadosMultiples: async (listaId, estudiantes) => {
        try {
            const promesas = estudiantes.map(estudiante => 
                listaServices.actualizarEstado(listaId, estudiante.id, estudiante.estado)
            );
            
            await Promise.all(promesas);
            
            return {
                success: true,
                message: `${estudiantes.length} estudiantes actualizados`
            };
        } catch (error) {
            throw error;
        }
    },
} 

export default listaServices;