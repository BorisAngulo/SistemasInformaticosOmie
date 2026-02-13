import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Curso = sequelize.define( 'Curso', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,   
        autoIncrement: true
    },
    nombreCurso:{
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    codigoCurso:{
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    gestion:{
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
}, {
    timestamps: true,
    tableName: 'cursos',
    underscored: true
});

export default Curso;