import React, { useEffect, useRef, useState } from 'react';
import { TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';

interface MapProps {
  geoJson: string;
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
      const parsedGeoJson = JSON.parse(geoJson);
      if (mapRef.current) {
        const map = mapRef.current;
        map.flyToBounds(L.geoJSON(parsedGeoJson).getBounds());
      }
    }
  }, [geoJson]);

  //console.log('GeoJSON:', geoJson);


  return (
    <MapContainer ref={mapRef} center={position} zoom={13} scrollWheelZoom={false} style={{ height: "100%", minHeight: "100%" }}>

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeView center={position} zoom={10} />
      {geoJson && <GeoJSON data={JSON.parse(geoJson)} />}

    </MapContainer>
  )
};

//   <GeoJSON key={keyFunction(this.props.map.data.json)} data={this.props.map.data.json} />
export default Map;

