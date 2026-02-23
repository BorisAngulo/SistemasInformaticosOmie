import { useState, useEffect} from 'react';
import estudianteServices from '../services/estudianteServices';

function CrearEstudiante() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        curso_id:''
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
            const estudiante = {
                nombre: formData.nombre,
                apellido: formData.apellido,
                email: formData.email,
                curso_id: formData.curso_id
            }
            const result = await estudianteServices.crear(estudiante);
            console.log('Estudiante creado:', result);

        }catch(error){
            console.error('Error al crear estudiante:', error);
        }
    }

    return (
        <div>
            <h1 className='text-3xl font-bold text-center mt-5'>Crear Estudiante</h1>
            <form onSubmit={handleSubmit} className=''>
                <div className='container max-w-80 mx-auto pt-5'>
                <div>
                    <label htmlFor="nombre" className='block my-2 text-sm font-medium text-gray-900'>
                        Nombre *
                    </label>
                    <input 
                    id="nombre"
                    name="nombre"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder='Ingrese el nombre'
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="apellido" className='block my-2 text-sm font-medium text-gray-900'>
                        Apellido *
                    </label>
                    <input 
                    id="apellido"
                    name="apellido"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder='Ingrese el apellido'
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="email" className='block my-2 text-sm font-medium text-gray-900'>
                        Email *
                    </label>
                    <input 
                    id="email"
                    name="email"
                    type="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder='Ingrese el email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="Curso" className='block mb-2 text-sm font-medium text-gray-900'>
                        Curso *
                    </label>
                    <input 
                    id="curso_id"
                    name="curso_id"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder='Ingrese el id del curso'
                    value={formData.curso_id}
                    onChange={handleChange}
                    required
                    />
                </div>
                <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-6'>
                    Crear Estudiante
                </button>
                </div>
            </form>
        </div>
    );
}

export default CrearEstudiante;
