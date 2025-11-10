import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { suggestionAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { FaLightbulb, FaUsers, FaClock, FaCalendarAlt, FaFlag, FaBuilding, FaDoorOpen, FaCheckCircle, FaArrowRight, FaMagic } from 'react-icons/fa';

const RoomSuggestion = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    max_cap: '',
    time_duration: '',
    date: '',
    priority_no: '',
  });
  const [suggestedRoom, setSuggestedRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuggestedRoom(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await suggestionAPI.suggestRooms(formData);
      setSuggestedRoom(response.data);
    } catch (error) {
      console.error('Error fetching suggested room:', error);
      setError(error.response?.data?.message || 'Failed to fetch suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (suggestedRoom) {
      navigate('/booking', {
        state: {
          floor_no: suggestedRoom.floor_no,
          room_no: suggestedRoom.room_no,
          max_cap: formData.max_cap,
          time_duration: formData.time_duration,
          date: formData.date,
          priority_no: formData.priority_no,
        },
      });
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-4 overflow-y-auto">
      <div className="max-w-6xl mx-auto h-full">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
              <FaMagic className="text-xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Smart Room Recommendation</h1>
          </div>
          <p className="text-sm text-gray-600">Get the best room suggestion based on your requirements</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <FaLightbulb className="text-xl text-yellow-500" />
              <h2 className="text-xl font-bold text-gray-800">Your Requirements</h2>
            </div>

            {error && (
              <div className="mb-3 bg-red-50 border-l-4 border-red-500 p-3 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaUsers className="text-blue-500" />
                  Maximum Capacity
                </label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  type="number"
                  name="max_cap"
                  value={formData.max_cap}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="Enter maximum capacity"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaClock className="text-yellow-500" />
                  Time Duration (minutes)
                </label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  type="number"
                  name="time_duration"
                  value={formData.time_duration}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="Enter duration in minutes"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaCalendarAlt className="text-green-500" />
                  Date
                </label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaFlag className="text-red-500" />
                  Priority Number
                </label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  type="number"
                  name="priority_no"
                  value={formData.priority_no}
                  onChange={handleChange}
                  min="0"
                  required
                  placeholder="Enter priority (0 = normal)"
                />
              </div>

              <button
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-lg focus:outline-none focus:shadow-outline transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center justify-center gap-2"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Finding Best Room...</span>
                  </>
                ) : (
                  <>
                    <FaMagic />
                    <span>Get Suggestion</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Suggestion Result Section */}
          <div className="flex items-center justify-center">
            {suggestedRoom ? (
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-2xl overflow-hidden max-w-md w-full transform hover:scale-105 transition duration-300 text-white">
                <div className="p-6">
                  <div className="flex items-center justify-end mb-3">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
                      Recommended
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <FaCheckCircle className="text-xl" />
                    <h2 className="text-2xl font-bold">Suggested Room</h2>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                      <FaBuilding className="text-lg" />
                      <div>
                        <p className="text-xs opacity-90">Floor</p>
                        <p className="text-lg font-bold">Floor {suggestedRoom.floor_no}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                      <FaDoorOpen className="text-lg" />
                      <div>
                        <p className="text-xs opacity-90">Room</p>
                        <p className="text-lg font-bold">Room {suggestedRoom.room_no}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                      <FaUsers className="text-lg" />
                      <div>
                        <p className="text-xs opacity-90">Capacity</p>
                        <p className="text-lg font-bold">{suggestedRoom.capacity} people</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleBookNow}
                    className="w-full bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg text-sm"
                  >
                    <FaCheckCircle />
                    <span>Book Now</span>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-xl p-12 text-center max-w-md w-full border border-gray-100">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaLightbulb className="text-3xl text-gray-400" />
                  <p className="text-xl text-gray-600">No suggestion yet</p>
                </div>
                <p className="text-gray-500">Fill out the form to get AI-powered room suggestions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSuggestion;
