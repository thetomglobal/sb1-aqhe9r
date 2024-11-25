import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Map, Calendar, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { getNextFellowshipDate } from '../utils/dateUtils';

export default function Navbar() {
  return (
    <motion.nav 
      className="bg-black/50 backdrop-blur-lg border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <Home className="w-8 h-8 text-[#E50914]" />
            <span className="font-bold text-xl text-white">
              House Fellowship Connect
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/centers"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Map className="w-5 h-5 text-[#E50914]" />
              <span className="text-white hidden md:inline">Find Centers</span>
            </Link>
            
            <Link
              to="/schedule"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Calendar className="w-5 h-5 text-[#E50914]" />
              <span className="text-white hidden md:inline">Schedule</span>
            </Link>
            
            <Link
              to="/contact"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Phone className="w-5 h-5 text-[#E50914]" />
              <span className="text-white hidden md:inline">Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}