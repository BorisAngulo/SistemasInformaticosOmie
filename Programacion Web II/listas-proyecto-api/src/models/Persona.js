import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Persona = sequelize.define( 'Persona', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nacionalidad: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
},{
    timestamps: true,
    tableName: 'personas',
    underscored: true
});

export default Persona;