import React from 'react';
import { Users, MapPin, ChurchIcon } from 'lucide-react';
import { useStore } from '../store';

export default function Dashboard() {
  const members = useStore((state) => state.members);
  const fellowshipCenters = useStore((state) => state.fellowshipCenters);

  return (
    <div className="space-y-6">
      <header className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-lg p-3">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Total Members</h2>
              <p className="text-3xl font-bold text-gray-900">{members.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-lg p-3">
              <ChurchIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Fellowship Centers</h2>
              <p className="text-3xl font-bold text-gray-900">{fellowshipCenters.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-lg p-3">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Active Locations</h2>
              <p className="text-3xl font-bold text-gray-900">
                {new Set(members.map(m => m.address)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Registrations</h2>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {members.slice(0, 5).map((member) => (
              <li key={member.id} className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="bg-gray-100 rounded-full p-2">
                      <Users className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {member.fullName}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{member.email}</p>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-500">
                    {new Date(member.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}