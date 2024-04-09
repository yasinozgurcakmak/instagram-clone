import { CgSpinner } from "react-icons/cg";

interface ButtonType{
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disable?: boolean;
    submitting?: boolean;
    type?: 'button' | 'submit' | 'reset';
}
const Button = ({children, onClick, disable, submitting, type = "submit" } : ButtonType) => {
    return (
        <button type={type} onClick={onClick} disabled={disable} className="w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed h-[30px] mt-1 rounded bg-brand hover:to-brandDark font-medium text-white text-sm ">
            {submitting? <CgSpinner className="w-5 h-5 text-white animate-spin" /> : children}
        </button>
    );
};
    
export default Button;