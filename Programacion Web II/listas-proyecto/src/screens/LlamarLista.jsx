import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import cursoServices from '../services/cursoServices';
import listaServices from '../services/listaServices';

function LlamarLista(){
    const navigate = useNavigate();
    const [cursos, setCursos] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState('');
    const [fechaLista, setFechaLista] = useState(
        new Date().toISOString().split('T')[0]
    );
    const [listaId, setListaId] = useState(null);
    const [listaCreada, setListaCreada] = useState(false);
    const [estudiantes, setEstudiantes] = useState([]);
    const [guardando, setGuardando] = useState(false);
    const [mensaje, setMensaje] = useState({ text: '', type: '' });

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

    const crearYLlamarLista = async () => {
        if (!cursoSeleccionado){
            alert('Por favor, seleccione un curso para crear la lista');
            return;
        }
        try{
            const resultCrear = await listaServices.crear({
                fechaLista: fechaLista,
            })

            if(!resultCrear.success){
                throw new Error(resultCrear.error || 'Error al crear la lista');
            }

            const nuevaListaId = resultCrear.data.id;
            setListaId(nuevaListaId);

            const resultLlamar = await listaServices.llamarLista(nuevaListaId, cursoSeleccionado);
            
            if(!resultLlamar.success){
                throw new Error(resultLlamar.error || 'Error al llamar la lista');
            }

            if (resultLlamar.success){
                setEstudiantes(resultLlamar.data.estudiantes.map(
                    est => ({
                        id: est.id,
                        nombre: est.nombre,
                        apellido: est.apellido,
                        email: est.email,
                        estado: est.EstudianteLista.estado
                    })
                ));
                setListaCreada(true);
            }
        }catch(error){
            alert(error.message);
        }
    }

    const cambiarEstado = (estudianteId, nuevoEstado) => {
        setEstudiantes(prev => 
            prev.map(est => 
                est.id === estudianteId 
                    ? { ...est, estado: nuevoEstado }
                    : est
            )
        );
    }

    const getEstadoColor = (estado) => {
        switch(estado) {
            case 'presente':
                return 'bg-green-500 border-green-600';
            case 'falta':
                return 'bg-red-500 border-red-600';
            case 'tarde':
                return 'bg-orange-500 border-orange-600';
            case 'licencia':
                return 'bg-yellow-500 border-yellow-600';
            default:
                return 'bg-gray-500 border-gray-600';
        }
    }

    const getEstadoTexto = (estado) => {
        switch(estado) {
            case 'presente':
                return '✓ Presente';
            case 'falta':
                return '✗ Falta';
            case 'tarde':
                return '⏰ Tarde';
            case 'licencia':
                return '📄 Licencia';
            default:
                return estado;
        }
    }

    const guardarCambios = async () => {
        setGuardando(true);
        setMensaje({ text: '', type: '' });
        
        try {
            await listaServices.actualizarEstadosMultiples(listaId, estudiantes);
            
            setMensaje({ 
                text: '✓ Cambios guardados exitosamente. Redirigiendo...', 
                type: 'success' 
            });
            
            setTimeout(() => {
                navigate('/listas');
            }, 1500);
        } catch (error) {
            setMensaje({ 
                text: `Error al guardar: ${error.message}`, 
                type: 'error' 
            });
        } finally {
            setGuardando(false);
        }
    }
    
    return(
        <div className="container mx-auto p-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-center text-black">Llamar Lista</h2>
            {!listaCreada ? (
                <div className="bg-white shadow-md rounded-lg px-6 py-8">
                    <h3 className="text-xl font-bold mb-6 text-gray-800">Crear Nueva Lista</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="curso" className="block text-gray-700 text-sm font-bold mb-2">
                                Selecciona un curso *
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

                        <div>
                            <label htmlFor="fechaLista" className="block text-gray-700 text-sm font-bold mb-2">
                                Fecha de la lista *
                            </label>
                            <input 
                                type="date" 
                                id='fechaLista'
                                value={fechaLista}
                                onChange={(e) => setFechaLista(e.target.value)}
                                className="w-full shadow appearance-none border rounded py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500"
                            />
                        </div>

                        <button 
                            onClick={crearYLlamarLista}
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 mt-6"
                        >
                            Crear y Llamar Lista
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="bg-amber-600 text-white px-6 py-4">
                        <h3 className="text-xl font-bold">✓ Lista Creada Exitosamente</h3>
                        <p className="text-sm opacity-90">Lista ID: {listaId} | Fecha: {new Date(fechaLista).toLocaleDateString('es-ES')}</p>
                    </div>

                    {mensaje.text && (
                        <div className={`mx-4 mt-4 p-3 rounded-lg ${
                            mensaje.type === 'success' 
                                ? 'bg-green-100 text-green-700 border border-green-400' 
                                : 'bg-red-100 text-red-700 border border-red-400'
                        }`}>
                            {mensaje.text}
                        </div>
                    )}

                    <div className="p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <h4 className="text-lg font-semibold text-gray-800">
                                Estudiantes ({estudiantes.length})
                            </h4>
                            <div className="text-sm text-gray-600">
                                Toca para cambiar estado
                            </div>
                        </div>

                        <div className="space-y-3">
                            {estudiantes.map((estudiante, index) => (
                                <div 
                                    key={estudiante.id} 
                                    className={`border-2 rounded-lg p-4 transition-all ${getEstadoColor(estudiante.estado)}`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="bg-white text-gray-800 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">
                                                    {index + 1}
                                                </span>
                                                <h5 className="font-bold text-white text-lg">
                                                    {estudiante.nombre} {estudiante.apellido}
                                                </h5>
                                            </div>
                                            <p className="text-white text-sm opacity-90 ml-9">{estudiante.email}</p>
                                        </div>
                                        <div className="bg-white px-3 py-1 rounded-full">
                                            <span className="text-sm font-semibold text-gray-800">
                                                {getEstadoTexto(estudiante.estado)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-2">
                                        <button
                                            onClick={() => cambiarEstado(estudiante.id, 'presente')}
                                            className={`py-2 px-2 rounded font-semibold text-xs transition-all ${
                                                estudiante.estado === 'presente'
                                                    ? 'bg-white text-green-700 shadow-lg scale-105'
                                                    : 'bg-white bg-opacity-80 text-gray-700 hover:bg-opacity-100'
                                            }`}
                                        >
                                            ✓ Presente
                                        </button>
                                        <button
                                            onClick={() => cambiarEstado(estudiante.id, 'falta')}
                                            className={`py-2 px-2 rounded font-semibold text-xs transition-all ${
                                                estudiante.estado === 'falta'
                                                    ? 'bg-white text-red-700 shadow-lg scale-105'
                                                    : 'bg-white bg-opacity-80 text-gray-700 hover:bg-opacity-100'
                                            }`}
                                        >
                                            ✗ Falta
                                        </button>
                                        <button
                                            onClick={() => cambiarEstado(estudiante.id, 'tarde')}
                                            className={`py-2 px-2 rounded font-semibold text-xs transition-all ${
                                                estudiante.estado === 'tarde'
                                                    ? 'bg-white text-orange-700 shadow-lg scale-105'
                                                    : 'bg-white bg-opacity-80 text-gray-700 hover:bg-opacity-100'
                                            }`}
                                        >
                                            ⏰ Tarde
                                        </button>
                                        <button
                                            onClick={() => cambiarEstado(estudiante.id, 'licencia')}
                                            className={`py-2 px-2 rounded font-semibold text-xs transition-all ${
                                                estudiante.estado === 'licencia'
                                                    ? 'bg-white text-yellow-700 shadow-lg scale-105'
                                                    : 'bg-white bg-opacity-80 text-gray-700 hover:bg-opacity-100'
                                            }`}
                                        >
                                            📄 Licencia
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => {
                                    setListaCreada(false);
                                    setEstudiantes([]);
                                    setListaId(null);
                                    setCursoSeleccionado('');
                                    setMensaje({ text: '', type: '' });
                                }}
                                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                            >
                                Nueva Lista
                            </button>
                            <button
                                onClick={guardarCambios}
                                disabled={guardando}
                                className={`flex-1 font-bold py-3 px-4 rounded-lg transition duration-200 ${
                                    guardando 
                                        ? 'bg-gray-400 cursor-not-allowed text-white' 
                                        : 'bg-green-600 hover:bg-green-700 text-white'
                                }`}
                            >
                                {guardando ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LlamarLista;