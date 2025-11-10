const express = require('express');
const Floor = require('../Models/Floor'); 
const Booking = require('../Models/Booking'); 
const router = express.Router();
const { authenticate } = require('../middleware/auth');

// Apply authentication middleware
router.use(authenticate);

const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

// Helper function to perform binary search
const binarySearch = (rooms, capacity) => {
  let left = 0;
  let right = rooms.length - 1;
  let bestRoom = null;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (rooms[mid].capacity >= capacity) {
      bestRoom = rooms[mid]; // Potential best room found
      right = mid - 1; // Look for a better room on the left
    } else {
      left = mid + 1; // Look on the right
    }
  }

  return bestRoom; // Return the best room found
};

// Endpoint to suggest rooms based on criteria
router.post('/', async (req, res) => {
  const { max_cap, time_duration, date, priority_no } = req.body;

  try {
    // Fetch all floors and rooms
    const floors = await Floor.find({});
    
    // Fetch all bookings for the specified date
    const bookings = await Booking.find({ date });

    // Prepare a list of available rooms
    const availableRooms = [];

    floors.forEach(floor => {
      floor.rooms.forEach(room => {
        // Check if the room has sufficient capacity
        if (room.capacity >= max_cap) {
          // Check if the room is booked on the given date and time duration
          const isRoomBooked = bookings.some(booking => 
            booking.room_no === room.room_no &&
            booking.floor_no === floor.floor_no &&
            formatDate(booking.date) === date 
          );

          // If the room is not booked, add it to the available rooms
          if (!isRoomBooked) {
            availableRooms.push({
              floor_no: floor.floor_no,
              room_no: room.room_no,
              capacity: room.capacity,
            }); // Add room object directly for easier processing
          }
        }
      });
    });

    // Sort available rooms by capacity
    availableRooms.sort((a, b) => a.capacity - b.capacity);
    
    // Use binary search to find the best room
    const bestRoom = binarySearch(availableRooms, max_cap);

    if (bestRoom) {
      console.log(bestRoom);
      
      res.json({
        floor_no: bestRoom.floor_no,
        room_no: bestRoom.room_no,
        capacity: bestRoom.capacity,
      });
    } else {
      res.status(404).json({ message: "No suitable room found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;