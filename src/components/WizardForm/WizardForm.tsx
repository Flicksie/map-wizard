import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createProject } from "api/mockApi";
import * as Yup from "yup";
import Swal from "components/Base/Swal";

import Button from "components/Base/Button";
import FileInput from "components/Base/FileInput";
import FieldLabel from "components/Base/FieldLabel";
import classnames from "classnames";

interface WizardFormProps {
    onSuccess?: (project) => void;
    onFail?: (error) => void;
}

interface ProjectFormValues {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    areaOfInterest: null;
    file: File | null;
}

const WizardForm = ({ onSuccess, onFail }:WizardFormProps): JSX.Element => {
    const initialValues: ProjectFormValues = {
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        areaOfInterest: null,
        file: null,
    };

    const handleSubmit = (values: ProjectFormValues, { setSubmitting }) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("startDate", values.startDate);
        formData.append("endDate", values.endDate);
        formData.append("areaOfInterest", values.file as File);

        // here's where an axios.post() or fetch() would go
        // or a mutation call in a GraphQL client
        // possibly needing some extra awaits for reading the JSON response and handling errors
        createProject(formData).then((response) => {
            Swal.fire({
                icon: "success",
                title: "Project created",
                text: `Project "${response.data.name}" has been created successfully`,
            });
            onSuccess(response.data);
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Error creating project",
                text: error.message || "An error occurred while creating the project",
            });
            onFail(error);
        }).finally(() => {
            setSubmitting(false);
        });
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required").max(32, "Name is too long (max 32 characters)"),
        startDate: Yup.date().required("Start Date is required"),
        endDate: Yup.date().required("End Date is required"),
        file: Yup.mixed().required("Area of Interest is required"),
    });

    const fieldErrorClasses = "text-red-500 text-xs italic";
    const fieldStyle = (error:boolean) => classnames(
        "border-2 border-slate-300 rounded-md p-2 w-full",
        {"border-red-500": error}
        );

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting, errors, touched, setFieldValue }) => (

                <Form style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    width: "100%",
                    maxWidth: "400px",
                    margin: "auto",

                }}>
                    <div>
                        <FieldLabel label="Project Name" required />
                        <Field type="text" id="name" name="name" className={fieldStyle(errors.name && touched.name)} placeholder="My flamboyantly new project" />
                        <ErrorMessage className={fieldErrorClasses} name="name" component="div" />
                    </div>

                    <div>
                        <FieldLabel label="Description" />
                        <Field as="textarea" id="description" name="description" className={fieldStyle(errors.description && touched.description)} placeholder="Description (optional)..." />
                    </div>

                    <div className="flex justify-between">
                        <div className="w-1/2 mr-4">
                            <FieldLabel label="Start Date" required />
                            <div className=" w-full">
                                <Field type="date" id="startDate" name="startDate" className={fieldStyle(errors.startDate && touched.startDate)} />
                                <ErrorMessage className={fieldErrorClasses} name="startDate" component="div" />
                            </div>
                        </div>
                        <div className="w-1/2">
                            <FieldLabel label="End Date" required />
                            <div>
                                <Field type="date" id="endDate" name="endDate" className={fieldStyle(errors.endDate && touched.endDate)} />
                                <ErrorMessage className={fieldErrorClasses} name="endDate" component="div" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <FieldLabel label="Area of Interest" required />
                        <FileInput name="areaOfInterest" label="Upload file..." accept="application/json" onChange={(e) => {
                            setFieldValue("file", e.currentTarget.files[0]);
                        }} />
                        <ErrorMessage className={fieldErrorClasses} name="file" component="div" />
                    </div>

                    <hr />

                    <div className="flex items-end justify-end w-full">
                        <Button
                            label={"Create Project"}
                            icon={"send"}
                            isLoading={isSubmitting}
                            type="submit"
                            disabled={isSubmitting}
                        />
                    </div>

                </Form>
            )}
        </Formik>
    );
};

export default WizardForm;
