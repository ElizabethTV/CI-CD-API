const { pool } = require('../db/db');

// Función para obtener todas las materias
const getMaterias = async (req, res) => {
    try {
      const query = 'SELECT * FROM Materias';
      const { rows } = await pool.query(query);
      res.json(rows);
    } catch (error) {
      console.error('Error al obtener las materias:', error);
      res.status(500).json({ message: 'Error al obtener las materias' });
    }
};

// Función para crear una nueva materia
const createMateria = async (req, res) => {
    const { Materia, Creditos, Semestre, ID_Carrera } = req.body;
    try {
      const query = 'INSERT INTO Materias (Materia, Creditos, Semestre, ID_Carrera) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [Materia, Creditos, Semestre, ID_Carrera];
      const { rows } = await pool.query(query, values);
      res.json(rows[0]); // Devolvemos la materia creada
    } catch (error) {
      console.error('Error al crear la materia:', error);
      res.status(500).json({ message: 'Error al crear la materia' });
    }
};

// Función para actualizar una materia
const updateMateria = async (req, res) => {
    const id = req.params.id;
    const { Materia, Creditos, Semestre, ID_Carrera } = req.body;
    try {
      const query = 'UPDATE Materias SET Materia = $1, Creditos = $2, Semestre = $3, ID_Carrera = $4 WHERE ID_Materia = $5';
      const values = [Materia, Creditos, Semestre, ID_Carrera, id];
      await pool.query(query, values);
      res.status(200).json({ message: 'Materia actualizada exitosamente' });
    } catch (error) {
      console.error('Error al actualizar la materia:', error);
      res.status(500).json({ message: 'Error al actualizar la materia en la base de datos' });
    }
};

// Función para eliminar una materia
const deleteMateria = async (req, res) => {
    try {
      const id = req.params.id;
      await pool.query('DELETE FROM Materias WHERE ID_Materia = $1', [id]);
      res.status(200).json({ message: 'Materia eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar la materia:', error);
      res.status(500).json({ message: 'Error al eliminar la materia en la base de datos' });
    }
};

module.exports = {
    getMaterias,
    createMateria,
    updateMateria,
    deleteMateria
};