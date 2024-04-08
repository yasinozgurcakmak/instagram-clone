import React, { useState } from "react";

interface IInputProps {
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "email" | "number";
  value?: string | number;
}

const Input: React.FC<IInputProps> = ({
  name,
  type,
  placeholder,
  value,
  onChange,
}) => {
  const [inputType, setInputType] = useState(type);

  const handleToggleType = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
		<div className=" flex bg-gray-50 border rounded-sm ">
			<input type={inputType} name={name} placeholder={placeholder} value={value} onChange={onChange}className="px-2 outline-none text-xs w-full h-[38px] bg-gray-50" />
			{type === "password" &&  (
				<button type="button" onClick={handleToggleType} className="flex items-center text-sm font-medium pr-2 bg-transparent">
					{inputType == "password" ? 'Show' : 'Hide'}
				</button>
			)}
		</div>
 
  );
};


export default Input;
