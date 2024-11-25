import React from 'react';
import { FellowshipCenter } from '../types';

interface AreaSelectorProps {
  fellowshipCenters: FellowshipCenter[];
  onSelect: (center: FellowshipCenter) => void;
}

export default function AreaSelector({ fellowshipCenters, onSelect }: AreaSelectorProps) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-300">
        Select Your Area
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fellowshipCenters.map((center) => (
          <button
            key={center.id}
            onClick={() => onSelect(center)}
            className="netflix-card p-4 text-left hover:border-[#E50914] border-2 border-transparent transition-colors"
          >
            <h3 className="text-lg font-semibold text-white mb-2">{center.name}</h3>
            <p className="text-sm text-gray-300">{center.location.address}</p>
            <p className="text-sm text-gray-400 mt-2">
              Pastor: {center.pastor.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}