import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

interface ProjectFormValues {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  areaOfInterest: File | null;
}

const ProjectWizard = (): JSX.Element => {
  const initialValues: ProjectFormValues = {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    areaOfInterest: null,
  };

  const handleSubmit = async (values: ProjectFormValues) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('startDate', values.startDate);
    formData.append('endDate', values.endDate);
    if (values.areaOfInterest) {
      formData.append('areaOfInterest', values.areaOfInterest);
    }

    try {
      const response = await axios.post('http://example.com/createProject', formData);

      console.log('Project created:', response.data);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Project</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProjectWizard;
