import React, { useState } from "react";
import { Map } from "components/Map";
import { WizardForm } from "components/WizardForm";
import GeoJSON from "geojson";

const ProjectWizard = (): JSX.Element => {
  const [geoJson, setGeoJson] = useState<GeoJSON.Feature>();

  const handleSuccess = (data) => {
    setGeoJson(data.areaOfInterest);
  }
  const handleError = (error) => {
    console.log("Error:", error);
  }

  return (
    <div className="container mx-auto h-full justify-center">
      <div className="p-4 m-4 mb-9">
      <h1 className="text-3xl font-bold text-slate-100">Project Wizard</h1>
      </div>
      <div className="flex flex-wrap items-center justify-center">
        <div className="bg-slate-100 rounded-lg p-4 m-4">
          <h2 className="font-bold mb-4">Create a New Project</h2>
          <WizardForm onSuccess={handleSuccess} onFail={handleError} />
        </div>
        <div className="bg-slate-100 rounded-lg overflow-hidden rounded-lg m-4">
          <div style={{ height: "500px", width: "500px" }}>
            <Map geoJson={geoJson} />
          </div>

        </div>
      </div>

    </div>
  );
};

export default ProjectWizard;
