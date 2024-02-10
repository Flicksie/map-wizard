import classnames from "classnames";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    icon?: string;
    isLoading?: boolean;
    appearance?: "primary" | "secondary" | "danger" | "warning" | "info" | "success";
}

export const buttonColorSchemes = {
    primary: "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50",
    secondary: "bg-gradient-to-r from-slate-500 via-slate-600 to-slate-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 shadow-lg shadow-slate-500/50",
    danger: "bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50",
    warning: "bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 shadow-lg shadow-yellow-500/50",
    info: "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50",
    success: "bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50",
    disabled: "bg-slate-400 cursor-not-allowed",
}

export  const buttonBaseStyle =classnames(
    "focus:ring-4 focus:outline-none focus:ring-blue-300",
    "text-white font-medium rounded-lg text-sm text-center",
    "px-4 py-2 m-2 mb-4",
)

const Button = ({ icon, label, appearance = "primary", isLoading, disabled, ...props }: ButtonProps): JSX.Element => {
    const style = classnames(
        {"cursor-pointer": !disabled},
        disabled ? buttonColorSchemes.disabled : buttonColorSchemes[appearance],
        buttonBaseStyle
    )

    return (
        <button {...props} className={style} >
            <div style={{
                transition: "all 0.3s ease-in-out",
                minWidth: isLoading ? 30 : (label.length * 8 + (icon ? 20 : 0)),
                width: 0,
                whiteSpace: "nowrap",
                overflow: "hidden",
            }}>
                {icon && !isLoading && <i className={`fa fa-${icon} mr-2`} />}
                {isLoading ? <i className="fa fa-spinner fa-spin" /> : label}
            </div>
        </button>
    );
};

export default Button;
