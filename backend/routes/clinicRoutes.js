const express = require('express');
const router = express.Router();
const {
  createClinic,
  getClinicBySlug,
  filterClinics,
  getClinicsByUser
} = require('../controllers/clinicController');
const { uploadFields } = require('../middleware/multer');
const authenticateJWT = require('../middleware/authMiddleware');

// Routes
router.post('/', authenticateJWT, uploadFields, createClinic);
router.get('/', filterClinics);
router.get('/myclinics', authenticateJWT, getClinicsByUser);

// ✅ FIXED: Removed extra /clinics
router.get('/:area/:category/:slug', getClinicBySlug);

// DELETE: Remove clinic by ID
router.delete('/:id', authenticateJWT, require('../controllers/clinicController').deleteClinic);


module.exports = router;
