import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Lista = sequelize.define( 'Lista', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaLista: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        validate: {
            notEmpty: false
        }
    },
},{
    timestamps: true,
    tableName: 'listas',
    underscored: true
});

export default Lista;