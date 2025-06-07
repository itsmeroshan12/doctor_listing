const db = require('../config/db');

async function createHospital({ name, area, slug }) {
  const sql = `INSERT INTO hospitals (name, area, slug) VALUES (?, ?, ?)`;
  const [result] = await db.execute(sql, [name, area, slug]);
  return { id: result.insertId, name, area, slug };
}

async function getHospitalBySlug(slug, area) {
  const sql = `SELECT * FROM hospitals WHERE slug = ? AND LOWER(area) = LOWER(?) LIMIT 1`;
  const [rows] = await db.execute(sql, [slug, area]);
  return rows[0]; // undefined if not found
}

async function filterHospitals({ name, area }) {
  let sql = 'SELECT * FROM hospitals WHERE 1=1';
  const params = [];

  if (name) {
    sql += ' AND name LIKE ?';
    params.push(`%${name}%`);
  }

  if (area) {
    sql += ' AND LOWER(area) = LOWER(?)';
    params.push(area);
  }

  const [rows] = await db.execute(sql, params);
  return rows;
}

module.exports = {
  createHospital,
  getHospitalBySlug,
  filterHospitals,
};
