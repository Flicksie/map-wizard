const { createProject } = require('./mockApi');

const mockFormData = new FormData();
mockFormData.append('name', 'valid');
mockFormData.append('description', 'description');
mockFormData.append('startDate', '2020-01-01');
mockFormData.append('endDate', '2020-01-02');
mockFormData.append('areaOfInterest', new Blob([`{
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [125.6, 10.1]
    },
    "properties": {
      "name": "Dinagat Islands"
    }
  }`], { type: 'application/json' }));


jest.mock('./validators/isValidGeoJSON', () => jest.fn());

describe('createProject', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        mockFormData.set('name', 'valid');
        mockFormData.set('description', 'description');
        mockFormData.set('startDate', '2020-01-01');
        mockFormData.set('endDate', '2020-01-02');
    });

    const mockIsValidGeoJson = require('./validators/isValidGeoJSON');


    it('should return a rejected promise with a message if the project name is invalid', async () => {
        mockFormData.set('name', 'invalid');
        const result = await createProject(mockFormData).catch(err=>err);
        expect(result).toEqual({ success: false, message: 'Invalid project name' });
    });

    it('should return a rejected promise with a message if the GeoJSON is invalid', async () => {
        mockIsValidGeoJson.mockReturnValue(false);
        const result = await createProject(mockFormData).catch(err=>err);
        expect(result).toEqual({ success: false, message: 'Invalid GeoJSON' });
    });

    it('should return a resolved promise with the new project data', async () => {
        mockIsValidGeoJson.mockReturnValue(true);
        const result = await createProject(mockFormData);
        expect(result).toEqual({
            success: true,
            data: {
                projectId: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                startDate: expect.any(String),
                endDate: expect.any(String),
                areaOfInterest: {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [125.6, 10.1]
                    },
                    properties: {
                        name: 'Dinagat Islands'
                    }
                }
            }
        });
    });

    it('should return a rejected promise with an error if the server returns an error', async () => {
        mockFormData.set('name', 'error');
        const result = await createProject(mockFormData).catch(err=>err);
        expect(result).toEqual(new Error('Server error'));
    });

});
