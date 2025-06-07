const Doctor = require('../models/Doctor');

exports.createDoctor = async (req, res) => {
  try {
    const { name, specialty, area } = req.body;
    if (!name || !specialty || !area) 
      return res.status(400).json({ message: 'Name, specialty and area are required' });

    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const doctor = await doctorModel.createDoctor({ name, specialty, area, slug });

    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDoctorBySlug = async (req, res) => {
  try {
    const { slug, specialty, area } = req.params;

    const doctor = await doctorModel.getDoctorBySlug(slug, specialty, area);

    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.filterDoctors = async (req, res) => {
  try {
    const { name, specialty, area } = req.query;

    const doctors = await doctorModel.filterDoctors({ name, specialty, area });

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
