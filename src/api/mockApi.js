import isValidGeoJson from "./validators/isValidGeoJSON";

const FAKE_DELAY = 3e3;

// Simulate somnething like POST /api/projects
const createProject = async (formData) => {
    await new Promise(resolve => setTimeout(resolve, FAKE_DELAY));

    // Simulate some miscellaneous error
    if (formData.get("name") === "invalid") {
      return Promise.reject({ success: false, message: "Invalid project name" });
    }
    // Simulate some server error
    if (formData.get("name") === "error") {
      throw new Error("Server error");
    }


    const areaOfInterest = formData.get("areaOfInterest");

    if (areaOfInterest) {
      const parsedText = await readTextFile(areaOfInterest);

      if (!isValidGeoJson(parsedText)) {
        return Promise.reject({ success: false, message: "Invalid GeoJSON" });
      };

      const newProjectData = {
        projectId: ~~(Math.random() * 1000),
        name: formData.get("name"),
        description: formData.get("description"),
        startDate: formData.get("startDate"),
        endDate: formData.get("endDate"),
      };

      newProjectData.areaOfInterest = JSON.parse(parsedText);
      console.log("newProjectData", 123);

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
