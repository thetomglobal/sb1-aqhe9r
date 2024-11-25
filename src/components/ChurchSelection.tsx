import React from 'react';
import { Link } from 'react-router-dom';
import { Church, MapPin, Users, Calendar } from 'lucide-react';
import { useStore } from '../store';
import { motion } from 'framer-motion';
import { getNextFellowshipDate } from '../utils/dateUtils';
import InstallPrompt from './InstallPrompt';

export default function ChurchSelection() {
  const church = useStore((state) => state.churches[0]);
  const nextMeetingDate = getNextFellowshipDate();

  return (
    <motion.div 
      className="max-w-6xl mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <InstallPrompt />
      
      <div className="text-center mb-12">
        <motion.h1 
          className="text-5xl font-bold mb-4 text-white"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          House Fellowship Connect
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Join a community of believers near you
        </motion.p>
      </div>

      <motion.div 
        className="netflix-card p-8"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="bg-[#E50914] rounded-lg p-4 shrink-0">
            <Church className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-3xl font-semibold text-white mb-4">
              {church.name}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-2 text-[#E50914]" />
                <span>{church.mainAddress}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Users className="w-5 h-5 mr-2 text-[#E50914]" />
                <span>{church.fellowshipCenters.length} Fellowship Centers</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Calendar className="w-5 h-5 mr-2 text-[#E50914]" />
                <div>
                  <p>House Fellowship Meetings Hold Second Sunday of the Month</p>
                  <p className="text-[#E50914] font-medium mt-1">
                    Next Meeting: {nextMeetingDate}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Link 
                to={`/register/${church.id}`} 
                className="netflix-button inline-flex items-center"
              >
                Join a Fellowship Center
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="mt-12 text-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-gray-400">
          For more information about our house fellowships, please contact the church office.
        </p>
        <p className="text-gray-600 text-sm">
          Made With Love by Trybely
        </p>
      </motion.div>
    </motion.div>
  );
}