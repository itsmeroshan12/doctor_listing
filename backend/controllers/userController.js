const db = require('../config/db');

// Get all clinics (or listings) by logged-in user
exports.getUserListings = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const [clinics] = await db.execute(
      'SELECT * FROM clinics WHERE user_id = ? ORDER BY createdAt DESC',
      [userId]
    );

    res.status(200).json(clinics);
  } catch (error) {
    console.error('Error fetching user listings:', error);
    res.status(500).json({ message: 'Failed to fetch user listings' });
  }
};
