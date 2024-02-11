import React, { useState } from "react";
import Button from "./Button";
import { Field, ErrorMessage } from "formik";

interface FileInputProps {
    name: string;
    label: string;
    accept?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = ({ name, label, accept, onChange }: FileInputProps): JSX.Element => {
    const [fileName, setFileName] = useState<string>("");
    const [isAcceptedFileType, setAcceptedFileType] = useState<boolean>(true);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(event);
        const file = event.target.files?.[0];
        if (file) setFileName(file.name);

        if (accept) {
            const acceptedFileTypes = accept.split(",");
            const isAccepted = acceptedFileTypes.some((type) => file?.type.includes(type));
            setAcceptedFileType(isAccepted);
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                <Field
                    id={name}
                    name={name}
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    className="hidden"
                />
                <Button
                    label={fileName ? fileName : label || "Upload file..."}
                    type="button"
                    icon={fileName ? (isAcceptedFileType ? "check" : "close") : "upload"}
                    appearance={fileName ? (isAcceptedFileType ? "success" : "danger") : "secondary"}
                    onClick={() => document.getElementById(name)?.click()}
                >

                </Button>
            </div>
            <ErrorMessage name={name} component="div" className="text-red-500 text-xs" />
        </div>
    );
};

export default FileInput;
