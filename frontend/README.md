# Floor Planner - Frontend

A modern React.js frontend application for the Floor Planner system, providing an intuitive user interface for floor plan management and room booking.

## Features

- **User Authentication**: Login and registration with JWT-based authentication
- **Room Booking**: Book rooms with capacity, duration, and date selection
- **Smart Recommendations**: Get AI-powered room suggestions based on requirements
- **Admin Dashboard**: Manage floors and rooms (Admin only)
- **Booking Management**: View and manage your bookings
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Protected Routes**: Route protection based on authentication and roles

## Tech Stack

- **React 18**: UI library
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client
- **Tailwind CSS**: Utility-first CSS framework
- **React Konva**: 2D canvas library for floor plans
- **Context API**: State management for authentication

## Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Footer.js
│   │   ├── FloorPlan.js
│   │   ├── Navbar.js
│   │   └── ProtectedRoute.js
│   ├── config/
│   │   └── api.js              # API configuration
│   ├── contexts/
│   │   └── AuthContext.js      # Authentication context
│   ├── pages/
│   │   ├── AdminDashboard.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── RoomSuggestion.js
│   │   ├── Signup.js
│   │   ├── Status.js
│   │   └── UserBooking.js
│   ├── services/
│   │   └── api.js              # API service layer
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Installation

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

4. **Start the development server**
   ```bash
   npm start
   ```

   The application will start on `http://localhost:3000`

## Available Scripts

- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run tests
- `npm eject`: Eject from Create React App

## Features Breakdown

### Authentication
- **Login**: User login with email and password
- **Signup**: User registration with username, email, and password
- **Logout**: Clear session and redirect to home
- **Protected Routes**: Routes that require authentication
- **Role-based Access**: Admin-only routes

### Room Booking
- Select floor and room
- Set capacity requirements
- Choose date and duration
- Set priority level
- View booking confirmation

### Smart Recommendations
- Input capacity, duration, and date
- Get AI-powered room suggestions
- Direct booking from suggestions

### Admin Dashboard
- **Floor Management**: Add, remove floors
- **Room Management**: Add, update, remove rooms
- **Version Control**: View floor plan versions
- **Merkle Hash**: Track floor plan integrity

### Booking Management
- View all your bookings
- See booking details (floor, room, date, duration)
- Track booking status

## Components

### AuthContext
Provides authentication state and methods:
- `user`: Current user object
- `isAuthenticated`: Authentication status
- `loading`: Loading state
- `login(email, password)`: Login function
- `register(userData)`: Registration function
- `logout()`: Logout function

### ProtectedRoute
Component for protecting routes:
- Requires authentication
- Optional admin role requirement
- Redirects to login if not authenticated

### API Service
Centralized API service with:
- Axios instance with interceptors
- Automatic token injection
- Error handling
- API endpoints for all features

## Routing

- `/`: Home page
- `/login`: Login page
- `/signup`: Signup page
- `/booking`: Room booking (Protected)
- `/suggestion`: Room suggestions (Protected)
- `/status`: User bookings (Protected)
- `/admin_dashboard`: Admin dashboard (Protected, Admin only)

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Gradient backgrounds, shadows, transitions
- **Accessibility**: ARIA labels, keyboard navigation

## State Management

- **Context API**: Global authentication state
- **Local State**: Component-level state with React hooks
- **URL State**: Route parameters and location state

## API Integration

All API calls are made through the centralized API service:
- Automatic token injection
- Error handling
- Request/response interceptors
- Base URL configuration

## Environment Variables

- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:3001/api)

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Design Patterns

- **Component Composition**: Reusable components
- **Context Pattern**: Global state management
- **Service Layer Pattern**: API abstraction
- **Protected Route Pattern**: Route protection
- **Container/Presentational Pattern**: Separation of logic and presentation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC

