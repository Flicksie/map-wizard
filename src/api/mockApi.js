import isValidGeoJson from './validators/isValidGeoJSON';

const createProject = async (formData) => {
    await new Promise(resolve => setTimeout(resolve, 5e3));

    if (formData.get("name") === 'invalid') {
      return Promise.reject({ success: false, message: 'Invalid project name' });
    }

    const newProjectData = {
      projectId: ~~(Math.random() * 1000),
      name: formData.get("name"),
      description: formData.get("description"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
    };

    const areaOfInterest = formData.get("areaOfInterest");

    if (areaOfInterest) {
      const parsedText = await readTextFile(areaOfInterest);

      if (!isValidGeoJson(parsedText)) {
        return Promise.reject({ success: false, message: 'Invalid GeoJSON' });
      }

      newProjectData.areaOfInterest = JSON.parse(parsedText);
      console.log('newProjectData', 123);

      return Promise.resolve({ success: true, data: newProjectData});
    }


  };


  function readTextFile (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  export { createProject };
