const express = require('express');
const router = express.Router();
const { createClinic, getClinicBySlug, filterClinics, getClinicsByUser } = require('../controllers/clinicController');
const { uploadFields } = require('../middleware/multer');
const authenticateJWT = require('../middleware/authMiddleware'); // ✅ correct

router.post('/', authenticateJWT, uploadFields, createClinic);
router.get('/:area/:type/:slug', getClinicBySlug);
router.get('/', filterClinics);
router.get('/myclinics', authenticateJWT, getClinicsByUser); // ✅ NEW route

module.exports = router;
