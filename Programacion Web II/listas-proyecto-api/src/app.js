import sequelize from './config/database.js';
import express from 'express';
import estudianteRoutes from './routes/estudianteRoutes.js';
import listaRoutes from './routes/listaRoutes.js';
import cursoRoutes from './routes/cursoRoutes.js';
import listaEstudianteRoutes from './routes/listaEstudianteRoutes.js';
import cors from 'cors';

const app = express();

// Middlewares
app.use(cors());//Permitir todas las solicititudes
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//rutas
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/listas', listaRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/estudiante-listas', listaEstudianteRoutes);

// Ruta de pueba
app.get('/', (req, res) => {
    res.json({
        message: 'API de Sistema de Listas',
        version: '1.0.0',
        endpoints: {
            estudiantes: '/api/estudiantes',
            listas: '/api/listas',
            cursos: '/api/cursos',
            estudianteListas: '/api/estudiante-listas'
        },
        saludo: '¡Hola desde la API de Sistema de Listas!'
    });
});

// Sincronizar modelos con la base de datos
const sincronizarDB = async () => {
    try{
        await sequelize.sync({ alter: true});
        console.log('Modelos sincronizados con la base de datos');
    } catch(error){
        console.error('Error al sincronizar modelos:', error);
    }
};

sincronizarDB();

export default app;