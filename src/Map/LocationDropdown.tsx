import React, { useState, useEffect } from 'react';
import cn from 'classnames';


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

interface LocationDropdownProps {
  locations: Location[];
  className?: string;
  onLocationSelect: (location: Location, keepCategoryVisible?: boolean) => void;
  selectedCategory: string | null;
  selectedLocationId: string | null;
}

const LocationDropdown: React.FC<LocationDropdownProps> = ({
  locations,
  className,
  onLocationSelect,
  selectedCategory,
  selectedLocationId
}) => {
  const [locationsByCategory, setLocationsByCategory] = useState<
    Record<string, Location[]>
  >({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // Keep track of which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const categorizedLocations = locations.reduce(
      (acc, location) => {
        const { category } = location;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(location);
        return acc;
      },
      {} as Record<string, Location[]>
    );

    setLocationsByCategory(categorizedLocations);
  }, [locations]);

  const toggleCategory = (category: string) => {
    // Toggle the expanded state of the category
    const newExpandedState = !expandedCategories[category];
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: newExpandedState
    }));

    // If the category is being closed, clear the markers
    if (!newExpandedState) {
      // Create an empty location to signal that no markers should be shown
      const emptyLocation: Location = {
        id: 'empty',
        name: '',
        coordinates: [0, 0],
        category: ''
      };
      onLocationSelect(emptyLocation);
      return;
    }

    // Show all locations in this category on the map
    const locationsInCategory = locationsByCategory[category] || [];
    if (locationsInCategory.length > 0) {
      // Create a "virtual" location with the category's coordinates centered
      const avgLat =
        locationsInCategory.reduce((sum, loc) => sum + loc.coordinates[1], 0) /
        locationsInCategory.length;
      const avgLng =
        locationsInCategory.reduce((sum, loc) => sum + loc.coordinates[0], 0) /
        locationsInCategory.length;

      const categoryLocation: Location = {
        id: `category-${category}`,
        name: category,
        coordinates: [avgLng, avgLat],
        category: category
      };

      onLocationSelect(categoryLocation);
    }
  };

  const handleLocationClick = (location: Location) => {
    // Pass true to keep all category markers visible
    onLocationSelect(location, true);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={cn(
        'absolute z-10 w-[300px] mt-16',
        'left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-2',
        className
      )}>
      {/* Main dropdown button */}
      <button
        onClick={toggleDropdown}
        className="w-full text-white bg-orange-400 p-3 rounded-lg font-medium flex justify-between items-center">
        <span>Filters</span>
        
      </button>

      {/* Dropdown content */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg z-20 overflow-hidden">
          <div
            className="max-h-60 overflow-y-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {/* Add inline style to hide scrollbar for all browsers */}

            {Object.keys(locationsByCategory).map((category) => (
              <div key={category}>
                {/* Category header */}
                <div
                  className={cn(
                    'p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 flex justify-between items-center',
                    {
                      'bg-orange-400 text-white hover:bg-orange-400/90':
                        selectedCategory === category
                    }
                  )}
                  onClick={() => toggleCategory(category)}>
                    <div></div>
                  <span>{category}</span>
                  <div className="flex items-center">
                   
                  </div>
                </div>

                {/* Locations for this category, shown when expanded */}
                {expandedCategories[category] &&
                  locationsByCategory[category]?.map((location) => (
                    <div
                      key={location.id}
                      className={cn(
                        'p-3 pl-6 hover:bg-gray-100 cursor-pointer border-b border-gray-200 bg-gray-50',
                        {
                          'bg-orange-400/20 font-semibold':
                            selectedLocationId === location.id
                        }
                      )}
                      onClick={() => handleLocationClick(location)}>
                      <div className="font-medium">{location.name}</div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationDropdown;
