import { Link } from "react-router-dom";

function HeaderComponent() {
    return (
        <header className="bg-orange-500 p-6 ">
            <nav className="flex flex-col mx-auto text-2xl">
                <div className="flex justify-center">
                    <Link to='/' className="text-white  px-5 hover:underline hover:scale-105 hover:text-blue-400">Home</Link>
                    <Link to='/crear-estudiante' className="text-white  px-5 hover:underline hover:scale-105 hover:text-blue-400">Estudiante</  Link>
                    <Link to='/crear-curso' className="text-white  px-5 hover:underline hover:scale-105 hover:text-blue-400">Curso</  Link>
                </div>
            </nav>
        </header>
    )
}

export default HeaderComponent;