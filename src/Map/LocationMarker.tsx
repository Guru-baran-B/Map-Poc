

const LocationMarker: React.FC = () => {
  return (
    <div>
      <div className="w-5 h-5 bg-orange-400 rounded-full border-2 border-white shadow-md cursor-pointer hover:bg-orange-600 transition-colors duration-200" />
      
      {/* Optional: Add a pulse effect */}
      <div className="absolute -inset-1 bg-primary rounded-full opacity-30 animate-ping" />
      
     
    </div>
  );
};

export default LocationMarker; 