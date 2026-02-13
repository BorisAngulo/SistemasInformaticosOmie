import sequelize from './config/database.js';
import express from 'express';
import personaRoutes from './routes/personaRoutes.js';
import listaRoutes from './routes/listaRoutes.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//rutas
app.use('/api/personas', personaRoutes);

//listas
app.use('/api/listas', listaRoutes);

// Ruta de pueba
app.get('/', (req, res) => {
    res.json({
        message: 'API de Sistema de Listas',
        version: '1.0.0',
        endpoints: {
            hola: '/muypronto'
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