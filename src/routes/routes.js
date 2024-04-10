const { Router } = require('express');
const router = Router()
const { getCarreras, createCarrera, updateCarrera, deleteCarrera} = require('../controllers/carrerasController');
const { getEspecialidades, createEspecialidad, updateEspecialidad, deleteEspecialidad} = require('../controllers/especialidadesController');
const { getMaterias, createMateria, updateMateria, deleteMateria} = require('../controllers/materiasController');
const { getMateriasEspecialidad} = require('../controllers/materias-e.Controller');


router.get('/carreras', getCarreras);
router.post('/carreras', createCarrera);
router.put('/carreras/:id', updateCarrera);
router.delete('/carreras/:id', deleteCarrera);

router.get('/especialidades', getEspecialidades);
router.post('/especialidades', createEspecialidad);
router.put('/especialidades/:id', updateEspecialidad);
router.delete('/especialidades/:id', deleteEspecialidad);

router.get('/materias', getMaterias);
router.post('/materias', createMateria);
router.put('/materias/:id', updateMateria);
router.delete('/materias/:id', deleteMateria);

// Ruta para obtener las materias de especialidad por ID de especialidad
router.get('/materias-especialidad/:idEspecialidad', getMateriasEspecialidad);

module.exports = router;