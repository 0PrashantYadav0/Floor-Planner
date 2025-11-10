// models/Floor.js
const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  room_no: { type: String, required: true },
  capacity: { type: Number, required: true },
  description: { type: String },
});

const FloorSchema = new mongoose.Schema({
  floor_no: { type: Number, required: true, unique: true },
  rooms: [RoomSchema],
  version: { type: Number, default: 1 }, // Add versioning
  merkleHash: { type: String }, // Add Merkle hash
});

const Floor = mongoose.models.Floor || mongoose.model('Floor', FloorSchema);

module.exports = Floor;