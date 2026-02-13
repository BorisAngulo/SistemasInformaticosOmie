import estudianteController from "../controllers/estudianteController.js"; 
import express from "express";

const router = express.Router();

router.get('/', estudianteController.obtenerTodos);
router.post('/', estudianteController.crear);
export default router;