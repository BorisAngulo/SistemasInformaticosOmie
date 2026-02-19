import listaController from "../controllers/listaController.js"; 
import express from "express";

const router = express.Router();

router.get('/', listaController.obtenerTodos);
router.post('/', listaController.crear);
router.get('/:id', listaController.obtenerPorId);
router.put('/:id', listaController.actualizar);
router.delete('/:id', listaController.eliminar);

// LLamar lista de un curso (agregar estudianes de un curso a una lista)
router.post('/:id/llamar-lista', listaController.llamarLista);

// Actualizar estado de estudiante en lista
router.put('/:id/estudiantes/:estudiante_id', listaController.actualizarEstado);
export default router;