import personaController from "../controllers/personaController.js"; 
import express from "express";

const router = express.Router();

router.get('/', personaController.obtenerTodos);

export default router;