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
            <h1>Crear Estudiante</h1>
            <form onSubmit={handleSubmit} className=''>
                <div>
                    <label htmlFor="nombre" className=''>
                        Nombre *
                    </label>
                    <input 
                    id="nombre"
                    name="nombre"
                    type="text"
                    className=""
                    placeholder='Ingrese el nombre'
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="apellido" className=''>
                        Apellido *
                    </label>
                    <input 
                    id="apellido"
                    name="apellido"
                    type="text"
                    className=""
                    placeholder='Ingrese el apellido'
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="email" className=''>
                        Email *
                    </label>
                    <input 
                    id="email"
                    name="email"
                    type="email"
                    className=""
                    placeholder='Ingrese el email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="Curso" className=''>
                        Curso *
                    </label>
                    <input 
                    id="curso_id"
                    name="curso_id"
                    type="text"
                    className=""
                    placeholder='Ingrese el id del curso'
                    value={formData.curso_id}
                    onChange={handleChange}
                    required
                    />
                </div>
                <button type="submit" className='bg-blue-500'>
                    Crear Estudiante
                </button>
            </form>
        </div>
    );
}

export default CrearEstudiante;
