import { useState, useEffect } from 'react';
import listaService from '../services/listaServices';
import cursoService from '../services/cursoServices';
import { Link } from 'react-router-dom';

function VerListas() {
  const [listas, setListas] = useState([]);
  const [listasFiltradas, setListasFiltradas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [filtros, setFiltros] = useState({
    cursoId: '',
    fechaInicio: '',
    fechaFin: '',
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [expandedListaId, setExpandedListaId] = useState(null);

  // Cargar listas y cursos al montar
  useEffect(() => {
    cargarDatos();
  }, []);

  // Aplicar filtros cuando cambian
  useEffect(() => {
    aplicarFiltros();
  }, [filtros, listas]);

  const cargarDatos = async () => {
    setIsLoading(true);
    try {
      const [resultListas, resultCursos] = await Promise.all([
        listaService.obtenerTodos(),
        cursoService.obtenerTodos()
      ]);

      if (resultListas.success) {
        setListas(resultListas.data);
      }
      if (resultCursos.success) {
        setCursos(resultCursos.data);
      }
    } catch (error) {
      setMessage({ 
        text: `Error al cargar datos: ${error.message}`, 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const aplicarFiltros = () => {
    let resultado = [...listas];

    // Filtrar por curso (obtenido del primer estudiante)
    if (filtros.cursoId) {
      resultado = resultado.filter(lista => {
        if (!lista.estudiantes || lista.estudiantes.length === 0) return false;
        return lista.estudiantes[0].curso?.id === parseInt(filtros.cursoId);
      });
    }

    // Filtrar por fecha inicio
    if (filtros.fechaInicio) {
      resultado = resultado.filter(lista => 
        new Date(lista.fechaLista) >= new Date(filtros.fechaInicio)
      );
    }

    // Filtrar por fecha fin
    if (filtros.fechaFin) {
      resultado = resultado.filter(lista => 
        new Date(lista.fechaLista) <= new Date(filtros.fechaFin)
      );
    }

    // Ordenar por fecha descendente (más recientes primero)
    resultado.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setListasFiltradas(resultado);
  };

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      cursoId: '',
      fechaInicio: '',
      fechaFin: '',
    });
  };

  const verDetalles = async (listaId) => {
    if (expandedListaId === listaId) {
      setExpandedListaId(null);
      return;
    }

    try {
      const result = await listaService.obtenerPorId(listaId);
      if (result.success) {
        // Actualizar la lista con los estudiantes
        setListas(prev => prev.map(lista => 
          lista.id === listaId 
            ? { ...lista, estudiantes: result.data.estudiantes }
            : lista
        ));
        setExpandedListaId(listaId);
      }
    } catch (error) {
      setMessage({ 
        text: `Error al cargar detalles: ${error.message}`, 
        type: 'error' 
      });
    }
  };

  const obtenerEstadisticas = (lista) => {
    if (!lista.estudiantes) return null;

    const total = lista.estudiantes.length;
    const presentes = lista.estudiantes.filter(e => e.EstudianteLista?.estado === 'presente').length;
    const ausentes = lista.estudiantes.filter(e => e.EstudianteLista?.estado === 'falta').length;
    const justificados = lista.estudiantes.filter(e => e.EstudianteLista?.estado === 'licencia').length;
    const tardes = lista.estudiantes.filter(e => e.EstudianteLista?.estado === 'tarde').length;

    return { total, presentes, ausentes, justificados, tardes };
  };

  const getCursoNombre = (lista) => {
    if (lista.estudiantes && lista.estudiantes.length > 0) {
      const primerEstudiante = lista.estudiantes[0];
      
      if (primerEstudiante.curso) {
        const curso = primerEstudiante.curso;
        return `${curso.codigoCurso} - ${curso.nombreCurso}`;
      }
    }
    return 'Lista sin estudiantes registrados';
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-black">
        Ver Listas
      </h2>

      {message.text && (
        <div className={`p-4 mb-4 rounded ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-700 border border-green-400' 
            : 'bg-red-100 text-red-700 border border-red-400'
        }`}>
          {message.text}
        </div>
      )}

      {/* Panel de Filtros */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        <h3 className="text-xl font-bold mb-4">Filtros</h3>
        
        <div className="mb-4">
          <div className='mx-auto'>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Curso
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={filtros.cursoId}
              onChange={(e) => handleFiltroChange('cursoId', e.target.value)}
            >
              <option value="">Todos los cursos</option>
              {cursos.map((curso) => (
                <option key={curso.id} value={curso.id}>
                  {curso.codigoCurso} - {curso.nombreCurso}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Fecha Inicio
            </label>
            <input
              type="date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={filtros.fechaInicio}
              onChange={(e) => handleFiltroChange('fechaInicio', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Fecha Fin
            </label>
            <input
              type="date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={filtros.fechaFin}
              onChange={(e) => handleFiltroChange('fechaFin', e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={limpiarFiltros}
          >
            Limpiar Filtros
          </button>
          <span className="text-gray-600 ml-auto">
            {listasFiltradas.length} lista(s)
          </span>
        </div>
      </div>

      {/* Lista de Listas */}
      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Cargando listas...</p>
        </div>
      ) : listasFiltradas.length === 0 ? (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 text-center">
          <p className="text-gray-600 mb-4">No se encontraron listas con los filtros aplicados.</p>
          <Link 
            to="/llamar-lista" 
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded inline-block"
          >
            Crear Nueva Lista
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {listasFiltradas.map((lista) => {
            const stats = obtenerEstadisticas(lista);
            const isExpanded = expandedListaId === lista.id;

            return (
              <div key={lista.id} className="bg-white shadow-md rounded overflow-hidden">
                <div className="px-6 py-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">
                          {lista.nombre}
                        </h3>
                        {lista.activa && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300">
                            Activa
                          </span>
                        )}
                      </div>
                      
                      <div className="text-gray-600 text-sm space-y-1">
                        <p>📅 <strong>Fecha:</strong> {new Date(lista.fechaLista).toLocaleDateString('es-ES')}</p>
                        <p>🏫 <strong>Curso:</strong> {getCursoNombre(lista)}</p>
                      </div>
                    </div>

                    <button
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => verDetalles(lista.id)}
                    >
                      {isExpanded ? 'Ocultar Detalles' : 'Ver Detalles'}
                    </button>
                  </div>

                  {/* Detalles expandidos */}
                  {isExpanded && lista.estudiantes && (
                    <div className="mt-4 pt-4 border-t">
                      {/* Estadísticas */}
                      {stats && (
                        <div className="grid grid-cols-5 gap-3 mb-4">
                          <div className="bg-gray-100 p-3 rounded text-center">
                            <div className="text-xl font-bold">{stats.total}</div>
                            <div className="text-xs text-gray-600">Total</div>
                          </div>
                          <div className="bg-green-100 p-3 rounded text-center">
                            <div className="text-xl font-bold text-green-700">{stats.presentes}</div>
                            <div className="text-xs text-gray-600">Presentes</div>
                          </div>
                          <div className="bg-red-100 p-3 rounded text-center">
                            <div className="text-xl font-bold text-red-700">{stats.ausentes}</div>
                            <div className="text-xs text-gray-600">Ausentes</div>
                          </div>
                          <div className="bg-yellow-100 p-3 rounded text-center">
                            <div className="text-xl font-bold text-yellow-700">{stats.justificados}</div>
                            <div className="text-xs text-gray-600">Justificados</div>
                          </div>
                          <div className="bg-orange-100 p-3 rounded text-center">
                            <div className="text-xl font-bold text-orange-700">{stats.tardes}</div>
                            <div className="text-xs text-gray-600">Tardes</div>
                          </div>
                        </div>
                      )}

                      {/* Lista de estudiantes */}
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-50 rounded">
                          <thead className="bg-gray-200">
                            <tr>
                              <th className="py-2 px-4 text-left text-xs">#</th>
                              <th className="py-2 px-4 text-left text-xs">Estudiante</th>
                              <th className="py-2 px-4 text-left text-xs">Estado</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lista.estudiantes.map((estudiante, index) => (
                              <tr key={estudiante.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-2 px-4 text-sm">{index + 1}</td>
                                <td className="py-2 px-4 text-sm font-semibold">
                                  {estudiante.nombre} {estudiante.apellido}
                                </td>
                                <td className="py-2 px-4">
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                    estudiante.EstudianteLista?.estado === 'presente' ? 'bg-green-200 text-green-800' :
                                    estudiante.EstudianteLista?.estado === 'falta' ? 'bg-red-200 text-red-800' :
                                    estudiante.EstudianteLista?.estado === 'licencia' ? 'bg-yellow-200 text-yellow-800' :
                                    estudiante.EstudianteLista?.estado === 'tarde' ? 'bg-orange-200 text-orange-800' :
                                    'bg-gray-200 text-gray-800'
                                  }`}>
                                    {estudiante.EstudianteLista?.estado || 'N/A'}
                                  </span>
                                </td>
                                
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default VerListas;
