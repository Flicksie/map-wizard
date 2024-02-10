export default function isValidGeoJSON(json: string) {
    try {
        const parsed = JSON.parse(json);
        if (parsed.type && parsed.type === 'FeatureCollection') {
            if (!Array.isArray(parsed.features)) {
                return false;
            }
        } else if (parsed.type && parsed.type === 'Feature') {
            if (!parsed.geometry || !parsed.properties) {
                return false;
            }
        } else if (parsed.type && (parsed.type === 'Point' || parsed.type === 'LineString' || parsed.type === 'Polygon' || parsed.type === 'MultiPoint' || parsed.type === 'MultiLineString' || parsed.type === 'MultiPolygon')) {
            if (!Array.isArray(parsed.coordinates) && parsed.type !== 'Point') {
                return false;
            }
        } else {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}
