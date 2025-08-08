# Seat Reservation System

A modern seat reservation system built for SLT interns using React frontend and Node.js backend.

## 🚀 Features

- **User Authentication**: Register and login with JWT tokens
- **Seat Management**: View and manage available seats
- **Reservation System**: Book, update, and cancel seat reservations
- **Admin Dashboard**: Manage users, seats, and reservations
- **Real-time Updates**: Live seat availability status
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- React 19
- Styled Components
- Axios for API calls
- React Router for navigation
- Recharts for data visualization

### Backend
- Node.js with Express
- MySQL database with Sequelize ORM
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled for frontend communication

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v16 or higher)
- MySQL database
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd seat-reservation-system
```

### 2. Install dependencies
```bash
npm run install-all
```

### 3. Database Setup
1. Create a MySQL database named `seat_reservation_db`
2. Update the database configuration in `backend/.env`:
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=seat_reservation_db
DB_PORT=3306
```

### 4. Environment Configuration
Create a `.env` file in the `backend` directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:3000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=seat_reservation_db
DB_PORT=3306
```

### 5. Start the application
```bash
npm start
```

This will start both the backend server (port 5000) and frontend development server (port 3000).

## 📁 Project Structure

```
seat-reservation-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── reservationController.js
│   │   └── seatController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── validationMiddleware.js
│   ├── models/
│   │   ├── Reservation.js
│   │   ├── Seat.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── reservationRoutes.js
│   │   ├── seatRoutes.js
│   │   └── testRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   └── App.jsx
│   └── package.json
├── database/
│   └── schema.sql
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Seats
- `GET /api/seats` - Get all seats
- `GET /api/seats/available` - Get available seats for date/time
- `POST /api/seats` - Create a new seat (admin only)
- `GET /api/seats/:id` - Get specific seat
- `PUT /api/seats/:id` - Update seat (admin only)
- `DELETE /api/seats/:id` - Delete seat (admin only)

### Reservations
- `GET /api/reservations` - Get all reservations (admin only)
- `GET /api/reservations/user` - Get user's reservations
- `POST /api/reservations` - Create a new reservation
- `GET /api/reservations/:id` - Get specific reservation
- `PUT /api/reservations/:id` - Update reservation
- `DELETE /api/reservations/:id` - Delete reservation

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. When a user logs in successfully, a JWT token is returned and stored in localStorage. This token is automatically included in all subsequent API requests.

## 🌐 CORS Configuration

The backend is configured with CORS to allow requests from the frontend (http://localhost:3000). This ensures proper communication between the frontend and backend.

## 🚀 Development

### Running Backend Only
```bash
cd backend
npm run dev
```

### Running Frontend Only
```bash
cd frontend
npm start
```

### Building for Production
```bash
npm run build
```

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MySQL is running
   - Check database credentials in `.env`
   - Verify database exists

2. **CORS Errors**
   - Ensure frontend URL is correct in backend `.env`
   - Check that both servers are running

3. **Port Already in Use**
   - Change PORT in backend `.env`
   - Update API_BASE_URL in frontend `api.js`

4. **JWT Token Issues**
   - Clear localStorage and login again
   - Check JWT_SECRET in backend `.env`

## 📝 Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `FRONTEND_URL`: Frontend URL for CORS
- `JWT_SECRET`: Secret key for JWT tokens
- `DB_HOST`: Database host
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `DB_PORT`: Database port

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please contact the development team. 