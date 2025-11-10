# Floor Planner - Backend

A robust Node.js/Express backend for the Floor Planner application, providing RESTful API endpoints for floor plan management, room booking, and user authentication.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control (Admin/User)
- **User Management**: User registration, login, and profile management
- **Floor Management**: CRUD operations for floors and rooms (Admin only)
- **Room Booking**: Create and manage room bookings
- **Smart Recommendations**: AI-powered room suggestion based on capacity and availability
- **Version Control**: Merkle tree-based versioning for floor plans
- **MongoDB Integration**: MongoDB with Mongoose ODM

## Tech Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

## Project Structure

```
backend/
├── config/
│   └── jwt.js              # JWT configuration
├── controllers/
│   └── authController.js   # Authentication controller
├── middleware/
│   └── auth.js             # Authentication & authorization middleware
├── Models/
│   ├── Booking.js          # Booking model
│   ├── Floor.js            # Floor model
│   └── userModel.js        # User model
├── routes/
│   ├── admin.js            # Admin routes
│   ├── auth.js             # Authentication routes
│   ├── bookings.js         # Booking routes
│   └── suggestion.js       # Room suggestion routes
├── services/
│   └── authService.js      # Authentication service
├── version_control/
│   └── merkleTree.js       # Merkle tree implementation
├── index.js                # Entry point
└── package.json            # Dependencies
```

## Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
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
   - Email: `admin@gmail.com`
   - Password: `admin123`
   - Role: `admin`
   
   **⚠️ Important:** Change the password after first login in production!

5. **Start the server**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:3001`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Bookings

- `POST /api/bookings` - Create a new booking (Protected)
- `GET /api/bookings` - Get user's bookings (Protected)
- `GET /api/bookings/floors` - Get all floors (Protected)

### Admin

- `GET /api/admin/user-role` - Get user role (Protected, Admin)
- `GET /api/admin/floors` - Get all floors (Protected, Admin)
- `POST /api/admin/add-floor` - Add a new floor (Protected, Admin)
- `DELETE /api/admin/remove-floor/:id` - Remove a floor (Protected, Admin)
- `POST /api/admin/add-room/:floorId` - Add a room to a floor (Protected, Admin)
- `PUT /api/admin/update-room/:floorId/:roomId` - Update a room (Protected, Admin)
- `DELETE /api/admin/remove-room/:floorId/:roomId` - Remove a room (Protected, Admin)

### Suggestions

- `POST /api/suggest-rooms` - Get room suggestions (Protected)

### Health Check

- `GET /api/health` - Server health check

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Database Models

### User
- `username`: String (required)
- `useremail`: String (required, unique)
- `password`: String (required, hashed)
- `userimage`: String (optional)
- `role`: String (enum: 'user', 'admin', default: 'user')
- `timestamps`: createdAt, updatedAt

### Floor
- `floor_no`: Number (required, unique)
- `rooms`: Array of Room objects
- `version`: Number (default: 1)
- `merkleHash`: String
- `timestamps`: createdAt, updatedAt

### Booking
- `floor_no`: Number (required)
- `room_no`: String (required)
- `max_cap`: Number (required)
- `time_duration`: Number (required, in minutes)
- `date`: Date (required)
- `priority_no`: Number (default: 0)
- `waiting_no`: Number (default: 0)
- `user_email`: String (required)
- `timestamps`: createdAt, updatedAt

## Design Patterns

- **MVC Pattern**: Separation of concerns with Controllers, Models, and Routes
- **Service Layer Pattern**: Business logic in services (authService)
- **Middleware Pattern**: Authentication and authorization middleware
- **Repository Pattern**: Data access through Mongoose models

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Role-based access control (RBAC)
- Input validation
- Error handling

## Error Handling

The API returns standardized error responses:
```json
{
  "message": "Error message",
  "error": "Detailed error information"
}
```

## Development

- **Nodemon**: Auto-restart on file changes
- **Environment Variables**: Configuration via `.env` file
- **CORS**: Enabled for cross-origin requests

## Production Deployment

1. Set `NODE_ENV=production` in environment variables
2. Use a strong `JWT_SECRET`
3. Configure MongoDB connection string
4. Set up proper CORS origins
5. Use a process manager like PM2

## License

ISC

