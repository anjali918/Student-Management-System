# EduManage - Academic Management System

A mern-stack web application for managing academic data including students, courses, and users with role-based access control.

## Features

- **User Management**: Admin, Teacher, and Student roles
- **Student Management**: CRUD operations for student records
- **Course Management**: Manage courses and enrollments
- **Authentication**: JWT-based authentication
- **Role-based Access**: Different permissions for different user types
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Backend
- **Node.js** with **Express.js**
- **MongoDb** database with **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing

### Frontend
- **HTML5**, **CSS3**, **JavaScript**
- **Responsive design** with modern CSS
- **RESTful API** integration

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MOngoDb

### 1. Database Setup

1. **Create MongoDb Database**:

### 2. Backend Setup

```bash
cd backend
npm install
node seed.js  # This creates tables and populates sample data
npm start
```

### 3. Frontend Setup

```bash
# Install http-server globally (if not already installed)
npm install -g http-server

# Serve the frontend
http-server "Final code/Code" -p 3000 --cors -c-1 --index index.html
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api

## Sample Login Credentials

After running the seeder, use these credentials:

- **Admin**: admin@edumanage.com / admin123
- **Teacher**: teacher1@edumanage.com / teacher123
- **Student**: student1@edumanage.com / student123

## Project Structure

```
├── backend/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── middleware/
│   │   └── auth.js              # Authentication middleware
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Student.js           # Student model
│   │   └── Course.js            # Course model
│   ├── routes/
│   │   ├── users.js             # User routes
│   │   ├── students.js          # Student routes
│   │   └── courses.js           # Course routes
│   ├── .env                     # Environment variables
│   ├── package.json
│   ├── seed.js                  # Database seeder
│   ├── server.js                # Main server file
│   └── README.md                # Backend setup guide
├── Final code/Code/              # Frontend files
│   ├── index.html               # Main page
│   ├── students.html            # Students page
│   ├── courses.html             # Courses page
│   ├── admin.html               # Admin dashboard
│   ├── teacher.html             # Teacher dashboard
│   ├── js/
│   │   ├── script.js            # Main JavaScript
│   │   ├── admin.js             # Admin functionality
│   │   └── teacher.js           # Teacher functionality
│   └── css/
│       ├── styles.css           # Main styles
│       └── page-styles/         # Page-specific styles
└── README.md                    # This file
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile

### Users (Admin only)
- `GET /api/users` - Get all users
- `PUT /api/users/:id/approve` - Approve user
- `DELETE /api/users/:id` - Delete user

### Students (Admin, Teacher)
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create student (Admin only)
- `PUT /api/students/:id` - Update student (Admin only)
- `DELETE /api/students/:id` - Delete student (Admin only)

### Courses (Authenticated users)
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (Admin only)
- `PUT /api/courses/:id` - Update course (Admin only)
- `DELETE /api/courses/:id` - Delete course (Admin only)

## Development

### Running in Development Mode

**Backend**:
```bash
cd backend
npm install -g nodemon
nodemon server.js
```

**Frontend**:
```bash
http-server "Final code/Code" -p 3000 --cors -c-1 --index index.html
```

### Database Management

- Use MongoDb for database visualization and management
- The seeder script (`seed.js`) can be run multiple times to reset data
- Tables are automatically created when the server starts 

## Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Ensure MongoDb server is running
   - Verify credentials in `.env`
   - Check if database `edumanage` exists

2. **Port Already in Use**:
   - Change PORT in `.env` for backend
   - Change port in http-server command for frontend

3. **CORS Issues**:
   - Make sure both servers are running with CORS enabled
   - Frontend server should have `--cors` flag

4. **Authentication Issues**:
   - Ensure JWT_SECRET is set in `.env`
   - Check if user is approved (admin approval required)

### Logs and Debugging

- Backend logs are displayed in the terminal
- Frontend errors appear in browser console
- Database queries can be logged by setting `logging: true` in `database.js`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the backend README for detailed setup
3. Ensure all prerequisites are met
4. Check browser console and server logs for errors
