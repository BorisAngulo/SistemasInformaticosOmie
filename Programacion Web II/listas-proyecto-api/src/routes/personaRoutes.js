import personaController from "../controllers/personaController.js"; 
import express from "express";

const router = express.Router();

router.get('/', personaController.obtenerTodos);
router.post('/', personaController.crear);
export default router;