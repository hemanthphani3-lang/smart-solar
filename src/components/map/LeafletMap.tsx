import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useData } from '../../context/DataContext';

// Fix for default Leaflet icon in React
const customIcon = L.divIcon({
  className: 'custom-green-marker',
  html: '<div style="width: 6px; height: 6px; background-color: var(--primary); border-radius: 50%; border: 1px solid white; box-shadow: 0 0 5px var(--primary);"></div>',
  iconSize: [6, 6],
  iconAnchor: [3, 3]
});

// Coordinate mapping for major Indian cities to ensure spots are on land
const cityCoords: Record<string, [number, number]> = {
  'Mumbai': [19.0760, 72.8777], 'Delhi': [28.6139, 77.2090], 'Bangalore': [12.9716, 77.5946],
  'Hyderabad': [17.3850, 78.4867], 'Ahmedabad': [23.0225, 72.5714], 'Chennai': [13.0827, 80.2707],
  'Kolkata': [22.5726, 88.3639], 'Surat': [21.1702, 72.8311], 'Pune': [18.5204, 73.8567],
  'Jaipur': [26.9124, 75.7873], 'Lucknow': [26.8467, 80.9462], 'Kanpur': [26.4499, 80.3319],
  'Nagpur': [21.1458, 79.0882], 'Indore': [22.7196, 75.8577], 'Thane': [19.2183, 72.9781],
  'Bhopal': [23.2599, 77.4126], 'Visakhapatnam': [17.6868, 83.2185], 'Patna': [25.5941, 85.1376],
  'Vadodara': [22.3072, 73.1812], 'Ghaziabad': [28.6692, 77.4538], 'Ludhiana': [30.9010, 75.8573],
  'Agra': [27.1767, 78.0081], 'Nashik': [19.9975, 73.7898], 'Faridabad': [28.4089, 77.3178],
  'Meerut': [28.9845, 77.7064], 'Rajkot': [22.3039, 70.8022], 'Varanasi': [25.3176, 82.9739],
  'Srinagar': [34.0837, 74.7973], 'Aurangabad': [19.8762, 75.3433], 'Dhanbad': [23.7957, 86.4304],
  'Amritsar': [31.6340, 74.8723], 'Ranchi': [23.3441, 85.3096], 'Howrah': [22.5769, 88.3186],
  'Jabalpur': [23.1815, 79.9864], 'Gwalior': [26.2183, 78.1828], 'Vijayawada': [16.5062, 80.6480],
  'Jodhpur': [26.2389, 73.0243], 'Madurai': [9.9252, 78.1198], 'Raipur': [21.2514, 81.6296],
  'Kota': [25.2138, 75.8648], 'Guwahati': [26.1445, 91.7362], 'Chandigarh': [30.7333, 76.7794]
};

const indianCities = Object.keys(cityCoords);

// Function to generate coordinates mapped to real cities with slight jitter
const generateMockCoordinates = (count: number) => {
  const coords: Record<string, [number, number]> = {};
  for (let i = 1; i <= count; i++) {
    const city = indianCities[i % indianCities.length];
    const baseCoord = cityCoords[city];
    
    // Add jitter to spread markers around city centers (approx 20-50km)
    const jitterLat = (Math.random() - 0.5) * 0.8;
    const jitterLng = (Math.random() - 0.5) * 0.8;
    
    coords[`h${i}`] = [baseCoord[0] + jitterLat, baseCoord[1] + jitterLng];
  }
  return coords;
};

const mockCoordinates = generateMockCoordinates(1284);

const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const LeafletMap = () => {
  const { handlers } = useData();

  return (
    <div style={{ height: '100%', width: '100%', borderRadius: '1rem', overflow: 'hidden' }}>
      <MapContainer 
        center={[20.5937, 78.9629]} 
        zoom={5} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {handlers.map(h => {
          const position = mockCoordinates[h.id] || [16.5, 80.0];
          return (
            <Marker 
              key={h.id} 
              position={position} 
              icon={customIcon}
            >
              <Popup>
                <div style={{ padding: '0.5rem', color: '#333' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{h.name}</h3>
                  <p style={{ margin: '0 0 0.25rem 0' }}><strong>ID:</strong> {h.unique_id}</p>
                  <p style={{ margin: '0 0 0.25rem 0' }}><strong>Status:</strong> {h.active_status ? 'Active' : 'Offline'}</p>
                  <p style={{ margin: '0 0 0.25rem 0' }}><strong>Capacity:</strong> {h.consumers.length} / 4 Consumers</p>
                  <p style={{ margin: 0 }}><strong>Generation:</strong> {h.total_generation} kWh</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
