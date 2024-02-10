import React, { useEffect, useRef, useState } from 'react';
import { TileLayer, GeoJSON, useMap, FeatureGroup, Popup, MapContainer } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';

import 'leaflet/dist/leaflet.css';

interface MapProps {
  geoJson: GeoJSON.Feature;
}

const DEFAULT_POSITION: LatLngExpression = [51.11037329711444, 17.032561807844445];

const Map = ({ geoJson }: MapProps): JSX.Element => {

  const mapRef = useRef(null);

  const [position, setPosition] = useState<LatLngExpression>(DEFAULT_POSITION);

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  useEffect(() => {
    if (geoJson) {
      const parsedGeoJson = geoJson;
      if (mapRef.current) {
        const map = mapRef.current;
        map.flyToBounds(L.geoJSON(parsedGeoJson).getBounds());
      }
    }
  }, [geoJson]);



  return (
    <MapContainer ref={mapRef} center={position} zoom={13} scrollWheelZoom={false} style={{ height: "100%", minHeight: "100%" }}>

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeView center={position} zoom={12} />
      {geoJson && (
        <FeatureGroup pathOptions={{ color: 'red' }}>
          <GeoJSON data={geoJson} />
          {geoJson.properties?.description &&
            <Popup position={position}>
              <p className="text-xs">{(geoJson).properties.description}</p>
            </Popup>
          }
        </FeatureGroup>
      )}
    </MapContainer>
  )
};

export default Map;

