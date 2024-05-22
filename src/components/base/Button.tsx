import classNames from "classnames";
import { CgSpinner } from "react-icons/cg";

interface ButtonType {
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: 'primary' | 'secondary' | "transparent";
    size?: "max" | 'lg';
    disable?: boolean;
    submitting?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    refs?: React.RefObject<HTMLButtonElement>;
}
const Button = ({ children, className, onClick, disable, submitting, variant = "primary", size = "lg", type = "submit", refs }: ButtonType) => {
    const style = classNames(" flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed h-[30px] mt-1 rounded font-medium text-white text-sm",
        {
            "w-full": size === "lg",
            "max": size === "max",
        },
        {
            "bg-brand hover:to-brandDark": variant === "primary",
            "bg-gray-300": variant === "secondary",
            "bg-transparent text-gray-500 hover:text-gray-700": variant === "transparent",
        }, className
    )
    return (
        <button type={type} onClick={onClick} disabled={disable} className={style} ref={refs}>
            {submitting ? <CgSpinner className="w-5 h-5 text-white animate-spin" /> : children}
        </button>
    );
};

export default Button;