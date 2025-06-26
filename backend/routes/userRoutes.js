const express = require('express');
const { getUserListings } = require('../controllers/userController');
const authenticateJWT = require('../middleware/authMiddleware');// Adjust path as needed

const router = express.Router();

router.get('/listings', authenticateJWT, getUserListings);

module.exports = router;
