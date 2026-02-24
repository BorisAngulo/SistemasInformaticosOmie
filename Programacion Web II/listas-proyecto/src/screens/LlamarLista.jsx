import {useState, useEffect} from 'react';
import cursoServices from '../services/cursoServices';

function LlamarLista(){
    const [cursos, setCursos] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState([])
    const [fechaLista, setFechaLista] = useState(
        new Date().toISOString().split('T')[0]
    );
    const [listaCreada, setListaCreada] = useState(false);

    useEffect(() => {
            const cargarCursos = async () => {
                try {
                    const result = await cursoServices.obtenerTodos();
                    if(result.success){
                        setCursos(result.data);
                    }
                }catch(error){
                    console.error('Error al cargar cursos: ', error);
                };
        }

        cargarCursos();
    }, []);

    const handleSubmitLista = async () => {
    
    }
    
    return(
        <div>
            <h2>Llamar Lista</h2>
            {!listaCreada ? (
                <>
                <div>
                    <h3>Crear Nueva Lista</h3>
                    <label htmlFor="curso">
                        Selecciona un curso *
                    </label>
                    <select id='curso' value={cursoSeleccionado} onChange={(e) => setCursoSeleccionado(e.target.value)}>
                        <option value="">Seleccione un curso </option>
                        {cursos.map((curso) => (
                            <option key={curso.id} value={curso.id}>
                                {curso.nombreCurso} - {curso.codigoCurso}
                            </option>
                        ))}
                    </select>
                        <label htmlFor="fechaLista">
                            Fecha de la lista *
                        </label>
                        <input type="date" 
                            id='fechaLista'
                            value={fechaLista}
                            onChange={(e) => setFechaLista(e.target.value)}
                        />
                        <button onClick={handleSubmitLista}
                        className='bg-blue-500 rounded'>
                            Crear Lista
                        </button>
                </div>
                </>
                ):(
                    <>
                    </>
                )
            }
        </div>
    )
}

export default LlamarLista;