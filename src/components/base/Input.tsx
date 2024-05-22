import classNames from "classnames";
import React, { useState, ChangeEvent } from "react";

interface IInputProps {
  name: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: "text" | "password" | "email" | "number" | "textarea";
  className?: string;
  value: string | number;
  variant?: "primary" | "secondary" | "transparent";
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  refs?: React.RefObject<HTMLInputElement>;
  error?: string;
}

const Input = ({
  name,
  type,
  placeholder,
  className,
  value,
  onChange,
  variant,
  onBlur,
  refs,
  error
}: IInputProps) => {
  const [inputType, setInputType] = useState(type);
  const handleToggleType = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const inputStyle = classNames("rounded-sm flex",
    {"bg-gray-50 border ": variant === "primary", "bg-black text-white": variant === "transparent", },className
  );
  return (
    <div className="bg-transparent w-full">
      <div className={inputStyle}>
        {inputType !== "textarea" && <input type={inputType} name={name} placeholder={placeholder} value={value} onBlur={onBlur} onChange={onChange} ref={refs} className="px-2 outline-none text-xs w-full h-[38px] bg-inherit " />}
        {inputType === "textarea" && <textarea name={name} placeholder={placeholder} value={value} onChange={onChange} className="px-2 outline-none text-xs w-full h-full bg-inherit text-white" />}
        {type === "password" && (
          <button type="button" onClick={handleToggleType} className="flex items-center text-sm font-medium pr-2 bg-transparent">
            {inputType == "password" ? 'Show' : 'Hide'}
          </button>
        )}
      </div>
      {error && <p className=" text-red-500 text-xs text-start pt-2">{error}</p>}
    </div>
  );
};


export default Input;
