import cursoController from "../controllers/cursoController.js"; 
import express from "express";

const router = express.Router();

router.get('/', cursoController.obtenerTodos);
router.post('/', cursoController.crear);
export default router;