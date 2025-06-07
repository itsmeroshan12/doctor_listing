// backend/routes/doctorRoutes.js

const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.post('/', doctorController.createDoctor);
router.get('/slug/:slug/:specialty/:area', doctorController.getDoctorBySlug);
router.get('/filter', doctorController.filterDoctors);

module.exports = router;
