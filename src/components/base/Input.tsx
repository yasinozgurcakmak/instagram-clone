import classNames from "classnames";
import React, { useState } from "react";

interface IInputProps {
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "email" | "number";
  value?: string | number;
  variant?: "primary" | "secondary" | "transparent";
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  variant,
  onBlur,
  error
}: IInputProps) => {
  const [inputType, setInputType] = useState(type);
  const handleToggleType = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const inputStyle = classNames("rounded-sm flex",
    {"bg-gray-50 border ": variant === "primary", "bg-black text-white": variant === "transparent"},
  );
  return (
    <div className="bg-current w-full">
      <div className={inputStyle}>
        <input type={inputType} name={name} placeholder={placeholder} value={value} onBlur={onBlur} onChange={onChange} className="px-2 outline-none text-xs w-full h-[38px] bg-inherit " />
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
