import Estudiante from './Estudiante.js';
import Curso from './Curso.js';
import Lista from './Lista.js';
import EstudianteLista from './EstudianteLista.js';

// Relaciones Curso - Estudiante (1:N)
Curso.hasMany(Estudiante, {
  foreignKey: 'curso_id',
  as: 'estudiantes'  
})

Estudiante.belongsTo(Curso, {
    foreignKey: 'curso_id',
    as: 'curso'
})

// Relacion muchos a muchos Lista -Estudiante
Lista.belongsToMany(Estudiante, {
    through: EstudianteLista,
    foreignKey: 'lista_id',
    otherKey: 'estudiante_id',
    as: 'estudiantes'
})

Estudiante.belongsToMany(Lista, {
    through: EstudianteLista,
    foreignKey: 'estudiante_id',
    otherKey: 'lista_id',
    as: 'listas'
})

//Relaciones directas para acceder a la tabla intermedia
Lista.hasMany(EstudianteLista, {
    foreignKey: 'lista_id',
    as: 'estudiante_listas'
})

EstudianteLista.belongsTo(Lista,{
    foreignKey: 'lista_id',
    as: 'lista'
})

Estudiante.hasMany(EstudianteLista, {
    foreignKey: 'estudiante_id',
    as: 'estudiante_listas'
})

EstudianteLista.belongsTo(Estudiante,{
    foreignKey: 'estudiante_id',
    as: 'estudiante'
})

export { Estudiante, Lista, EstudianteLista, Curso};