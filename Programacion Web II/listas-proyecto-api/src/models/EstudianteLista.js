import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const EstudianteLista = sequelize.define('EstudianteLista', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    lista_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'listas',
            key: 'id'
        }
    },
    estudiante_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'estudiantes',
            key: 'id'
        }
    },
    estado:{
        type: DataTypes.ENUM('presente', 'falta', 'tarde', 'licencia'),
        allowNull: false,
        defaultValue: 'falta'
    }
}, {
    timestamps: true,
    tableName: 'estudiante_lista',
    underscored: true
})

export default EstudianteLista;