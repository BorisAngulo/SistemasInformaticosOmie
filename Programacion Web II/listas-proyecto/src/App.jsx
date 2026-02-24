import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import Home from './screens/Home'
import Login from './screens/Login'
import Contact from './screens/Contact'
import CrearEstudiante from './screens/CrearEstudiante'
import './App.css'
import CrearCurso from './screens/CrearCurso'
import LlamarLista from './screens/LlamarLista'

function App() {
 
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <HeaderComponent />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/crear-estudiante" element={<CrearEstudiante />} />
            <Route path="/crear-curso" element={<CrearCurso />} />
            <Route path="/llamar-lista" element={<LlamarLista />} />
          </Routes>
        </main>
        <FooterComponent />
      </div>
    </BrowserRouter>
  )
}

export default App
