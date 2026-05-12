import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useData } from '../../context/DataContext';

// Fix for default Leaflet icon in React
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Mock coordinates for handlers (since location is a string in mock data, we assign generic lat/lng)
const mockCoordinates: Record<string, [number, number]> = {
  'h1': [40.7128, -74.0060], // Manhattan
  'h2': [40.7178, -74.0431], // Jersey City
};

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
        center={[40.7128, -74.0060]} 
        zoom={11} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {handlers.map(h => {
          const position = mockCoordinates[h.id] || [40.7128, -74.0060];
          return (
            <Marker key={h.id} position={position} icon={customIcon}>
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
