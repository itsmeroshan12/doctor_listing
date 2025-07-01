const express = require('express');
const router = express.Router();

const {
  createDoctor,
  getDoctorBySlug,
  filterDoctors,
  getDoctorsByUser
} = require('../controllers/doctorController');

const { uploadFields } = require('../middleware/multer'); // 🖼️ for doctorImage, clinicImage, otherImage
const authenticateJWT = require('../middleware/authMiddleware');

// 🩺 POST: Create new doctor (Auth + Image Upload)
router.post('/', authenticateJWT, uploadFields, createDoctor);

// 🔍 GET: Filter/Search doctors
router.get('/', filterDoctors);

// 👨‍⚕️ GET: Doctors added by logged-in user
router.get('/mydoctors', authenticateJWT, getDoctorsByUser);

// 🔗 GET: Single doctor by category + slug (SEO-friendly)
router.get('/:area/:category/:slug', getDoctorBySlug);

// DELETE: Remove doctor by ID
router.delete('/:id', authenticateJWT, require('../controllers/doctorController').deleteDoctor);


module.exports = router;

