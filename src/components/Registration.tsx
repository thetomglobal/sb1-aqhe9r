import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MapPin, User, Mail, Phone, Calendar, Church as ChurchIcon } from 'lucide-react';
import { Member, FellowshipCenter } from '../types';
import { useStore } from '../store';
import { generateWhatsAppMessage } from '../utils/notifications';
import AreaSelector from './AreaSelector';
import StreetSelector from './StreetSelector';
import { findFellowshipByStreet } from '../utils/streetMatcher';
import { motion } from 'framer-motion';

export default function Registration() {
  const { churchId } = useParams();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assignedCenter, setAssignedCenter] = useState<FellowshipCenter | null>(null);
  const [showAreaSelector, setShowAreaSelector] = useState(false);
  const [selectedStreet, setSelectedStreet] = useState<string>('');

  const addMember = useStore((state) => state.addMember);
  const fellowshipCenters = useStore((state) => state.fellowshipCenters);

  const findNearestCenter = (userLat: number, userLng: number) => {
    return fellowshipCenters.reduce((nearest, center) => {
      const distance = Math.sqrt(
        Math.pow(center.location.lat - userLat, 2) + 
        Math.pow(center.location.lng - userLng, 2)
      );
      return !nearest || distance < nearest.distance 
        ? { center, distance }
        : nearest;
    }, null as { center: FellowshipCenter; distance: number } | null);
  };

  const handleStreetSelection = (street: string) => {
    setSelectedStreet(street);
    setValue('street', street);
    const center = findFellowshipByStreet(fellowshipCenters, street);
    if (center) {
      setAssignedCenter(center);
      setShowAreaSelector(false);
    }
  };

  const handleCenterSelection = (center: FellowshipCenter) => {
    setAssignedCenter(center);
    setShowAreaSelector(false);
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    let selectedCenter = assignedCenter;
    if (location && !selectedCenter) {
      const nearest = findNearestCenter(location.lat, location.lng);
      if (nearest) selectedCenter = nearest.center;
    }

    if (!selectedCenter) {
      setShowAreaSelector(true);
      setIsSubmitting(false);
      return;
    }

    const member: Member = {
      id: crypto.randomUUID(),
      ...data,
      street: selectedStreet,
      location: location || { lat: selectedCenter.location.lat, lng: selectedCenter.location.lng },
      church: churchId!,
      createdAt: new Date().toISOString(),
      fellowshipCenter: selectedCenter,
    };

    addMember(member);
    setAssignedCenter(selectedCenter);

    // Open WhatsApp notification in a new tab
    window.open(generateWhatsAppMessage(member, selectedCenter), '_blank');
    setIsSubmitting(false);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setShowAreaSelector(true);
        },
        (error) => {
          console.error('Error getting location:', error);
          setShowAreaSelector(true);
        }
      );
    } else {
      setShowAreaSelector(true);
    }
  };

  if (showAreaSelector && !assignedCenter) {
    return (
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="netflix-card p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Find Your Fellowship Center
          </h2>
          <div className="space-y-6">
            <StreetSelector
              fellowshipCenters={fellowshipCenters}
              onSelect={handleStreetSelection}
            />
            <div className="text-center text-gray-400">- or -</div>
            <AreaSelector
              fellowshipCenters={fellowshipCenters}
              onSelect={handleCenterSelection}
            />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {!assignedCenter ? (
        <motion.div 
          className="netflix-card p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Our Fellowship
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Form fields remain the same */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('fullName', { required: true })}
                    className="netflix-input pl-10 w-full"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <div className="mt-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('email', { required: true })}
                    type="email"
                    className="netflix-input pl-10 w-full"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Phone (WhatsApp)
                </label>
                <div className="mt-1 relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('phone', { required: true })}
                    type="tel"
                    className="netflix-input pl-10 w-full"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Birthday
                </label>
                <div className="mt-1 relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('birthday', { required: true })}
                    type="date"
                    className="netflix-input pl-10 w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Membership Level
                </label>
                <select
                  {...register('membershipLevel', { required: true })}
                  className="netflix-input w-full"
                >
                  <option value="">Select membership level</option>
                  <option value="New">New Member</option>
                  <option value="Existing">Existing Member</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Group
                </label>
                <select
                  {...register('group', { required: true })}
                  className="netflix-input w-full"
                >
                  <option value="">Select your group</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Youth">Youth</option>
                  <option value="Teens">Teens</option>
                  <option value="Children">Children</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Marital Status
                </label>
                <select
                  {...register('maritalStatus', { required: true })}
                  className="netflix-input w-full"
                >
                  <option value="">Select marital status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Address
                </label>
                <textarea
                  {...register('address', { required: true })}
                  className="netflix-input w-full"
                  rows={3}
                  placeholder="Enter your address"
                />
              </div>

              <div className="flex flex-col space-y-4">
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="netflix-button flex items-center justify-center"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Get Current Location
                </button>

                <button
                  type="button"
                  onClick={() => setShowAreaSelector(true)}
                  className="netflix-button bg-gray-700 hover:bg-gray-600"
                >
                  Select Area Manually
                </button>

                <button
                  type="submit"
                  className="netflix-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Register'}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      ) : (
        <motion.div 
          className="netflix-card p-8 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="bg-[#E50914] inline-block rounded-full p-4 mb-6">
            <ChurchIcon className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Welcome to the Family!
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            You've been assigned to {assignedCenter.name}
          </p>
          <div className="bg-[#2F2F2F] rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              Your Fellowship Pastor
            </h3>
            <p className="text-gray-300">{assignedCenter.pastor.name}</p>
            <p className="text-gray-300">{assignedCenter.pastor.phone}</p>
          </div>
          <a
            href={assignedCenter.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="netflix-button inline-flex items-center"
          >
            <Phone className="w-5 h-5 mr-2" />
            Join WhatsApp Group
          </a>
        </motion.div>
      )}
    </div>
  );
}