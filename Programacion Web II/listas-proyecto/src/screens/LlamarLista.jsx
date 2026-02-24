import {useState, useEffect} from 'react';
import cursoServices from '../services/cursoServices';
import listaServices from '../services/listaServices';

function LlamarLista(){
    const [cursos, setCursos] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState([])
    const [fechaLista, setFechaLista] = useState(
        new Date().toISOString().split('T')[0]
    );
    const [listaId, setListaId] = useState(null);
    const [listaCreada, setListaCreada] = useState(false);
    const [ estudiantes, setEstudiantes] = useState([]);


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

    const crearYLlamarLista = async () => {
        if (!cursoSeleccionado){
            alert('Por favor, seleccione un curso para crear la lista');
            return;
        }
        try{
            //Paso 1 crear lista vacia
            const resultCrear = await listaServices.crear({
                fechaLista: fechaLista,
            })

            if(!resultCrear.success){
                throw new Error(resultCrear.error || 'Error al crear la lista');
            }

            const nuevaListaId = resultCrear.data.id;
            setListaId(nuevaListaId);
            

            //Paso 2 llamar lista con el curso seleccionado
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
                        <button onClick={crearYLlamarLista}
                        className='bg-blue-500 rounded'>
                            Crear Lista
                        </button>
                </div>
                </>
                ):(
                    <>
                    <div>
                        <h3>LISTA CREADA EXITOSAMENTE</h3>
                        <p>Lista ID: {listaId}</p>
                        <h4>Estudiantes:</h4>
                        <ul>
                            {estudiantes.map((estudiante) => (
                                <li key={estudiante.id}>
                                    {estudiante.nombre} {estudiante.apellido} - {estudiante.email} - Estado: {estudiante.estado}
                                </li>
                            ))}
                        </ul>
                    </div>
                    </>
                )
            }
        </div>
    )
}

export default LlamarLista;