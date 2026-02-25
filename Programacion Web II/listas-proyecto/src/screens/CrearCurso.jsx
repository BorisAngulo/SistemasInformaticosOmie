import { useState } from 'react';
import cursoServices from '../services/cursoServices';

function CrearCurso(){
    const [formData, setFormData] = useState({
        nombreCurso: '',
        codigoCurso: '',
        gestion: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const curso = {
                nombreCurso: formData.nombreCurso,
                codigoCurso: formData.codigoCurso,
                gestion: formData.gestion
            }
            const result = await cursoServices.crear(curso);
            console.log('Curso creado:', result);

        }catch(error){
            console.error('Error al crear curso:', error);
        }
    }
    return(
        <div>
            <h1 className='text-3xl font-bold text-center mt-5'>Crear Curso</h1>
            <form onSubmit={handleSubmit} className=''>
                <div className='container max-w-80 mx-auto pt-5'>
                <div>
                    <label htmlFor="nombreCurso" className='block mb-2 text-sm font-medium text-gray-900'>
                        Nombre del curso *
                    </label>
                    <input 
                    id="nombreCurso"
                    name="nombreCurso"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    placeholder='Ingrese el nombre del curso'
                    value={formData.nombreCurso}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="codigoCurso" className='block my-2 text-sm font-medium text-gray-900'>
                        Codigo del curso *
                    </label>
                    <input 
                    id="codigoCurso"
                    name="codigoCurso"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    placeholder='Ingrese el codigo del curso'
                    value={formData.codigoCurso}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="gestion" className='block my-2 text-sm font-medium text-gray-900'>
                        Gestion *
                    </label>
                    <input 
                    id="gestion"
                    name="gestion"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    placeholder='Ingrese la gestion del curso'
                    value={formData.gestion}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className='flex justify-center'>
                <button type="submit" className='text-white px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 mt-6'>
                    Crear Curso
                </button>
                </div>
                </div>
            </form>
        </div>
    )
}
export default CrearCurso;