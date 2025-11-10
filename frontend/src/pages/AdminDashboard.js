import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { adminAPI } from '../services/api';
import { FaBuilding, FaDoorOpen, FaUsers, FaEdit, FaTrash, FaPlus, FaSpinner, FaCheckCircle, FaTimesCircle, FaCog } from 'react-icons/fa';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [floors, setFloors] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState('');
  const [floorNo, setFloorNo] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [capacity, setCapacity] = useState('');
  const [description, setDescription] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [updateCapacity, setUpdateCapacity] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchFloors();
  }, []);

  const fetchFloors = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getFloors();
      setFloors(response.data);
    } catch (err) {
      setError('Error fetching floors');
      console.error('Error fetching floors:', err);
    } finally {
      setLoading(false);
    }
  };

  const addFloor = async () => {
    try {
      setError('');
      setSuccess('');
      await adminAPI.addFloor({ floor_no: parseInt(floorNo) });
      setSuccess('Floor added successfully');
      setFloorNo('');
      closeModal1();
      fetchFloors();
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding floor');
    }
  };

  const addRoom = async () => {
    if (!selectedFloor) {
      setError('Please select a floor first');
      return;
    }
    try {
      setError('');
      setSuccess('');
      await adminAPI.addRoom(selectedFloor, {
        roomNo,
        capacity: parseInt(capacity),
        description,
      });
      setSuccess('Room added successfully');
      setRoomNo('');
      setCapacity('');
      setDescription('');
      closeModal();
      fetchFloors();
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding room');
    }
  };

  const updateRoom = async () => {
    if (!selectedRoom) return;
    try {
      setError('');
      setSuccess('');
      await adminAPI.updateRoom(selectedRoom.floorId, selectedRoom.roomId, {
        capacity: updateCapacity ? parseInt(updateCapacity) : undefined,
        description: updateDescription || undefined,
      });
      setSuccess('Room updated successfully');
      setSelectedRoom(null);
      setUpdateCapacity('');
      setUpdateDescription('');
      fetchFloors();
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating room');
    }
  };

  const deleteFloor = async (floorId) => {
    if (!window.confirm('Are you sure you want to delete this floor? This will delete all rooms in this floor.')) return;
    try {
      setError('');
      setSuccess('');
      await adminAPI.removeFloor(floorId);
      setSuccess('Floor deleted successfully');
      setSelectedFloor('');
      fetchFloors();
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting floor');
    }
  };

  const deleteRoom = async (roomId) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;
    if (!selectedFloor) return;
    try {
      setError('');
      setSuccess('');
      await adminAPI.removeRoom(selectedFloor, roomId);
      setSuccess('Room deleted successfully');
      fetchFloors();
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting room');
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setRoomNo('');
    setCapacity('');
    setDescription('');
  };
  const openModal1 = () => setIsModalOpen1(true);
  const closeModal1 = () => {
    setIsModalOpen1(false);
    setFloorNo('');
  };

  const selectedFloorData = floors.find((floor) => floor._id === selectedFloor);

  if (loading && floors.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <FaSpinner className="animate-spin text-6xl text-indigo-600 mb-4 mx-auto" />
          <p className="text-gray-600 text-xl">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 overflow-y-auto">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full">
              <FaCog className="text-xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <p className="text-sm text-gray-600">Manage floors and rooms</p>
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

      {/* Add Floor Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={openModal1}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          type="button"
        >
          <FaPlus />
          Add Floor
        </button>
      </div>

      {/* Add Floor Modal */}
      {isModalOpen1 && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/50 backdrop-blur-sm">
          <div className="relative p-6 w-full max-w-lg">
            <div className="relative bg-white rounded-2xl shadow-2xl">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <FaBuilding className="text-blue-500" />
                  <span>Add Floor</span>
                </h3>
                <button
                  onClick={closeModal1}
                  className="text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg p-2 transition duration-200"
                >
                  <FaTimesCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <input
                  type="number"
                  placeholder="Enter Floor Number"
                  value={floorNo}
                  onChange={(e) => setFloorNo(e.target.value)}
                  className="block w-full px-4 py-3 text-gray-700 bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="flex items-center p-6 space-x-4 border-t">
                <button
                  onClick={addFloor}
                  className="w-full px-4 py-3 text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition duration-200 font-medium rounded-lg shadow-lg flex items-center justify-center gap-2"
                >
                  <FaCheckCircle />
                  Add Floor
                </button>
                <button
                  onClick={closeModal1}
                  className="w-full px-4 py-3 text-sm font-medium text-gray-900 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Select Floor */}
      <div className="mb-4">
        <div className="max-w-md mx-auto">
          <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">
            Select Floor to Manage
          </label>
          <div className="flex gap-4">
            <select
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
            >
              <option value="">Select a floor</option>
              {floors.map((floor) => (
                <option key={floor._id} value={floor._id}>
                  Floor {floor.floor_no} (Version: {floor.version})
                </option>
              ))}
            </select>

            {selectedFloor && (
              <button
                onClick={() => deleteFloor(selectedFloor)}
                className="px-4 py-3 text-white bg-red-500 hover:bg-red-700 transition duration-200 font-medium rounded-lg shadow-lg flex items-center gap-2"
              >
                <FaTrash />
                Delete Floor
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Manage Rooms for the Selected Floor */}
      {selectedFloor && (
        <>
          <div className="mt-8 flex justify-center">
            <button
              onClick={openModal}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
              type="button"
            >
              <FaPlus />
              Add Room
            </button>
          </div>

          {/* Add Room Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/50 backdrop-blur-sm">
              <div className="relative p-6 w-full max-w-lg">
                <div className="relative bg-white rounded-2xl shadow-2xl">
                  <div className="flex items-center justify-between p-6 border-b">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <FaDoorOpen className="text-purple-500" />
                      <span>Add Room</span>
                    </h3>
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg p-2 transition duration-200"
                    >
                      <FaTimesCircle className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-6 space-y-4">
                    <input
                      type="text"
                      placeholder="Room Number"
                      value={roomNo}
                      onChange={(e) => setRoomNo(e.target.value)}
                      className="block w-full px-4 py-3 text-gray-700 bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                    />
                    <input
                      type="number"
                      placeholder="Capacity"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      className="block w-full px-4 py-3 text-gray-700 bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="block w-full px-4 py-3 text-gray-700 bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="flex items-center p-6 space-x-4 border-t">
                    <button
                      onClick={addRoom}
                      className="w-full px-4 py-3 text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition duration-200 font-medium rounded-lg shadow-lg flex items-center justify-center gap-2"
                    >
                      <FaCheckCircle />
                      Add Room
                    </button>
                    <button
                      onClick={closeModal}
                      className="w-full px-4 py-3 text-sm font-medium text-gray-900 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Existing Rooms */}
          <div className="mt-4">
            <h4 className="text-2xl font-semibold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
              <FaBuilding className="text-indigo-500" />
              <span>Rooms on Floor {selectedFloorData?.floor_no}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedFloorData?.rooms.map((room) => (
                <div
                  key={room._id}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <FaDoorOpen className="text-indigo-500 text-xl" />
                      <p className="text-xl font-bold text-gray-800">
                        Room {room.room_no}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <FaUsers className="text-blue-500" />
                      <span>Capacity: {room.capacity}</span>
                    </div>
                    {room.description && (
                      <p className="text-sm text-gray-500 mt-2">{room.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      className="flex-1 text-emerald-500 bg-emerald-50 border border-emerald-500 hover:bg-emerald-500 hover:text-white font-bold uppercase text-xs px-4 py-2 rounded transition duration-150 flex items-center justify-center gap-1"
                      onClick={() => {
                        setSelectedRoom({ floorId: selectedFloor, roomId: room._id });
                        setUpdateCapacity(room.capacity);
                        setUpdateDescription(room.description || '');
                      }}
                    >
                      <FaEdit />
                      Edit
                    </button>
                    <button
                      className="flex-1 text-red-600 bg-red-50 border border-red-600 hover:bg-red-600 hover:text-white font-bold uppercase text-xs px-4 py-2 rounded transition duration-150 flex items-center justify-center gap-1"
                      onClick={() => deleteRoom(room._id)}
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {selectedFloorData?.rooms.length === 0 && (
                <div className="col-span-full text-center py-12 bg-white rounded-xl">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <FaDoorOpen className="text-3xl text-gray-400" />
                    <p className="text-gray-600 text-lg">No rooms on this floor yet</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Update Room Section */}
      {selectedRoom && (
        <div className="mt-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <FaEdit className="text-emerald-500" />
            <span>Update Room</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="New Capacity"
              value={updateCapacity}
              onChange={(e) => setUpdateCapacity(e.target.value)}
              className="block w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
            />
            <input
              type="text"
              placeholder="New Description"
              value={updateDescription}
              onChange={(e) => setUpdateDescription(e.target.value)}
              className="block w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={updateRoom}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium rounded-lg transition duration-200 flex items-center gap-2"
            >
              <FaCheckCircle />
              Update Room
            </button>
            <button
              onClick={() => {
                setSelectedRoom(null);
                setUpdateCapacity('');
                setUpdateDescription('');
              }}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default AdminDashboard;
