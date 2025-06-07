// components/ClinicList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClinicList = () => {
  const [filters, setFilters] = useState({ name: '', type: '', area: '' });
  const [clinics, setClinics] = useState([]);

  const fetchClinics = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/clinics', { params: filters });
      setClinics(res.data);
    } catch (error) {
      console.error('Error fetching clinics:', error);
    }
  };

  useEffect(() => {
    fetchClinics();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h2>Search Clinics</h2>
      <div className="row g-2 mb-3">
        <div className="col">
          <input name="name" className="form-control" placeholder="Name" onChange={handleChange} />
        </div>
        <div className="col">
          <input name="type" className="form-control" placeholder="Type" onChange={handleChange} />
        </div>
        <div className="col">
          <input name="area" className="form-control" placeholder="Area" onChange={handleChange} />
        </div>
      </div>

      <ul className="list-group">
        {clinics.map((clinic) => (
          <li key={clinic.id} className="list-group-item">
            <strong>{clinic.name}</strong> – {clinic.type}, {clinic.area}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClinicList;
