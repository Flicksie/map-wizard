import React, { useState } from "react";
import classnames from "classnames";
import Button, { buttonBaseStyle, buttonColorSchemes } from "./Button";
import { Field, ErrorMessage } from "formik";

interface FileInputProps {
    name: string;
    label: string;
    accept?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = ({ name, label, accept, onChange }: FileInputProps): JSX.Element => {
    const [fileName, setFileName] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(event);
        const file = event.target.files?.[0];
        if (file) setFileName(file.name);
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
                    label={fileName ? fileName : "Upload file..."}
                    type="button"
                    icon={fileName ? "check" : "upload"}
                    appearance={fileName ? "success" : "secondary"}
                    onClick={() => document.getElementById(name)?.click()}
                >

                </Button>
            </div>
            <ErrorMessage name={name} component="div" className="text-red-500 text-xs" />
        </div>
    );
};

export default FileInput;
