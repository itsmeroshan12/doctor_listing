const db = require('../config/db');

// Helper to generate a URL-friendly slug
const generateSlug = (name) =>
  name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '') + '-' + Date.now();

// ✅ Create a new hospital
exports.createHospital = async (req, res) => {
  try {
    console.log('🆕 Creating Hospital for user:', req.user?.userId);
    console.table(req.body);

    const {
      name,
      mobile,
      email,
      address,
      website,
      area,
      category,
      description,
      type,
    } = req.body;

    const user_id = req.user?.userId || null;

    if (!name || !type || !area) {
      return res.status(400).json({ message: 'Name, type, and area are required' });
    }

    const slug = generateSlug(name);
    const hospitalImage = req.files?.hospitalImage?.[0]?.filename || null;
    const otherImage = req.files?.otherImage?.[0]?.filename || null;

    const createdAt = new Date();
    const updatedAt = new Date();

    const values = [
      name,
      mobile,
      email,
      address,
      website,
      area,
      category,
      description,
      type,
      hospitalImage,
      otherImage,
      slug,
      createdAt,
      updatedAt,
      user_id,
    ];

    const [result] = await db.execute(
      `INSERT INTO hospitals 
      (name, mobile, email, address, website, area, category, description, type, hospitalImage, otherImage, slug, createdAt, updatedAt, user_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      values
    );

    res.status(201).json({
      id: result.insertId,
      name,
      slug,
      area,
      type,
      hospitalImage,
      otherImage,
    });
  } catch (error) {
    console.error('❌ Error adding hospital:', error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get hospital by slug, area, and category
exports.getHospitalBySlug = async (req, res) => {
  const { slug = '', area = '', category = '' } = req.params;

  try {
    const cleanedArea = area.toLowerCase().trim().replace(/\s+/g, '-');
    const cleanedCategory = category.toLowerCase().trim().replace(/\s+/g, '-');

    const query = `
      SELECT * FROM hospitals 
      WHERE slug = ?
        AND REPLACE(LOWER(TRIM(area)), ' ', '-') = ?
        AND REPLACE(LOWER(TRIM(category)), ' ', '-') = ?
      LIMIT 1
    `;

    const [rows] = await db.execute(query, [slug, cleanedArea, cleanedCategory]);

    if (rows.length === 0) {
      console.warn('Hospital not found for:', { slug, cleanedArea, cleanedCategory });
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('❌ Error fetching hospital by slug:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get hospitals added by the logged-in user
exports.getHospitalsByUser = async (req, res) => {
  const userId = req.user?.userId;

  try {
    const [results] = await db.execute(
      'SELECT * FROM hospitals WHERE user_id = ? ORDER BY createdAt DESC',
      [userId]
    );
    res.json(results);
  } catch (err) {
    console.error('❌ Error fetching user hospitals:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Filter hospitals by name, area, or type
exports.filterHospitals = async (req, res) => {
  const { area, type, name } = req.query;

  let query = 'SELECT * FROM hospitals WHERE 1=1';
  const params = [];

  if (area) {
    query += ' AND area LIKE ?';
    params.push(`%${area}%`);
  }

  if (type) {
    query += ' AND type LIKE ?';
    params.push(`%${type}%`);
  }

  if (name) {
    query += ' AND name LIKE ?';
    params.push(`%${name}%`);
  }

  query += ' ORDER BY createdAt DESC';

  try {
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error('❌ Error filtering hospitals:', error);
    res.status(500).json({ error: error.message });
  }
};
