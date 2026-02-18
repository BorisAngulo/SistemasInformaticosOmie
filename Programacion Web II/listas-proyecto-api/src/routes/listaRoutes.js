import listaController from "../controllers/listaController.js"; 
import express from "express";

const router = express.Router();

router.get('/', listaController.obtenerTodos);
router.post('/', listaController.crear);
router.get('/:id', listaController.obtenerPorId);
router.put('/:id', listaController.actualizar);
router.delete('/:id', listaController.eliminar);
export default router;