import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaBuilding, FaCalendarCheck, FaLightbulb, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        {/* Animated shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 py-8 text-center overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-4 py-4">
          {/* Main Heading */}
          <div className="space-y-2 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md rounded-full">
                <FaBuilding className="text-2xl text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 text-transparent bg-clip-text">
                  Welcome to Floor Planner
                </span>
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Intelligent Floor Plan Management System for efficient room booking and space utilization
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-6 animate-fade-in-up">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <FaCalendarCheck className="text-lg text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Easy Booking</h3>
              </div>
              <p className="text-sm text-gray-300 text-center">Quick and simple room booking process</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                  <FaLightbulb className="text-lg text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Smart Recommendations</h3>
              </div>
              <p className="text-sm text-gray-300 text-center">AI-powered room suggestions</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                  <FaBuilding className="text-lg text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Manage Floors</h3>
              </div>
              <p className="text-sm text-gray-300 text-center">Complete floor and room management</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center animate-fade-in-up">
            {isAuthenticated ? (
              <>
                <Link
                  to="/booking"
                  className="group px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm"
                >
                  <FaCalendarCheck />
                  Book Now
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/suggestion"
                  className="group px-6 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm"
                >
                  <FaLightbulb />
                  Get Recommendations
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="group px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm"
                >
                  Get Started
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="group px-6 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm"
                >
                  Login
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
};

export default Home;
