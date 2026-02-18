import cursoController from "../controllers/cursoController.js"; 
import express from "express";

const router = express.Router();

router.get('/', cursoController.obtenerTodos);
router.post('/', cursoController.crear);
router.get('/:id', cursoController.obtenerPorId);
router.put('/:id', cursoController.actualizar);
router.delete('/:id', cursoController.eliminar);
export default router;