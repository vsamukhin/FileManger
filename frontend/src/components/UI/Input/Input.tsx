import React from "react";
import './Input.css';

interface IProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
}

const Input:React.FC<IProps> = ({label, type, onChange, name, value, required}) => {
  return (
    <>
      <div className="input-wrap">
        <label className="input-label">{ label }</label>
        <input
          className="input-field"
          type={type}
          onChange={onChange}
          name={name}
          value={value}
          required={required}
        />
      </div>
    </>
  )
};

export default Input;