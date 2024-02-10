import React, { useEffect, useRef } from "react";
import { TileLayer, GeoJSON, FeatureGroup, Popup, MapContainer } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";

interface MapProps {
  geoJson: GeoJSON.Feature;
}

const DEFAULT_POSITION: LatLngExpression = [51.11037329711444, 17.032561807844445];

const Map = ({ geoJson }: MapProps): JSX.Element => {
  const mapRef = useRef(null);

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
    <MapContainer ref={mapRef} center={DEFAULT_POSITION} zoom={13} scrollWheelZoom={false} style={{ height: "100%", minHeight: "100%" }}>
      <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />
      {geoJson && (
        <FeatureGroup pathOptions={{ color: "#6b6bAB" }}>
          <GeoJSON data={geoJson} />
          {geoJson.properties?.description &&
            <Popup>
              <p className="text-xs">{(geoJson).properties.description}</p>
            </Popup>
          }
        </FeatureGroup>
      )}
    </MapContainer>
  )
};

export default Map;
