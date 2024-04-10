const { pool } = require('../db/db');

// Función para obtener todas las carreras
const getCarreras = async (req, res) => {
    try {
      const query = 'SELECT * FROM Carreras';
      const { rows } = await pool.query(query);
      res.json(rows);
    } catch (error) {
      console.error('Error al obtener las carreras:', error);
      res.status(500).json({ message: 'Error al obtener las carreras' });
    }
};

// Función para crear una nueva carrera
const createCarrera = async (req, res) => {
    const { Carrera, Creditos } = req.body;
    try {
      const query = 'INSERT INTO Carreras (Carrera, Creditos) VALUES ($1, $2) RETURNING *';
      const values = [Carrera, Creditos];
      const { rows } = await pool.query(query, values);
      res.json(rows[0]); // Devolvemos la carrera creada
    } catch (error) {
      console.error('Error al crear la carrera:', error);
      res.status(500).json({ message: 'Error al crear la carrera' });
    }
};

// Función para actualizar una carrera
const updateCarrera = async (req, res) => {
    const id = req.params.id;
    const { Carrera, Creditos } = req.body;
    try {
      const query = 'UPDATE Carreras SET Carrera = $1, Creditos = $2 WHERE ID_Carrera = $3';
      const values = [Carrera, Creditos, id];
      await pool.query(query, values);
      res.status(200).json({ message: 'Carrera actualizada exitosamente' });
    } catch (error) {
      console.error('Error al actualizar la carrera:', error);
      res.status(500).json({ message: 'Error al actualizar la carrera' });
    }
};

// Función para eliminar una carrera
const deleteCarrera = async (req, res) => {
    try {
      const id = req.params.id;
      await pool.query('DELETE FROM Carreras WHERE ID_Carrera = $1', [id]);
      res.status(200).json({ message: 'Carrera eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar la carrera:', error);
      res.status(500).json({ message: 'Error al eliminar la carrera' });
    }
};

module.exports = {
    getCarreras,
    createCarrera,
    updateCarrera,
    deleteCarrera
};