import React from 'react';


interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
  description?: string;
  imageUrl?: string;
  shopNumber?: number;
  openingTime?: string;
  closingTime?: string;
  url?: string;
  category: string;
}

interface LocationCardProps {
  location: Location;
  onClose?: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ 
  location, 
  onClose 
}) => {
  return (
    <div className="bg-white rounded-lg w-[300px] p-6">
      <div className="flex items-center justify-between">
        <div className="w-11 h-11 bg-orange-400 rounded-full overflow-hidden flex items-center justify-center">
          <img src={location.imageUrl} className="w-full h-full object-cover rounded-full" />
        </div>
        <div> {location.shopNumber}</div>
      </div>

      <div className="mt-2">{location.description}</div>

      <div className="flex mt-2 items-center justify-between">
         <div className="flex items-center gap-2"><div>{location.openingTime} - {location.closingTime}</div></div>
         <div><button className="bg-orange-400 text-white px-4 py-1 rounded-2xl">Vist Store</button></div>
      </div>
     
    </div>
  );
};

export default LocationCard;