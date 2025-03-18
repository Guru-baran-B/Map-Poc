import type { Meta, StoryObj } from '@storybook/react';
import LocationsPage from './LocationsPage';

// Sample locations data for Storybook

const sampleDescription = 'Explore endless shopping delights and indulge in exquisite dining at our vibrant space. ';
const sampleLocations = [
  {
    id: '1',
    name: 'FitCode',
    coordinates: [55.23189904028419, 25.033029718192182] as [number, number],
    description: 'Premium fitness center at Tilal Al Ghaf',
    category: 'Fitness',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg',
    shopNumber: 1,
    openingTime: '6:00',
    closingTime: '22:00',
    url: 'https://www.fitcode.com'
  },
  {
    id: '2',
    name: 'Big Smoke Burger',
    coordinates: [55.23193712107815, 25.03296325324233] as [number, number],
    description: 'Gourmet burger restaurant at Tilal Al Ghaf',
    category: 'Restaurant',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg',
    shopNumber: 2,
    openingTime: '10:00',
    closingTime: '22:00',
    url: 'https://www.bigsmokeburger.com'
  },
  {
    id: '3',
    name: 'Starbucks',
    coordinates: [55.23197856118887, 25.032902465396035] as [number, number],
    description: 'World-famous coffeehouse at Tilal Al Ghaf',
    category: 'Restaurant',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg',
    shopNumber: 3,
    openingTime: '7:00',
    closingTime: '23:00',
    url: 'https://www.starbucks.com'
  },
  {
    id: '4',
    name: 'Riina',
    coordinates: [55.23199071334716, 25.03284001708859] as [number, number],
    description: 'Contemporary dining experience at Tilal Al Ghaf',
    category: 'Restaurant',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg', // placeholder for restaurant logo
    shopNumber: 4,
    openingTime: '12:00',
    closingTime: '23:00',
    url: 'https://www.riina.com'
  },
  {
    id: '5',
    name: 'The Laundry Hub',
    coordinates: [55.23202590806477, 25.03278318672875] as [number, number],
    description: 'Professional laundry services at Tilal Al Ghaf',
    category: 'Others',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg', // laundry service logo
    shopNumber: 5,
    openingTime: '9:00',
    closingTime: '21:00',
    url: 'https://www.thelaundryhub.com'
  },
  {
    id: '6',
    name: 'Al Douri',
    coordinates: [55.23204923069832, 25.03274943485225] as [number, number],
    description: 'Fresh food market and grocery at Tilal Al Ghaf',
    category: 'Restaurant',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg',
    shopNumber: 6,
    openingTime: '8:00',
    closingTime: '22:00',
    url: 'https://www.aldouri.com'
  },
  {
    id: '7',
    name: 'The Loft Fifth Avenue',
    coordinates: [55.23208427604982, 25.03270587355115] as [number, number],
    description: 'Luxury salon and beauty experience at Tilal Al Ghaf',
    category: 'Shopping',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg', // salon logo placeholder
    shopNumber: 7,
    openingTime: '10:00',
    closingTime: '20:00',
    url: 'https://www.theloft5thavenue.com'
  },
  {
    id: '8',
    name: 'MedCare Medical Centre',
    coordinates: [55.23212218339805, 25.03265120247741] as [number, number],
    description: 'Comprehensive healthcare services at Tilal Al Ghaf',
    category: 'Others',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg',
    shopNumber: 8,
    openingTime: '9:00',
    closingTime: '21:00',
    url: 'https://www.medcare.ae'
  },
  {
    id: '9',
    name: 'Aster Pharmacy',
    coordinates: [55.23214109547354, 25.032625546891637] as [number, number],
    description: 'Trusted pharmacy for all healthcare needs',
    category: 'Others',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg',
    shopNumber: 9,
    openingTime: '8:00',
    closingTime: '22:00',
    url: 'https://www.asterpharmacy.com'
  },
  {
    id: '10',
    name: "Leen's",
    coordinates: [55.232214183218815, 25.03250552873699] as [number, number],
    description: 'Casual dining restaurant at Tilal Al Ghaf',
    category: 'Restaurant',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg', // placeholder for cafe/restaurant
    shopNumber: 10,
    openingTime: '10:00',
    closingTime: '23:00',
    url: 'https://www.leens.com'
  },
  {
    id: '11',
    name: 'Carrefour',
    coordinates: [55.23225228869697, 25.032447091199245] as [number, number],
    description: 'Supermarket and grocery store at Tilal Al Ghaf',
    category: 'Shopping',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg',
    shopNumber: 11,
    openingTime: '8:00',
    closingTime: '23:00',
    url: 'https://www.carrefouruae.com'
  }
  
];

const meta: Meta<typeof LocationsPage> = {
  title: 'Top Level/LocationsPage',
  component: LocationsPage,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className='h-screen w-screen'>
      <LocationsPage locations={sampleLocations} description={sampleDescription} titleText="What's your" highlightText="Vibe?" />
    </div>
  )
};



