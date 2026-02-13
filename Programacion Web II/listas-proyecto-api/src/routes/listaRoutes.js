import listaController from "../controllers/listaController.js"; 
import express from "express";

const router = express.Router();

router.get('/', listaController.obtenerTodos);
router.post('/', listaController.crear);
export default router;