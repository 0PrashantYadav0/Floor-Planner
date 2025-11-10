# Floor Planner

An intelligent floor plan management system for efficient room booking and space utilization. This application provides a comprehensive solution for managing floors, rooms, and bookings with smart recommendations and admin capabilities.

## Features

- 🔐 **Authentication System**: Secure JWT-based authentication with role-based access control
- 🏢 **Floor Management**: Create, update, and manage floors and rooms (Admin)
- 📅 **Room Booking**: Book rooms with capacity, duration, and date selection
- 🧠 **Smart Recommendations**: AI-powered room suggestions based on requirements
- 📊 **Booking Management**: View and manage your bookings
- 🔒 **Protected Routes**: Secure routes with authentication and authorization
- 📱 **Responsive Design**: Mobile-first design with modern UI
- 🎨 **Modern UI**: Beautiful gradient designs and smooth transitions

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- Merkle Tree (Version Control)

### Frontend
- React 18
- React Router DOM
- Axios
- Tailwind CSS
- React Konva
- Context API

## Project Structure

```
Intelligent-Floor-Plan-Management-System-main/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── Models/
│   ├── routes/
│   ├── services/
│   ├── version_control/
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the backend directory:
   ```env
   PORT=3001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

4. **Create admin user**
   ```bash
   npm run seed:admin
   ```
   This will create an admin user with:
   - Username: `admin`
   - Email: `admin@gmail.com`
   - Password: `admin123`
   - Role: `admin`
   
   **⚠️ Important:** Change the password after first login in production!

5. **Start the backend server**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:3001`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:3001/api
   ```

4. **Start the frontend development server**
   ```bash
   npm start
   ```

   The application will start on `http://localhost:3000`

## Usage

### User Registration
1. Navigate to the Sign Up page
2. Enter username, email, and password
3. Click "Sign Up" to create an account

### User Login
1. Navigate to the Login page
2. Enter email and password
3. Click "Sign In" to login

### Booking a Room
1. Login to your account
2. Navigate to "Book Room"
3. Select floor, room, capacity, duration, and date
4. Click "Book Room" to create a booking

### Smart Recommendations
1. Navigate to "Smart Recommendation"
2. Enter capacity, duration, date, and priority
3. Click "Get Suggestion" to get room recommendations
4. Click "Book Now" to book the suggested room

### Admin Dashboard
1. Login as an admin user (use `admin@gmail.com` / `admin123` for default admin)
2. Navigate to "Admin Dashboard"
3. Manage floors and rooms
4. Add, update, or remove floors and rooms

**Default Admin Credentials:**
- Email: `admin@gmail.com`
- Password: `admin123`
- **⚠️ Remember to change the password in production!**

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get user's bookings
- `GET /api/bookings/floors` - Get all floors

### Admin
- `GET /api/admin/floors` - Get all floors
- `POST /api/admin/add-floor` - Add a new floor
- `DELETE /api/admin/remove-floor/:id` - Remove a floor
- `POST /api/admin/add-room/:floorId` - Add a room to a floor
- `PUT /api/admin/update-room/:floorId/:roomId` - Update a room
- `DELETE /api/admin/remove-room/:floorId/:roomId` - Remove a room

### Suggestions
- `POST /api/suggest-rooms` - Get room suggestions

## Design Patterns

### Backend
- **MVC Pattern**: Separation of concerns
- **Service Layer Pattern**: Business logic abstraction
- **Middleware Pattern**: Authentication and authorization
- **Repository Pattern**: Data access abstraction

### Frontend
- **Component Composition**: Reusable components
- **Context Pattern**: Global state management
- **Service Layer Pattern**: API abstraction
- **Protected Route Pattern**: Route protection

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Role-based access control (RBAC)
- Input validation
- Error handling
- Protected routes

## System Design Principles

- **Separation of Concerns**: Clear separation between frontend and backend
- **Modularity**: Modular code structure
- **Scalability**: Designed for scalability
- **Maintainability**: Clean and maintainable code
- **Security**: Secure authentication and authorization
- **Error Handling**: Comprehensive error handling
- **Documentation**: Comprehensive documentation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Push to the branch
6. Create a Pull Request

## License

ISC

## Authors

- Floor Planner Team

## Acknowledgments

- MongoDB for database
- React team for the amazing framework
- Express.js for the web framework
- Tailwind CSS for the styling framework
