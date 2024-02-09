import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface MapProps {
    geoJson: string;
}

const Map = ({ geoJson }:MapProps): JSX.Element => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = L.map(mapRef.current).setView([0, 0], 2);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

      if (geoJson) {
        const geoJsonLayer = L.geoJSON(JSON.parse(geoJson)).addTo(map);
        map.fitBounds(geoJsonLayer.getBounds());
      }
    }
  }, [geoJson]);

  return <div ref={mapRef} style={{ height: '400px' }} />;
};

export default Map;
