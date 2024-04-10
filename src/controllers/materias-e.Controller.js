const { pool } = require('../db/db');

// Función para obtener todas las materias de una especialidad
const getMateriasEspecialidad = async (req, res) => {
    try {
      const idEspecialidad = req.params.idEspecialidad;
      const query = `
        SELECT ME.ID_Materia, M.Materia, ME.ID_Especialidad
        FROM Materias_Especialidades ME
        INNER JOIN Materias M ON ME.ID_Materia = M.ID_Materia
        WHERE ME.ID_Especialidad = $1
      `;
      const { rows } = await pool.query(query, [idEspecialidad]);
      res.json(rows);
    } catch (error) {
      console.error('Error al obtener las materias de especialidad:', error);
      res.status(500).json({ message: 'Error al obtener las materias de especialidad' });
    }
};

module.exports = {
    getMateriasEspecialidad
};