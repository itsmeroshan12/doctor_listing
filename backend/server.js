require('dotenv').config(); // ✅ Load environment variables
const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


// MySQL2 connection pool
const pool = require('./config/db'); // Make sure this exports a mysql2 pool (see below)

// Route files
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const clinicRoutes = require('./routes/clinicRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const searchRoutes = require('./routes/searchRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Your React frontend
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/search', searchRoutes);

app.use('/api', require('./routes/authRoutes'));  // Auth routes

app.use('/auth', authRoutes); // Auth routes
// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Start server after testing DB connection
async function startServer() {
  try {
    // Test DB connection
    await pool.getConnection();
    console.log('✅ MySQL database connected');

    app.listen(5000, () => console.log('🚀 Server running on port 5000'));
  } catch (err) {
    console.error('❌ Error connecting to database:', err);
    process.exit(1); // Stop server if DB connection fails
  }
}

startServer();
