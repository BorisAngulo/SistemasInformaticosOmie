import { useState, useEffect} from 'react';
import estudianteServices from '../services/estudianteServices';
import cursoServices from '../services/cursoServices';
import { useNavigate } from 'react-router-dom';
function CrearEstudiante() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        curso_id:''
    })
    const [cursos, setCursos] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState('');

    useEffect(() => {
        const cargarCursos = async () => {
            try {
                const result = await cursoServices.obtenerTodos();
                if(result.success){
                    setCursos(result.data);
                }
            }catch(error){
                console.error('Error al cargar cursos: ', error);
            }
        }
        cargarCursos();
    }, []);

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
                curso_id: cursoSeleccionado
            }
            const result = await estudianteServices.crear(estudiante);
            alert('Estudiante creado exitosamente')
            setTimeout(() => {
                navigate('/');
            }, 500);
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-opacity-50"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-opacity-50"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-opacity-50"
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
                    <select 
                                id='curso' 
                                value={cursoSeleccionado} 
                                onChange={(e) => setCursoSeleccionado(e.target.value)}
                                className="w-full shadow appearance-none border rounded py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500"
                            >
                                <option value="">Seleccione un curso</option>
                                {cursos.map((curso) => (
                                    <option key={curso.id} value={curso.id}>
                                        {curso.nombreCurso} - {curso.codigoCurso}
                                    </option>
                                ))}
                            </select>
                </div>
                <div className='flex justify-center'>
                <button type="submit" className=' text-white px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 mt-6'>
                    Crear Estudiante
                </button>
                </div>
                </div>
            </form>
        </div>
    );
}

export default CrearEstudiante;
