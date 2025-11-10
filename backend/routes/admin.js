const express = require('express');
const router = express.Router();
const Floor = require('../Models/Floor');
const User = require('../Models/userModel');
const MerkleTree = require('../version_control/merkleTree');
const { authenticate, isAdmin } = require('../middleware/auth');
const { adminLimiter } = require('../middleware/rateLimiter');
const logger = require('../utils/logger');

// Apply authentication middleware to all admin routes
router.use(authenticate);
router.use(isAdmin);
router.use(adminLimiter); // Apply rate limiting to admin routes

// Update a floor's Merkle hash and version
const updateFloorMerkleHashAndVersion = async (floor) => {
  const roomData = floor.rooms.map(room => `${room.room_no}:${room.capacity}:${room.description}`);
  const merkleTree = new MerkleTree(roomData);
  floor.merkleHash = merkleTree.getRoot();
  floor.version += 1; // Increment the version
  await floor.save();
};



router.get('/user-role', async (req, res) => {
    try {
      res.json({ role: req.user.role }); // Send back the user's role from authenticated user
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });


router.get('/floors', async (req, res) => {
  try {
    const floors = await Floor.find();
    logger.debug('Fetched floors for admin', { count: floors.length, floors });
    res.status(200).json(floors);
  } catch (err) {
    logger.error('Error fetching floors', { error: err.message });
    res.status(400).json({ message: err.message });
  }
});

// Add a new floor
router.post('/add-floor', async (req, res) => {
  try {
    const { floor_no } = req.body;
    const newFloor = new Floor({ floor_no, rooms: [] });
    await newFloor.save();
    res.status(201).json(newFloor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Remove a floor
router.delete('/remove-floor/:id', async (req, res) => {
  try {
    await Floor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Floor removed successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add a new room to a floor
router.post('/add-room/:floorId', async (req, res) => {
  try {
    const { roomNo, capacity, description } = req.body;
    const floor = await Floor.findById(req.params.floorId);

    floor.rooms.push({ room_no: roomNo, capacity, description });
    await updateFloorMerkleHashAndVersion(floor); // Update Merkle hash and version
    res.status(201).json(floor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Update a room's details (capacity, description)
router.put('/update-room/:floorId/:roomId', async (req, res) => {
  try {
    const { capacity, description } = req.body;
    const floor = await Floor.findById(req.params.floorId);
    const room = floor.rooms.id(req.params.roomId);
    
    if (capacity) room.capacity = capacity;
    if (description) room.description = description;

    await updateFloorMerkleHashAndVersion(floor); // Update Merkle hash and version
    res.status(200).json(floor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Remove a room from a floor
router.delete('/remove-room/:floorId/:roomId', async (req, res) => {
  const { floorId, roomId } = req.params;

  try {
    const floor = await Floor.findById(floorId);
    if (!floor) {
      return res.status(404).json({ message: 'Floor not found' });
    }

    // Check if the room exists in the floor
    const roomIndex = floor.rooms.findIndex(room => room._id.toString() === roomId);
    if (roomIndex === -1) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Remove the room from the array
    floor.rooms.splice(roomIndex, 1);
    await updateFloorMerkleHashAndVersion(floor); // Update Merkle hash and version
    res.status(200).json({ message: 'Room removed successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});





module.exports = router;