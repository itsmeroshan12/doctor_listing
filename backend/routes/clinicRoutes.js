const express = require('express');
const router = express.Router();
const { createClinic, getClinicBySlug, filterClinics } = require('../controllers/clinicController');
const { uploadFields } = require('../middleware/multer'); // ✅ multer config

router.post('/', uploadFields, createClinic); // ✅ make sure multer is applied
router.get('/:area/:type/:slug', getClinicBySlug);
router.get('/', filterClinics);

module.exports = router;
