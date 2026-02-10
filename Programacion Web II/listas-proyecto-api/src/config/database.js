import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    {
        dialect: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_NAME || 'lista_db',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

sequelize.authenticate()
    .then(() => console.log('Conexion establecida a MySQL'))
    .catch(err => console.error('Error al conectar a MySQL:', err));

export default sequelize;