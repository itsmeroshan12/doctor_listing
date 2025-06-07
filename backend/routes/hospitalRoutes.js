const express = require('express');
const router = express.Router();
const { createHospital, getHospitalBySlug, filterHospitals } = require('../controllers/hospitalController');

router.post('/', createHospital);
router.get('/:area/:slug', getHospitalBySlug);

// Filter hospitals
router.get('/', filterHospitals);


module.exports = router;
