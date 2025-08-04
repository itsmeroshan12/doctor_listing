# Healthcare Application

A full-stack healthcare application built with React frontend and Node.js backend, designed to connect patients with healthcare providers including doctors, clinics, and hospitals.

## 🏗️ Project Structure

```
├── backend/          # Node.js/Express API server
│   ├── config/       # Database configuration
│   ├── controllers/  # Route controllers
│   ├── middleware/   # Custom middleware
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── uploads/      # File uploads
│   ├── utils/        # Utility functions
│   └── server.js     # Main server file
├── frontend/         # React application
│   ├── public/       # Static files
│   ├── src/          # React source code
│   └── package.json  # Frontend dependencies
└── README.md         # This file
```

## 🚀 Features

- **User Authentication**: Secure login/register system with JWT tokens
- **Healthcare Provider Management**: Doctors, clinics, and hospitals
- **Search Functionality**: Find healthcare providers by location, specialty, etc.
- **File Upload**: Support for profile images and documents
- **Email Notifications**: Using Nodemailer for communication
- **Responsive Design**: Modern UI with Material-UI and Bootstrap

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **Multer** - File uploads
- **Nodemailer** - Email service
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - JavaScript library
- **Material-UI** - UI component library
- **Bootstrap** - CSS framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Swiper** - Carousel/slider
- **FontAwesome** - Icons

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MySQL** database server
- **Git**

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## 🚀 Running the Application

### Start the Backend Server
```bash
cd backend
npm start
```
The backend server will run on `http://localhost:5000`

### Start the Frontend Development Server
```bash
cd frontend
npm start
```
The React app will run on `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Healthcare Providers
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get specific doctor
- `POST /api/doctors` - Create doctor profile
- `PUT /api/doctors/:id` - Update doctor profile

- `GET /api/clinics` - Get all clinics
- `GET /api/clinics/:id` - Get specific clinic
- `POST /api/clinics` - Create clinic profile

- `GET /api/hospitals` - Get all hospitals
- `GET /api/hospitals/:id` - Get specific hospital
- `POST /api/hospitals` - Create hospital profile

### Search
- `GET /api/search` - Search healthcare providers

## 🗄️ Database Schema

The application uses MySQL with the following main entities:
- **Users** - Patient accounts
- **Doctors** - Healthcare provider profiles
- **Clinics** - Medical clinic information
- **Hospitals** - Hospital information
- **Appointments** - Booking system (if implemented)

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- CORS configuration
- Input validation and sanitization
- Secure file upload handling

## 📱 Features

### For Patients
- Browse healthcare providers
- Search by location and specialty
- View provider profiles and ratings
- Book appointments (if implemented)

### For Healthcare Providers
- Create and manage profiles
- Upload documents and images
- Manage availability
- Receive patient inquiries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

If you have any questions or need support, please open an issue in the repository.

## 🔄 Version History

- **v1.0.0** - Initial release with basic healthcare provider management

---

**Note**: Make sure to update the environment variables and database configuration according to your setup before running the application.