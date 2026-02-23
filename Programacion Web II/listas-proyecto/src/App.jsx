import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import Home from './screens/Home'
import Login from './screens/Login'
import Contact from './screens/Contact'
import CrearEstudiante from './screens/CrearEstudiante'
import './App.css'
import ButtonComponent from './components/ButtonComponent'

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
          </Routes>
        </main>
        <FooterComponent />
      </div>
    </BrowserRouter>
  )
}

export default App
