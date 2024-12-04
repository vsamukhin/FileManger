import React from "react";
import './Button.css';


interface IProps extends React.PropsWithChildren {
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
  text: string;
  size: 'small' | 'medium' | 'large'; 
}

const Button: React.FC<IProps> = ({ onClick, type, text, size, children}) => {
  return (
    <>
      <button className={`button ${size}`} type={type} onClick={onClick}>
        {children? children : text}
      </button>
    </>
  )
}

export default Button;