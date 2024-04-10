const { pool } = require('../db/db');

// Función para obtener todas las especialidades
const getEspecialidades = async (req, res) => {
    try {
      const query = 'SELECT * FROM Especialidades';
      const { rows } = await pool.query(query);
      res.json(rows);
    } catch (error) {
      console.error('Error al obtener las especialidades:', error);
      res.status(500).json({ message: 'Error al obtener las especialidades' });
    }
};

// Función para crear una nueva especialidad
const createEspecialidad = async (req, res) => {
    const { Especialidad, Creditos, ID_Carrera } = req.body;
    try {
      const query = 'INSERT INTO Especialidades (Especialidad, Creditos, ID_Carrera) VALUES ($1, $2, $3) RETURNING *';
      const values = [Especialidad, Creditos, ID_Carrera];
      const { rows } = await pool.query(query, values);
      res.json(rows[0]); // Devolvemos la especialidad creada
    } catch (error) {
      console.error('Error al crear la especialidad:', error);
      res.status(500).json({ message: 'Error al crear la especialidad' });
    }
};

// Función para actualizar una especialidad
const updateEspecialidad = async (req, res) => {
    const id = req.params.id;
    const { Especialidad, Creditos, ID_Carrera } = req.body;
    try {
      const query = 'UPDATE Especialidades SET Especialidad = $1, Creditos = $2, ID_Carrera = $3 WHERE ID_Especialidad = $4';
      const values = [Especialidad, Creditos, ID_Carrera, id];
      await pool.query(query, values);
      res.status(200).json({ message: 'Especialidad actualizada exitosamente' });
    } catch (error) {
      console.error('Error al actualizar la especialidad:', error);
      res.status(500).json({ message: 'Error al actualizar la especialidad en la base de datos' });
    }
};

// Función para eliminar una especialidad
const deleteEspecialidad = async (req, res) => {
    try {
      const id = req.params.id;
      await pool.query('DELETE FROM Especialidades WHERE ID_Especialidad = $1', [id]);
      res.status(200).json({ message: 'Especialidad eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar la especialidad:', error);
      res.status(500).json({ message: 'Error al eliminar la especialidad en la base de datos' });
    }
};

module.exports = {
    getEspecialidades,
    createEspecialidad,
    updateEspecialidad,
    deleteEspecialidad
};