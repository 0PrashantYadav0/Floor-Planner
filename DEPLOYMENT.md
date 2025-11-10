# 🚀 Deployment Guide

Complete guide for deploying the Floor Planner system.

## 📋 Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development)
- MongoDB (or MongoDB Atlas account)
- Git

## 🐳 Docker Deployment (Recommended)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Intelligent-Floor-Plan-Management-System-main
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Build and start services**
   ```bash
   docker-compose up -d
   ```

4. **Seed admin user**
   ```bash
   docker-compose exec backend npm run seed:admin
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Docs: http://localhost:3001/api-docs
   - Health Check: http://localhost:3001/api/health

### Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after code changes
docker-compose up -d --build

# View running containers
docker-compose ps

# Access backend container
docker-compose exec backend sh

# Access MongoDB
docker-compose exec mongo mongosh
```

## ☁️ Cloud Deployment

### Backend Deployment (Heroku/Railway/Render)

1. **Set environment variables**
   ```
   PORT=3001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   JWT_EXPIRE=7d
   NODE_ENV=production
   ```

2. **Deploy**
   ```bash
   git push heroku main
   # or
   git push railway main
   ```

### Frontend Deployment (Vercel/Netlify)

1. **Set environment variables**
   ```
   REACT_APP_API_URL=https://your-api-url.com/api
   ```

2. **Build and deploy**
   ```bash
   npm run build
   # Deploy the build folder
   ```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/floor-planner
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
NODE_ENV=production
LOG_LEVEL=info
API_URL=http://localhost:3001/api
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3001/api
```

## 📊 Monitoring

### Health Check Endpoint

```bash
curl http://localhost:3001/api/health
```

Returns:
- System status
- Database connection status
- Memory usage
- System resources
- Uptime

### Logs

Logs are stored in `backend/logs/`:
- `application-YYYY-MM-DD.log` - All logs
- `error-YYYY-MM-DD.log` - Error logs only
- `exceptions-YYYY-MM-DD.log` - Uncaught exceptions
- `rejections-YYYY-MM-DD.log` - Unhandled promise rejections

## 🔒 Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS in production
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable MongoDB authentication
- [ ] Use environment variables for secrets
- [ ] Regular security updates

## 📈 Scaling

### Horizontal Scaling

1. **Load Balancer**: Use nginx or cloud load balancer
2. **Multiple Backend Instances**: Run multiple backend containers
3. **Database Replication**: MongoDB replica set
4. **Redis Cluster**: For distributed caching

### Vertical Scaling

- Increase container resources
- Optimize database queries
- Add database indexes
- Enable caching

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection
- Verify environment variables
- Check logs: `docker-compose logs backend`

### Frontend can't connect to API
- Verify REACT_APP_API_URL
- Check CORS configuration
- Verify backend is running

### Database connection issues
- Check MONGO_URI format
- Verify MongoDB is running
- Check network connectivity

## 📞 Support

For issues or questions:
1. Check logs in `backend/logs/`
2. Review health check endpoint
3. Check API documentation at `/api-docs`
4. Review error messages in browser console

