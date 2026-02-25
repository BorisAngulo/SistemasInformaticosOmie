import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <section className="container mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-32">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Sistema de Gestión de Asistencia
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                        Simplifica el control de asistencia de tus estudiantes. 
                        Una solución moderna y eficiente para gestionar listas, 
                        cursos y estudiantes en un solo lugar.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/llamar-lista"
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                        >
                            Llamar Lista
                        </Link>
                        <Link
                            to="/listas"
                            className="bg-white hover:bg-gray-50 text-gray-800 font-semibold px-8 py-3 rounded-lg border-2 border-gray-300 transition duration-200"
                        >
                            Ver Historial
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                        Características Principales
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Feature 1 */}
                        <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition duration-300">
                            <div className="text-4xl mb-4">📋</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Gestión de Listas
                            </h3>
                            <p className="text-gray-600">
                                Crea y administra listas de asistencia de forma rápida. 
                                Marca presentes, faltas, tardanzas y licencias con un solo clic.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition duration-300">
                            <div className="text-4xl mb-4">👥</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Control de Estudiantes
                            </h3>
                            <p className="text-gray-600">
                                Registra estudiantes con su información completa. 
                                Asígnalos a cursos y mantén un registro organizado.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition duration-300">
                            <div className="text-4xl mb-4">📚</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Administración de Cursos
                            </h3>
                            <p className="text-gray-600">
                                Organiza tus cursos por código y descripción. 
                                Visualiza fácilmente los estudiantes asignados a cada uno.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition duration-300">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Estadísticas en Tiempo Real
                            </h3>
                            <p className="text-gray-600">
                                Consulta estadísticas de asistencia por lista. 
                                Filtra por curso y obtén información precisa al instante.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition duration-300">
                            <div className="text-4xl mb-4">📱</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Diseño Responsive
                            </h3>
                            <p className="text-gray-600">
                                Accede desde cualquier dispositivo. 
                                Interfaz optimizada para computadoras, tablets y móviles.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition duration-300">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Rápido y Eficiente
                            </h3>
                            <p className="text-gray-600">
                                Interfaz intuitiva que te permite completar tareas 
                                en segundos. Ahorra tiempo en cada sesión.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Start Section */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                            ¿Cómo Empezar?
                        </h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                                    1
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Registra tus Cursos
                                    </h3>
                                    <p className="text-gray-600">
                                        Comienza creando los cursos que impartes. 
                                        Solo necesitas un código y una descripción.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                                    2
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Agrega Estudiantes
                                    </h3>
                                    <p className="text-gray-600">
                                        Registra a tus estudiantes con su información básica 
                                        y asígnalos al curso correspondiente.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                                    3
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Llama Lista
                                    </h3>
                                    <p className="text-gray-600">
                                        Selecciona el curso y marca la asistencia de cada estudiante. 
                                        El sistema guardará el historial automáticamente.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <Link
                                to="/crear-curso"
                                className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                            >
                                Comenzar Ahora
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="bg-red-600 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        ¿Listo para optimizar tu gestión de asistencia?
                    </h2>
                    <p className="text-white text-lg mb-6 opacity-90">
                        Comienza a utilizar el sistema hoy mismo
                    </p>
                    <Link
                        to="/llamar-lista"
                        className="inline-block bg-white hover:bg-gray-100 text-red-600 font-semibold px-8 py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                    >
                        Llamar Lista Ahora
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Home;