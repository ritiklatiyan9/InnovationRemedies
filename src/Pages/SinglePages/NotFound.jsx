import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-12 rounded-xl shadow-lg text-center">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">Work in Progress</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Under Construction 🚧
        </h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
