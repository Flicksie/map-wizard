import React, { useState } from 'react';
import { Map } from 'components/Map';
import { WizardForm } from 'components/WizardForm';

const ProjectWizard = (): JSX.Element => {
  const [geoJson, setGeoJson] = useState<string>('');

  const handleSuccess = (data) => {
    setGeoJson(data.areaOfInterest);
  }
  const handleError = (error) => {
    console.log('Error:', error);
  }

  return (
    <div>
      <h2>Create a New Project</h2>
      <WizardForm onSuccess={handleSuccess} onFail={handleError} />
      <div style={{ height: '400px' }}>
        <Map geoJson={geoJson} />
      </div>

    </div>
  );
};

export default ProjectWizard;
