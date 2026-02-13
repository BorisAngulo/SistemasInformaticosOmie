import listaEstudianteController from "../controllers/estudianteListaController.js"; 
import express from "express";

const router = express.Router();

router.get('/', listaEstudianteController.obtenerTodos);
router.post('/', listaEstudianteController.crear);
export default router;