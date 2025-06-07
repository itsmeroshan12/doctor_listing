// routes/clinicRoutes.js
const express = require('express');
const router = express.Router();
const { createClinic, getClinicBySlug, filterClinics  } = require('../controllers/clinicController');

// POST /api/clinics
router.post('/', createClinic);

// GET /api/clinics/:area/:type/:slug
router.get('/:area/:type/:slug', getClinicBySlug);

// Filter route
router.get('/', filterClinics);

module.exports = router;