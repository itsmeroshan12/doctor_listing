// controllers/clinicController.js
const db = require('../config/db');

// Helper to generate slugs
const generateSlug = (name) => name.toLowerCase().replace(/\s+/g, '-');

exports.createClinic = async (req, res) => {
  try {
    const {
      name,
      doctorName,
      mobile,
      email,
      address,
      website,
      experience,
      specialization,
      area,
      category,
      description,
      type,
    } = req.body;

    if (!name || !type || !area) {
      return res.status(400).json({ message: 'Name, type, and area are required' });
    }

    const slug = generateSlug(name);

    const clinicImage = req.files?.clinicImage?.[0]?.filename || null;
    const doctorImage = req.files?.doctorImage?.[0]?.filename || null;
    const otherImage = req.files?.otherImage?.[0]?.filename || null;

    const [result] = await db.execute(
      `INSERT INTO clinics 
      (name, doctorName, mobile, email, address, website, experience, specialization, area, category, description, type, clinicImage, doctorImage, otherImage, slug) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        doctorName,
        mobile,
        email,
        address,
        website,
        experience,
        specialization,
        area,
        category,
        description,
        type,
        clinicImage,
        doctorImage,
        otherImage,
        slug,
      ]
    );

    const newClinic = {
      id: result.insertId,
      name,
      slug,
      area,
      type,
      clinicImage,
      doctorImage,
      otherImage,
    };

    res.status(201).json(newClinic);
  } catch (error) {
    console.error('Error adding clinic:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getClinicBySlug = async (req, res) => {
  const { slug, type, area } = req.params;

  try {
    const [rows] = await db.execute(
      'SELECT * FROM clinics WHERE slug = ? AND LOWER(type) = ? AND LOWER(area) = ? LIMIT 1',
      [slug, type.toLowerCase().replace(/-/g, ' '), area.toLowerCase()]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Clinic not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.filterClinics = async (req, res) => {
  const { area, type, name } = req.query;

  let query = 'SELECT * FROM clinics WHERE 1=1';
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

  try {
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
