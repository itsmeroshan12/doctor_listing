const db = require('../config/db');

async function createDoctor({ name, specialty, area, slug }) {
  const sql = `INSERT INTO doctors (name, specialty, area, slug) VALUES (?, ?, ?, ?)`;
  const [result] = await db.execute(sql, [name, specialty, area, slug]);
  return { id: result.insertId, name, specialty, area, slug };
}

async function getDoctorBySlug(slug, specialty, area) {
  const sql = `
    SELECT * FROM doctors 
    WHERE slug = ? 
      AND LOWER(specialty) = LOWER(?) 
      AND LOWER(area) = LOWER(?) 
    LIMIT 1
  `;
  const [rows] = await db.execute(sql, [slug, specialty, area]);
  return rows[0]; // undefined if not found
}

async function filterDoctors({ name, specialty, area }) {
  let sql = 'SELECT * FROM doctors WHERE 1=1';
  const params = [];

  if (name) {
    sql += ' AND name LIKE ?';
    params.push(`%${name}%`);
  }

  if (specialty) {
    sql += ' AND LOWER(specialty) = LOWER(?)';
    params.push(specialty);
  }

  if (area) {
    sql += ' AND LOWER(area) = LOWER(?)';
    params.push(area);
  }

  const [rows] = await db.execute(sql, params);
  return rows;
}

module.exports = {
  createDoctor,
  getDoctorBySlug,
  filterDoctors,
};

