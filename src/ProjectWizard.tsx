// src/ProjectWizard.tsx

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import Map from './Map';

interface ProjectFormValues {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  areaOfInterest: File | null;
}

const ProjectWizard: React.FC = () => {
  const [geoJson, setGeoJson] = useState<string>('');

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
      if (values.areaOfInterest) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target && event.target.result) {
            setGeoJson(event.target.result as string);
          }
        };
        reader.readAsText(values.areaOfInterest);
      }
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
            <div>
              <label htmlFor="name">Name:</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <Field as="textarea" id="description" name="description" />
            </div>
            <div>
              <label htmlFor="startDate">Start Date:</label>
              <Field type="date" id="startDate" name="startDate" />
              <ErrorMessage name="startDate" component="div" />
            </div>
            <div>
              <label htmlFor="endDate">End Date:</label>
              <Field type="date" id="endDate" name="endDate" />
              <ErrorMessage name="endDate" component="div" />
            </div>
            <div>
              <label htmlFor="areaOfInterest">Area of Interest:</label>
              <Field type="file" id="areaOfInterest" name="areaOfInterest" accept=".json" />
            </div>
            <Map geoJson={geoJson} />
            <button type="submit" disabled={isSubmitting}>
              Create Project
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProjectWizard;
