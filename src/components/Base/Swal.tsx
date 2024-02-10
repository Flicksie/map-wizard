import Swal from "sweetalert2";
import { buttonBaseStyle, buttonColorSchemes } from "./Button";
import classNames from "classnames";

const customSwal = Swal.mixin({
    customClass: {
        confirmButton: classNames("py-2.5 px-5", buttonBaseStyle,buttonColorSchemes.primary),
        cancelButton: classNames("py-2.5 px-5", buttonBaseStyle, buttonColorSchemes.danger),
        popup: "rounded-2xl bg-slate-800 text-white",
        container: "bg-black opacity-100",
    },
    buttonsStyling: false,
    });

export default customSwal;
