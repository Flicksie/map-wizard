const createProject = async (projectData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // vld fail
    if (projectData.name === 'invalid') {
      throw new Error('Validation failed: Project name must not be "invalid"');
    }

    // crt
    return { success: true, projectId: Math.floor(Math.random() * 1000) };
  };

  export { createProject };
