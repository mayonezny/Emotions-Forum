import React, { useState } from 'react';
import './Button.css';

interface ButtonProps {
  text: string;
  id: string;
  active: boolean;
  otherIsActive: boolean;
  onClick: () => void;
}
const Button: React.FC<ButtonProps> = ({ text, id, active, otherIsActive, onClick }) => {
  let [isOn, setIsOn] = useState(false);
  const handleClick = () => {
        onClick();
        setIsOn(!isOn);
  };
  if(otherIsActive) isOn = false;
  else if(!active) isOn = false;
  const lightbulbClassName = isOn ? 'lightbulb on' : 'lightbulb';

  return (
    <button className='button pangolin' onClick={handleClick} id={id}>
      <span className={lightbulbClassName} />
      <span className="text">{text}</span>
    </button>
  );
};

export default Button;