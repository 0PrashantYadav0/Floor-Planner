import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { bookingsAPI } from '../services/api';
import { FaCalendarCheck, FaBuilding, FaDoorOpen, FaUsers, FaClock, FaFlag, FaCalendarAlt, FaSpinner } from 'react-icons/fa';

const Status = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingsAPI.getAll();
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching bookings.');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <FaSpinner className="animate-spin text-6xl text-indigo-600 mb-4 mx-auto" />
          <p className="text-gray-600 text-xl">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-md">
          <p className="text-red-700 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full">
              <FaCalendarCheck className="text-xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Your Bookings</h1>
          </div>
          <p className="text-sm text-gray-600">View all your room bookings</p>
        </div>

        {bookings.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    Confirmed
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaBuilding className="text-indigo-500 text-lg" />
                    <div>
                      <p className="text-xs text-gray-500">Floor</p>
                      <p className="text-lg font-semibold text-gray-800">Floor {booking.floor_no}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaDoorOpen className="text-purple-500 text-lg" />
                    <div>
                      <p className="text-xs text-gray-500">Room</p>
                      <p className="text-lg font-semibold text-gray-800">Room {booking.room_no}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaUsers className="text-blue-500 text-lg" />
                    <div>
                      <p className="text-xs text-gray-500">Capacity</p>
                      <p className="text-lg font-semibold text-gray-800">{booking.max_cap} people</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaClock className="text-yellow-500 text-lg" />
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="text-lg font-semibold text-gray-800">{booking.time_duration} minutes</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-green-500 text-lg" />
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {new Date(booking.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaFlag className="text-red-500 text-lg" />
                    <div>
                      <p className="text-xs text-gray-500">Priority</p>
                      <p className="text-lg font-semibold text-gray-800">{booking.priority_no}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <FaCalendarCheck className="text-3xl text-gray-400" />
            </div>
            <p className="text-2xl text-gray-600 mb-2">No bookings found</p>
            <p className="text-gray-500">Start booking rooms to see them here!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;
