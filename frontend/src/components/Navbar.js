import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaBuilding, FaCalendarCheck, FaLightbulb, FaClipboardList, FaUserShield, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg flex-shrink-0 z-50">
      <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            aria-label="Floor Planner"
            title="Floor Planner"
            className="inline-flex items-center group"
          >
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mr-3 group-hover:bg-white/30 transition-colors">
              <FaBuilding className="text-white text-xl" />
            </div>
            <span className="ml-2 text-xl font-bold tracking-wide text-white uppercase">
              Floor Planner
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <ul className="flex items-center hidden space-x-8 lg:flex">
            {isAuthenticated && (
              <>
                <li>
                  <Link
                    to="/booking"
                    className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-yellow-300 flex items-center gap-2"
                  >
                    <FaCalendarCheck />
                    Book Room
                  </Link>
                </li>
                <li>
                  <Link
                    to="/suggestion"
                    className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-yellow-300 flex items-center gap-2"
                  >
                    <FaLightbulb />
                    Recommendations
                  </Link>
                </li>
                <li>
                  <Link
                    to="/status"
                    className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-yellow-300 flex items-center gap-2"
                  >
                    <FaClipboardList />
                    My Bookings
                  </Link>
                </li>
                {user?.role === 'admin' && (
                  <li>
                    <Link
                      to="/admin_dashboard"
                      className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-yellow-300 flex items-center gap-2"
                    >
                      <FaUserShield />
                      Admin
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
          
          {/* Desktop Auth Buttons */}
          <ul className="flex items-center hidden space-x-4 lg:flex">
            {isAuthenticated ? (
              <>
                <li>
                  <div className="flex items-center gap-2 text-white">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">{user?.username?.charAt(0).toUpperCase()}</span>
                    </div>
                    <span className="font-medium">{user?.username}</span>
                  </div>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center gap-2 h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-lg shadow-md bg-red-500 hover:bg-red-600 focus:shadow-outline focus:outline-none"
                    aria-label="Logout"
                    title="Logout"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-lg shadow-md bg-indigo-700 hover:bg-indigo-800 focus:shadow-outline focus:outline-none"
                    aria-label="Login"
                    title="Login"
                  >
                    <FaSignInAlt />
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center gap-2 h-12 px-6 font-medium tracking-wide text-indigo-600 transition duration-200 rounded-lg shadow-md bg-white hover:bg-gray-100 focus:shadow-outline focus:outline-none"
                    aria-label="Sign Up"
                    title="Sign Up"
                  >
                    <FaUserPlus />
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              aria-label="Toggle Menu"
              title="Toggle Menu"
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <nav>
              <ul className="space-y-3">
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link
                        to="/booking"
                        className="flex items-center gap-2 font-medium tracking-wide text-white hover:text-yellow-300 transition-colors py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaCalendarCheck />
                        Book Room
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/suggestion"
                        className="flex items-center gap-2 font-medium tracking-wide text-white hover:text-yellow-300 transition-colors py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaLightbulb />
                        Recommendations
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/status"
                        className="flex items-center gap-2 font-medium tracking-wide text-white hover:text-yellow-300 transition-colors py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaClipboardList />
                        My Bookings
                      </Link>
                    </li>
                    {user?.role === 'admin' && (
                      <li>
                        <Link
                          to="/admin_dashboard"
                          className="flex items-center gap-2 font-medium tracking-wide text-white hover:text-yellow-300 transition-colors py-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <FaUserShield />
                          Admin Dashboard
                        </Link>
                      </li>
                    )}
                    <li className="pt-3 border-t border-white/20">
                      <div className="flex items-center gap-2 text-white mb-3">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">{user?.username?.charAt(0).toUpperCase()}</span>
                        </div>
                        <span className="font-medium">{user?.username}</span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="block w-full text-center text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaSignInAlt className="inline mr-2" />
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className="block w-full text-center text-indigo-600 border border-white/30 bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaUserPlus className="inline mr-2" />
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
