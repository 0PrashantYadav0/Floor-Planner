const mongoose = require('mongoose');
const User = require('../Models/userModel');
const path = require('path');
const fs = require('fs');

// Try to load .env from multiple locations
const envPath1 = path.join(__dirname, '../../.env');
const envPath2 = path.join(__dirname, '../.env');

if (fs.existsSync(envPath1)) {
  require('dotenv').config({ path: envPath1 });
} else if (fs.existsSync(envPath2)) {
  require('dotenv').config({ path: envPath2 });
} else {
  require('dotenv').config();
}

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ useremail: 'admin@gmail.com' });

    if (existingAdmin) {
      console.log('Admin user already exists');
      // Update to ensure it's an admin
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      console.log('Admin user role updated');
    } else {
      // Create admin user
      const admin = new User({
        username: 'admin',
        useremail: 'admin@gmail.com',
        password: 'admin123', // Default password - should be changed in production
        role: 'admin',
        userimage: ''
      });

      await admin.save();
      console.log('Admin user created successfully!');
      console.log('Email: admin@gmail.com');
      console.log('Password: admin123');
      console.log('⚠️  Please change the password after first login!');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();

