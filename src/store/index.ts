import { create } from 'zustand';
import { Member, FellowshipCenter, Church } from '../types';
import { samplePastors, sampleFellowshipCenters } from './sampleData';

const church: Church = {
  id: '1',
  name: 'God\'s Chamber Global Ministries',
  mainAddress: 'Glory House, No. 3 Ajayi Road, Ogba, Lagos',
  location: { lat: 6.6273, lng: 3.3414 },
  fellowshipCenters: sampleFellowshipCenters,
  pastors: samplePastors,
};

// Update fellowship centers with their church reference
sampleFellowshipCenters.forEach(center => {
  center.church = church;
});

export const useStore = create<AppState>((set) => ({
  members: [],
  fellowshipCenters: sampleFellowshipCenters,
  churches: [church],
  
  addMember: (member) =>
    set((state) => ({
      members: [...state.members, member],
    })),
    
  assignFellowshipCenter: (memberId, centerId) =>
    set((state) => ({
      members: state.members.map((member) =>
        member.id === memberId
          ? {
              ...member,
              fellowshipCenter: state.fellowshipCenters.find((c) => c.id === centerId),
            }
          : member
      ),
    })),
}));