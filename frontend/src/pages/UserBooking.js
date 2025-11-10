import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { bookingsAPI } from '../services/api';
import { FaBuilding, FaDoorOpen, FaUsers, FaClock, FaCalendarAlt, FaFlag, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const UserBooking = () => {
  const { user } = useAuth();
  const location = useLocation();
  const prefillData = location.state || {};
  
  const [formData, setFormData] = useState({
    floor_no: prefillData.floor_no || '',
    room_no: prefillData.room_no || '',
    max_cap: prefillData.max_cap || '',
    time_duration: prefillData.time_duration || '',
    date: prefillData.date || '',
    priority_no: prefillData.priority_no || '',
  });
  const [floors, setFloors] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(prefillData.floor_no || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const response = await bookingsAPI.getFloors();
        setFloors(response.data);
      } catch (error) {
        console.error('Error fetching floors:', error);
        setError('Failed to load floors. Please try again.');
      }
    };

    fetchFloors();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await bookingsAPI.create(formData);
      setSuccess('Booking Successful!');
      // Reset form
      setFormData({
        floor_no: '',
        room_no: '',
        max_cap: '',
        time_duration: '',
        date: '',
        priority_no: '',
      });
      setSelectedFloor('');
    } catch (error) {
      console.error('Error booking the room:', error);
      setError(error.response?.data?.message || 'Booking Failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-4 overflow-y-auto">
      <div className="max-w-3xl mx-auto h-full">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full">
              <FaCalendarAlt className="text-xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Book a Room</h1>
          </div>
          <p className="text-sm text-gray-600">Fill out the form below to book a room</p>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="mb-3 bg-red-50 border-l-4 border-red-500 p-3 rounded-lg flex items-center gap-2 animate-slide-in">
            <FaTimesCircle className="text-red-500 text-lg flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-3 bg-green-50 border-l-4 border-green-500 p-3 rounded-lg flex items-center gap-2 animate-slide-in">
            <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
            <p className="text-green-700 text-sm">{success}</p>
          </div>
        )}

        {/* Booking Form Card */}
        <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Floor Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaBuilding className="text-indigo-500" />
                Floor Number
              </label>
              <select
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white text-sm"
                name="floor_no"
                value={selectedFloor}
                onChange={(e) => {
                  setSelectedFloor(e.target.value);
                  setFormData({ ...formData, floor_no: e.target.value, room_no: '' });
                }}
                required
              >
                <option value="">Select a floor</option>
                {floors.map((floor) => (
                  <option key={floor._id} value={floor.floor_no}>
                    Floor {floor.floor_no}
                  </option>
                ))}
              </select>
            </div>

            {/* Room Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaDoorOpen className="text-purple-500" />
                Room Number
              </label>
              <select
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white disabled:bg-gray-50 disabled:cursor-not-allowed text-sm"
                name="room_no"
                value={formData.room_no}
                onChange={handleChange}
                required
                disabled={!selectedFloor}
              >
                <option value="">Select a room</option>
                {selectedFloor &&
                  floors
                    .find(floor => floor.floor_no === Number(selectedFloor))
                    ?.rooms.map((room) => (
                      <option key={room.room_no} value={room.room_no}>
                        Room {room.room_no} (Capacity: {room.capacity})
                      </option>
                    ))}
              </select>
            </div>

            {/* Capacity */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaUsers className="text-blue-500" />
                Maximum Capacity
              </label>
              <input
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                type="number"
                name="max_cap"
                value={formData.max_cap}
                onChange={handleChange}
                required
                min="1"
                placeholder="Enter maximum capacity"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaClock className="text-yellow-500" />
                Time Duration (minutes)
              </label>
              <input
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                type="number"
                name="time_duration"
                value={formData.time_duration}
                onChange={handleChange}
                required
                min="1"
                placeholder="Enter duration in minutes"
              />
            </div>

            {/* Date */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaCalendarAlt className="text-green-500" />
                Date
              </label>
              <input
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Priority */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaFlag className="text-red-500" />
                Priority Number
              </label>
              <input
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                type="number"
                name="priority_no"
                value={formData.priority_no}
                onChange={handleChange}
                min="0"
                required
                placeholder="Enter priority (0 = normal)"
              />
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center justify-center gap-2 text-sm"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Booking...</span>
                </>
              ) : (
                <>
                  <FaCheckCircle />
                  <span>Book Room</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UserBooking;
