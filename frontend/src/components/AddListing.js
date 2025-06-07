// components/AddListing.js
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  TextField,
  Autocomplete,
  Button,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";

const categories = [
  "General",
  "Orthopedic",
  "Dental",
  "Cardiology",
  "ENT",
  "Dermatology",
  "Neurology",
  "Gynecology",
];

const areas = [
  "Baner",
  "Kothrud",
  "Wakad",
  "Hinjewadi",
  "Aundh",
  "Kharadi",
  "Hadapsar",
];

const AddListing = () => {
  const [formData, setFormData] = useState({
    name: "",
    doctorName: "",
    mobile: "",
    email: "",
    address: "",
    website: "",
    experience: "",
    specialization: "",
    area: "",
    category: "",
    description: "",
    type: "",
    clinicImage: null,
    doctorImage: null,
    otherImage: null, // ✅ NEW FIELD
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await axios.post("http://localhost:5000/api/listings", data);
      toast.success("Listing added successfully");

      // Reset form
      setFormData({
        name: "",
        doctorName: "",
        mobile: "",
        email: "",
        address: "",
        website: "",
        experience: "",
        specialization: "",
        area: "",
        category: "",
        description: "",
        type: "",
        clinicImage: null,
        doctorImage: null,
        otherImage: null, // 
      });
    } catch (err) {
      toast.error("Error adding listing");
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 5, p: 3, boxShadow: 3 }}>
      <Typography variant="h5" align="center" mb={3}>
        Add Listing
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          select
          label="Listing Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          <MenuItem value="doctor">Doctor</MenuItem>
          <MenuItem value="clinic">Clinic</MenuItem>
          <MenuItem value="hospital">Hospital</MenuItem>
        </TextField>

        <TextField
          label="Clinic/Hospital Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Doctor Name"
          name="doctorName"
          value={formData.doctorName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Mobile Number"
          name="mobile"
          value={formData.mobile}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/[^0-9]/g, "");
            setFormData((prev) => ({ ...prev, mobile: onlyNums }));
          }}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Website URL"
          name="website"
          value={formData.website}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Experience (years)"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <Autocomplete
          freeSolo
          options={areas}
          value={formData.area}
          onChange={(e, newValue) =>
            setFormData((prev) => ({ ...prev, area: newValue || "" }))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Area"
              margin="normal"
              required
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, area: e.target.value }))
              }
            />
          )}
        />

        <Autocomplete
          freeSolo
          options={categories}
          value={formData.category}
          onChange={(e, newValue) =>
            setFormData((prev) => ({ ...prev, category: newValue || "" }))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              margin="normal"
              required
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
            />
          )}
        />

        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />

        <Typography mt={2}>Clinic Image (optional)</Typography>
        <input
          type="file"
          name="clinicImage"
          accept="image/*"
          onChange={handleChange}
          style={{ marginBottom: "1rem" }}
        />

        <Typography>Doctor Image (optional)</Typography>
        <input
          type="file"
          name="doctorImage"
          accept="image/*"
          onChange={handleChange}
          style={{ marginBottom: "1rem" }}
        />

        <Typography>Other Image (optional)</Typography>
        <input
          type="file"
          name="otherImage"
          accept="image/*"
          onChange={handleChange}
          style={{ marginBottom: "1.5rem" }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit Listing
        </Button>
      </form>
    </Box>
  );
};

export default AddListing;
