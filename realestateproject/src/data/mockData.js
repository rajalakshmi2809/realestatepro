import image1 from "../assets/Buildings/image1.jpg";
import image2 from "../assets/Buildings/image2.jpg";
import image3 from "../assets/Buildings/image3.jpg";
import image4 from "../assets/Buildings/image4.jpg";

export const properties = [
  {
    id: 1,
    name: 'Iswarya Nagar House',
    type: 'HOUSE',
    address: 'Pallavaram, Chennai',
    bhk: '3 BHK',
    sqft: '1800 Sq.ft.',
    price: '₹ 1.00 Cr',
    status: 'READY TO MOVE',
    images: [image3]
  },
  {
    id: 2,
    name: 'Alliance Galleria Residences',
    type: 'APARTMENT',
    address: 'Pallavaram, Chennai',
    bhk: '2 BHK',
    sqft: '1400 Sq.ft.',
    price: '₹ 85 Lakhs',
    status: 'READY TO MOVE',
    images: [image2]
  },
  {
    id: 3,
    name: 'Olympia Opaline',
    type: 'APARTMENT',
    address: 'Navalur, OMR, Chennai',
    bhk: '3 BHK',
    sqft: '1550 Sq.ft.',
    price: '₹ 95 Lakhs',
    status: 'READY TO MOVE',
    images: [image4]
  },
  {
    id: 4,
    name: 'Prestige Bella Vista',
    type: 'VILLA',
    address: 'Porur, Chennai',
    bhk: '3 BHK',
    sqft: '2500 Sq.ft.',
    price: '₹ 1.5 Cr',
    status: 'UNDER CONSTRUCTION',
    images: [image1]
  }
];

export const tenants = [
  {
    id: 1,
    name: 'Ramesh Kumar',
    since: '2021',
    property: 'Ishwarya  Nagar House',
    unit: 'Flat A-101',
    status: 'Active',
    email: 'ramesh.kumar@gmail.com',
    phone: '+91 98765 43210',
    lastPaymentDate: '01 Oct 2026',
    lastPaymentStatus: 'On-time',
    rentAmount: '₹35,000',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Ramesh'
  },
  {
    id: 2,
    name: 'Priya Lakshmi',
    since: '2022',
    property: 'Alliance Galleria Residences',
    unit: 'Flat B-205',
    status: 'Expiring Soon',
    email: 'priya.lakshmi@gmail.com',
    phone: '+91 91234 56789',
    lastPaymentDate: '28 Sep 2026',
    lastPaymentStatus: 'Autopay',
    rentAmount: '₹30,500',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Priya'
  },
  {
    id: 3,
    name: 'Arun Prakash',
    since: '2019',
    property: 'Alliance Galleria Residences',
    unit: 'Flat C-302',
    status: 'Active',
    email: 'arun.prakash@gmail.com',
    phone: '+91 99887 77665',
    lastPaymentDate: 'Pending',
    lastPaymentStatus: 'Past Due',
    rentAmount: '₹30,000',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Arun'
  },
  {
    id: 4,
    name: 'Divya Shankar',
    since: '2023',
    property: 'OMR Elite Homes',
    unit: 'Flat D-404',
    status: 'Active',
    email: 'divya.shankar@gmail.com',
    phone: '+91 90909 80808',
    lastPaymentDate: '02 Oct 2026',
    lastPaymentStatus: 'On-time',
    rentAmount: '₹50,000',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Divya'
  },
  {
    id: 5,
    name: 'Karthik Raj',
    since: '2020',
    property: 'Ishwarya Nagar House',
    unit: 'Flat E-505',
    status: 'Active',
    email: 'karthik.raj@gmail.com',
    phone: '+91 93456 78901',
    lastPaymentDate: '05 Oct 2026',
    lastPaymentStatus: 'On-time',
    rentAmount: '₹30,000',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Karthik'
  }
];

export const maintenanceTickets = [
  {
    id: 1,
    priority: 'HIGH PRIORITY',
    date: '12 May, 2026',
    title: 'Water leakage in Flat B-402 causing living room flooding',
    assignedTo: 'Ramesh Kumar',
    property: 'Iswarya Nagar Apartments',
    status: 'STATUS: NEW'
  },
  {
    id: 2,
    priority: 'MEDIUM PRIORITY',
    date: '11 May, 2026',
    title: 'Lift making unusual noise in Block A',
    assignedTo: 'Maintenance Team',
    property: 'Alliance Galleria Residences',
    status: 'IN PROGRESS'
  },
  {
    id: 3,
    priority: 'NORMAL PRIORITY',
    date: '10 May, 2026',
    title: 'Kitchen cabinet door hinge loose in Villa 07',
    assignedTo: 'Suresh Electrician',
    property: 'Prestige Bella Vista',
    status: 'SCHEDULED: TOMORROW'
  },
  {
    id: 4,
    priority: 'HIGH PRIORITY',
    date: '09 May, 2026',
    title: 'Power fluctuation issue in common parking area',
    assignedTo: 'EB Technician',
    property: 'Olympia Opaline',
    status: 'IN PROGRESS'
  }
];

export const financialLedger = [
  {
    id: 1,
    description: 'Rent Received - Flat B-402',
    entity: 'Iswarya Nagar House',
    category: 'INCOME',
    date: '12 June, 2026',
    amount: '+₹28,000',
    type: 'positive'
  },
  {
    id: 2,
    description: 'Lift Maintenance Charges',
    entity: 'Alliance Galleria Residences',
    category: 'MAINTENANCE',
    date: '10 June, 2026',
    amount: '-₹6,500',
    type: 'negative'
  },
  {
    id: 3,
    description: 'Lease Renewal Advance',
    entity: 'Olympia Opaline',
    category: 'INCOME',
    date: '08 June, 2026',
    amount: '+₹45,000',
    type: 'positive'
  },
  {
    id: 4,
    description: 'Electricity Bill - Common Area',
    entity: 'Prestige Bella Vista',
    category: 'UTILITY',
    date: '05 June, 2026',
    amount: '-₹3,200',
    type: 'negative'
  },
  {
    id: 5,
    description: 'Water Tank Cleaning Service',
    entity: 'Iswarya Nagar Apartments',
    category: 'MAINTENANCE',
    date: '02 June, 2026',
    amount: '-₹2,800',
    type: 'negative'
  }
];
