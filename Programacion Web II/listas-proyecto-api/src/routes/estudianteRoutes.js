import estudianteController from "../controllers/estudianteController.js"; 
import express from "express";

const router = express.Router();

router.get('/', estudianteController.obtenerTodos);
router.post('/', estudianteController.crear);
router.get('/:id', estudianteController.obtenerPorId);
router.put('/:id', estudianteController.actualizar);
router.delete('/:id', estudianteController.eliminar);
export default router;