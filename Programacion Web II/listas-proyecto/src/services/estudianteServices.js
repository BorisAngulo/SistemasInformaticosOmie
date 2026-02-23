const API_URL = 'http://localhost:3000/api';

const estudianteServices = {
    /**
     * Crear un nuevo estudiante
     * @param {Object} estudiante - Datos del estudiante
     * @returns {Promise<Object>} - Respuesta de la API
     */
    crear: async (estudiante) => {
        try{
            const response = await fetch(`${API_URL}/estudiantes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(estudiante)
            });
            const result = await response.json();

            if (!response.ok){
                throw new Error(result.message || 'Error al crear el estudiante');
            }
            console.log('Creacion de estudiante correcta')
            return result;

        }catch (error){
            throw error;
        }
    },

    obtenerTodos: async () =>{
        try{
            const response = await fetch(`${API_URL}/estudiantes`);
            const result = await response.json();
            if (!response.ok){
                throw new Error(result.message || 'Error al obtener estudiantes');
            }
            return result;
        }catch(error){
            throw error;
        }
    },
} 

export default estudianteServices;