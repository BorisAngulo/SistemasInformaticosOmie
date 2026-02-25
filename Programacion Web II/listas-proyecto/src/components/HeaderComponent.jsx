import { Link } from "react-router-dom";
import { useState } from "react";

function HeaderComponent() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isListasOpen, setIsListasOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsListasOpen(false);
    };

    return (
        <header className="bg-red-600 shadow-lg">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo/Brand */}
                    <Link to='/' className="flex items-center" onClick={closeMenu}>
                        <img src="/img/omie.svg" alt="OMIE Logo" className="h-12 w-auto" />
                    </Link>

                    {/* Menú Hamburguesa para móvil */}
                    <button 
                        className="md:hidden text-white focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    {/* Menú Desktop */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link 
                            to='/' 
                            className="text-white text-lg px-3 py-2 hover:bg-red-500 rounded transition duration-200"
                        >
                            Home
                        </Link>
                        <Link 
                            to='/crear-estudiante' 
                            className="text-white text-lg px-3 py-2 hover:bg-red-500 rounded transition duration-200"
                        >
                            Estudiante
                        </Link>
                        <Link 
                            to='/crear-curso' 
                            className="text-white text-lg px-3 py-2 hover:bg-red-500 rounded transition duration-200"
                        >
                            Curso
                        </Link>
                        
                        {/* Dropdown Listas Desktop */}
                        <div className="relative">
                            <button
                                onClick={() => setIsListasOpen(!isListasOpen)}
                                className="text-white text-lg px-3 py-2 hover:bg-red-500 rounded transition duration-200 flex items-center"
                            >
                                Listas
                                <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isListasOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            {isListasOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                    <Link
                                        to='/llamar-lista'
                                        className="block px-4 py-2 text-gray-800 hover:bg-red-100 transition duration-150"
                                        onClick={() => setIsListasOpen(false)}
                                    >
                                        📝 Llamar Lista
                                    </Link>
                                    <Link
                                        to='/listas'
                                        className="block px-4 py-2 text-gray-800 hover:bg-red-100 transition duration-150"
                                        onClick={() => setIsListasOpen(false)}
                                    >
                                        📋 Ver Listas
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Menú Mobile */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'max-h-96 opacity-100 mt-4 pb-4' : 'max-h-0 opacity-0'
                }`}>
                    <div className="flex flex-col space-y-2">
                            <Link 
                                to='/' 
                                className="text-white text-lg px-3 py-2 hover:bg-red-500 rounded transition duration-200"
                                onClick={closeMenu}
                            >
                                Home
                            </Link>
                            <Link 
                                to='/crear-estudiante' 
                                className="text-white text-lg px-3 py-2 hover:bg-red-500 rounded transition duration-200"
                                onClick={closeMenu}
                            >
                                Estudiante
                            </Link>
                            <Link 
                                to='/crear-curso' 
                                className="text-white text-lg px-3 py-2 hover:bg-red-500 rounded transition duration-200"
                                onClick={closeMenu}
                            >
                                Curso
                            </Link>
                            
                            {/* Dropdown Listas Mobile */}
                            <div>
                                <button
                                    onClick={() => setIsListasOpen(!isListasOpen)}
                                    className="w-full text-left text-white text-lg px-3 py-2 hover:bg-red-500 rounded transition duration-200 flex items-center justify-between"
                                >
                                    Listas
                                    <svg className={`w-4 h-4 transition-transform duration-200 ${isListasOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                
                                {isListasOpen && (
                                    <div className="ml-4 mt-2 space-y-2">
                                        <Link
                                            to='/llamar-lista'
                                            className="block text-white text-base px-3 py-2 hover:bg-red-500 rounded transition duration-200"
                                            onClick={closeMenu}
                                        >
                                            📝 Llamar Lista
                                        </Link>
                                        <Link
                                            to='/listas'
                                            className="block text-white text-base px-3 py-2 hover:bg-red-500 rounded transition duration-200"
                                            onClick={closeMenu}
                                        >
                                            📋 Ver Listas
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                </div>
            </nav>
        </header>
    )
}

export default HeaderComponent;