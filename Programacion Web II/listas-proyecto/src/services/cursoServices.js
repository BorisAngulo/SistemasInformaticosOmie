const API_URL = 'http://localhost:3000/api';

const cursoServices = {
    /**
     * Crear un nuevo curso
     * @param {Object} curso - Datos del curso
     * @returns {Promise<Object>} - Respuesta de la API
     */
    crear: async (curso) => {
        try{
            const response = await fetch(`${API_URL}/cursos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(curso)
            });
            const result = await response.json();

            if (!response.ok){
                throw new Error(result.error || 'Error al crear el curso');
            }
            console.log('Creacion de curso correcta')
            return result;

        }catch (error){
            console.log('Error al crear curso:', error);
            throw error;
            
        }
    },

    /**
     * Listar todos los cursos
     * @returns {Promise<Array>} - Lista de cursos
     */
    obtenerTodos: async () =>{
        try{
            const response = await fetch(`${API_URL}/cursos`);
            const result = await response.json();
            if (!response.ok){
                throw new Error(result.message || 'Error al obtener cursos');
            }
            return result;
        }catch(error){
            throw error;
        }
    },
} 

export default cursoServices;