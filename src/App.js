// import React, { useEffect, useRef, useState } from "react";
// import LocationsPage from "./Map/LocationsPage";





// const App = () => {

//   const sampleDescription = 'Explore endless shopping delights and indulge in exquisite dining at our vibrant space. ';
// const sampleLocations = [
//   {
//     id: '1',
//     name: 'FitCode',
//     coordinates: [55.23189904028419, 25.033029718192182] ,
//     description: 'Premium fitness center at Tilal Al Ghaf',
//     category: 'Fitness',
//     imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg',
//     shopNumber: 1,
//     openingTime: '6:00',
//     closingTime: '22:00',
//     url: 'https://www.fitcode.com'
//   },
//   {
//     id: '2',
//     name: 'Big Smoke Burger',
//     coordinates: [55.23193712107815, 25.03296325324233] ,
//     description: 'Gourmet burger restaurant at Tilal Al Ghaf',
//     category: 'Restaurant',
//     imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg',
//     shopNumber: 2,
//     openingTime: '10:00',
//     closingTime: '22:00',
//     url: 'https://www.bigsmokeburger.com'
//   },
//   {
//     id: '3',
//     name: 'Starbucks',
//     coordinates: [55.23197856118887, 25.032902465396035] ,
//     description: 'World-famous coffeehouse at Tilal Al Ghaf',
//     category: 'Restaurant',
//     imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg',
//     shopNumber: 3,
//     openingTime: '7:00',
//     closingTime: '23:00',
//     url: 'https://www.starbucks.com'
//   },
//   {
//     id: '4',
//     name: 'Riina',
//     coordinates: [55.23199071334716, 25.03284001708859] ,
//     description: 'Contemporary dining experience at Tilal Al Ghaf',
//     category: 'Restaurant',
//     imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg', // placeholder for restaurant logo
//     shopNumber: 4,
//     openingTime: '12:00',
//     closingTime: '23:00',
//     url: 'https://www.riina.com'
//   },
//   {
//     id: '5',
//     name: 'The Laundry Hub',
//     coordinates: [55.23202590806477, 25.03278318672875] ,
//     description: 'Professional laundry services at Tilal Al Ghaf',
//     category: 'Others',
//     imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg', // laundry service logo
//     shopNumber: 5,
//     openingTime: '9:00',
//     closingTime: '21:00',
//     url: 'https://www.thelaundryhub.com'
//   },
//   {
//     id: '6',
//     name: 'Al Douri',
//     coordinates: [55.23204923069832, 25.03274943485225] ,
//     description: 'Fresh food market and grocery at Tilal Al Ghaf',
//     category: 'Restaurant',
//     imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg',
//     shopNumber: 6,
//     openingTime: '8:00',
//     closingTime: '22:00',
//     url: 'https://www.aldouri.com'
//   },
//   {
//     id: '7',
//     name: 'The Loft Fifth Avenue',
//     coordinates: [55.23208427604982, 25.03270587355115] ,
//     description: 'Luxury salon and beauty experience at Tilal Al Ghaf',
//     category: 'Shopping',
//     imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg', // salon logo placeholder
//     shopNumber: 7,
//     openingTime: '10:00',
//     closingTime: '20:00',
//     url: 'https://www.theloft5thavenue.com'
//   },
//   {
//     id: '8',
//     name: 'MedCare Medical Centre',
//     coordinates: [55.23212218339805, 25.03265120247741] ,
//     description: 'Comprehensive healthcare services at Tilal Al Ghaf',
//     category: 'Others',
//     imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg',
//     shopNumber: 8,
//     openingTime: '9:00',
//     closingTime: '21:00',
//     url: 'https://www.medcare.ae'
//   },
//   {
//     id: '9',
//     name: 'Aster Pharmacy',
//     coordinates: [55.23214109547354, 25.032625546891637] ,
//     description: 'Trusted pharmacy for all healthcare needs',
//     category: 'Others',
//     imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg',
//     shopNumber: 9,
//     openingTime: '8:00',
//     closingTime: '22:00',
//     url: 'https://www.asterpharmacy.com'
//   },
//   {
//     id: '10',
//     name: "Leen's",
//     coordinates: [55.232214183218815, 25.03250552873699] ,
//     description: 'Casual dining restaurant at Tilal Al Ghaf',
//     category: 'Restaurant',
//     imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg', // placeholder for cafe/restaurant
//     shopNumber: 10,
//     openingTime: '10:00',
//     closingTime: '23:00',
//     url: 'https://www.leens.com'
//   },
//   {
//     id: '11',
//     name: 'Carrefour',
//     coordinates: [55.23225228869697, 25.032447091199245] ,
//     description: 'Supermarket and grocery store at Tilal Al Ghaf',
//     category: 'Shopping',
//     imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg',
//     shopNumber: 11,
//     openingTime: '8:00',
//     closingTime: '23:00',
//     url: 'https://www.carrefouruae.com'
//   }
  
// ];


//   return (<>
//   <div className='h-screen w-screen'>
//       <LocationsPage locations={sampleLocations} description={sampleDescription} titleText="What's your" highlightText="Vibe?" />
//     </div>
//   </>);

// }


// export default App;


import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import planDay2 from './Plan_Day2.png';

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    // TO MAKE THE MAP APPEAR YOU MUST
    // ADD YOUR ACCESS TOKEN FROM
    // https://account.mapbox.com
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VydWJhcmFuIiwiYSI6ImNtNjdqY3g3ZzAxcjkya3B0OXBrZzR6cG4ifQ.KS6Q4NhPYHB1t3bHSp7u9A';

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/standard',
      config: {
        basemap: {
          theme: 'monochrome',
          lightPreset: 'night'
        }
      },
      
      minZoom: 4,
      zoom: 18,
      center: [54.35336,24.482823]
    });

    mapRef.current.on('load', () => {
      mapRef.current.addSource('radar', {
        type: 'image',
                url: planDay2,
        coordinates: [

          [54.355856, 24.480094],
          [54.353538, 24.482755],
          [54.356768, 24.485043],
          [54.358979, 24.482443]

        
        ]
      });
      mapRef.current.addLayer({
        id: 'radar-layer',
        type: 'raster',
        source: 'radar',
        paint: {
          'raster-fade-duration': 0,
          'raster-emissive-strength': 1
        }
      });
    });
  }, []);

  return <div id="map" ref={mapContainerRef} style={{ height: '100%' }}></div>;
};

export default MapboxExample;
