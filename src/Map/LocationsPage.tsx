'use client';
import React, { useState, useEffect, useRef } from 'react';
import LocationDropdown from './LocationDropdown';
import Map from './Map';

// Define a type for location
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

// Define props interface
interface LocationsPageProps {
  titleText: string;
  highlightText: string;
  description: string;
  locations: Location[];
}

const LocationsPage: React.FC<LocationsPageProps> = ({
  titleText,
  highlightText,
  description,
  locations
}) => {
  // State to manage selected location
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

  // Initially set visible locations to empty array (no markers shown)
  const [visibleLocations, setVisibleLocations] = useState<Location[]>([]);

  // State to manage marker visibility
  const [showMarker, setShowMarker] = useState(true);

  // Reference to access marker click function
  const markerClickRef = useRef<(locationId: string) => void>(() => {});

  // Handler for location or category selection
  const handleLocationSelect = (location: Location, keepCategoryVisible = false) => {
    // Check if this is an empty selection (to clear markers)
    if (location.id === 'empty') {
      setVisibleLocations([]);
      setSelectedLocation(null);
      setSelectedCategory(null);
      setSelectedLocationId(null);
      setShowMarker(false);
      return;
    }
    
    // Check if this is a category selection (id starts with "category-")
    if (location.id.startsWith('category-')) {
      // Show all locations in this category
      const categoryLocations = locations.filter(loc => loc.category === location.category);
      setVisibleLocations(categoryLocations);
      setSelectedLocation(null);
      setSelectedCategory(location.category);
      setSelectedLocationId(null);
      setShowMarker(true);
    } else {
      // This is a specific location selection
      setSelectedLocation(location);
      setSelectedLocationId(location.id);
      
      if (keepCategoryVisible) {
        // Keep all locations from the same category visible
        const categoryLocations = locations.filter(loc => loc.category === location.category);
        setVisibleLocations(categoryLocations);
        setSelectedCategory(location.category);
        
        // Trigger the marker click for this specific location
        setTimeout(() => {
          markerClickRef.current(location.id);
        }, 100);
      } else {
        // Show only this location on map (original behavior)
        setVisibleLocations([location]);
        setSelectedCategory(location.category);
      }
      
      setShowMarker(true);
    }
  };

  // Set the marker click handler function
  const setMarkerClickHandler = (handler: (locationId: string) => void) => {
    markerClickRef.current = handler;
  };

  // Modify marker click handler to only update selected location
  const handleMarkerClick = (locationId: string) => {
    // Find the location by id
    const location = locations.find(loc => loc.id === locationId);
    if (location) {
      setSelectedLocation(location);
      setSelectedLocationId(locationId);
    }
  };

  return (
    <div className="h-screen w-screen md:px-12 md:py-4  flex flex-col justify-around items-center">
      <div className=" w-full flex flex-col md:justify-center items-center py-8 px-4 md:p-0">
        <div className="flex flex-col justify-center items-center md:flex-row  ">
          <div className="md:text-5xl text-4xl font-ivymode">{titleText}</div>
          <div className="text-primary md:text-8xl text-7xl  font-ivymode">
            {highlightText}
          </div>
        </div>

        <div className="md:w-1/3 w-full text-center md:text-sm text-sm mt-4">
          {description}
        </div>
      </div>

      {/* Map Container */}
      <div className="w-full md:h-2/3 h-5/6 p-0  md:rounded-3xl relative overflow-hidden">
        
        <LocationDropdown
          locations={locations}
          onLocationSelect={handleLocationSelect}
          selectedCategory={selectedCategory}
          selectedLocationId={selectedLocationId}
        />

        <Map
          locations={visibleLocations}
          selectedLocation={selectedLocation}
          showMarker={showMarker}
          onMarkerClick={handleMarkerClick}
          setMarkerClickHandler={setMarkerClickHandler}
        />
      </div>
    </div>
  );
};

export default LocationsPage;
