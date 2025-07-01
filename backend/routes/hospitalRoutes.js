const express = require('express');
const router = express.Router();

const {
  createHospital,
  getHospitalBySlug,
  filterHospitals,
  getHospitalsByUser
} = require('../controllers/hospitalController');

const { uploadFields } = require('../middleware/multer'); // ✅ for clinicImage, doctorImage, otherImage
const authenticateJWT = require('../middleware/authMiddleware');


// 🏥 POST: Create new hospital (Auth + Image Upload)
router.post('/', authenticateJWT, uploadFields, createHospital);

// 🔍 GET: Filter/Search hospitals
router.get('/', filterHospitals);

// 👤 GET: Hospitals added by logged-in user
router.get('/myhospitals', authenticateJWT, getHospitalsByUser);

// 🔗 GET: Single hospital by area + category + slug (SEO-friendly)
router.get('/:area/:category/:slug', getHospitalBySlug);

// 🗑️ DELETE: Delete hospital by ID (Authenticated)
router.delete('/:id', authenticateJWT, require('../controllers/hospitalController').deleteHospital);


module.exports = router;
