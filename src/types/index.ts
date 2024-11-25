export interface Member {
  id: string;
  fullName: string;
  birthday: string;
  email: string;
  phone: string;
  membershipLevel: 'New' | 'Existing';
  group: 'Men' | 'Women' | 'Youth' | 'Teens' | 'Children';
  maritalStatus: 'Single' | 'Married' | 'Widowed' | 'Divorced';
  address: string;
  street?: string;
  location: {
    lat: number;
    lng: number;
  };
  fellowshipCenter?: FellowshipCenter;
  church: Church;
  createdAt: string;
}

export interface FellowshipCenter {
  id: string;
  name: string;
  pastor: Pastor;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  streets: string[];
  whatsappGroup: string;
  church: Church;
  members: Member[];
}

export interface Pastor {
  id: string;
  name: string;
  phone: string;
  email: string;
  fellowshipCenters: FellowshipCenter[];
}

export interface Church {
  id: string;
  name: string;
  mainAddress: string;
  location: {
    lat: number;
    lng: number;
  };
  fellowshipCenters: FellowshipCenter[];
  pastors: Pastor[];
}