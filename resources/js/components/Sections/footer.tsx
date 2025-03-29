import React from 'react';


function footer() {
  return (
   <>
     <footer className="bg-purple-900 text-white py-6 text-center">
      <div className="container mx-auto">
        {/* Navigation Links */}
        <nav className="mb-4">
          <ul className="flex justify-center space-x-6 text-sm font-semibold">
            <li>
              <a href="#about" className="hover:text-gray-300">About</a>
            </li>
            <li>
              <a href="#services" className="hover:text-gray-300">Services</a>
            </li>
            <li>
              <a href="#portfolios" className="hover:text-gray-300">Portfolios</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-300">Contact</a>
            </li>
          </ul>
        </nav>

        {/* Copyright Text */}
        <p className="text-xs text-gray-400">
          © 2025 All rights reserved by <span className="font-semibold text-white">Shem Nduati</span>
        </p>
      </div>
    </footer>
   </>
  )
}

export default footer