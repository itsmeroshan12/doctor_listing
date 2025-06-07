const Hospital = require('../models/Hospital');

exports.createHospital = async (req, res) => {
  try {
    const { name, area } = req.body;
    if (!name || !area) return res.status(400).json({ message: 'Name and area required' });

    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const hospital = await hospitalModel.createHospital({ name, area, slug });

    res.status(201).json(hospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHospitalBySlug = async (req, res) => {
  try {
    const { slug, area } = req.params;
    const hospital = await hospitalModel.getHospitalBySlug(slug, area);
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
    res.json(hospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.filterHospitals = async (req, res) => {
  try {
    const { name, area } = req.query;
    const hospitals = await hospitalModel.filterHospitals({ name, area });
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
