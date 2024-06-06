import './App.css';
import './FilterMenu.css';
import Button from './Button';
import { useState } from 'react';

interface FilterMenuProps {
  onFilterApply: (filterNumber: string) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ onFilterApply }) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = (buttonId: string) => {
    if (activeButton === buttonId) {
      setActiveButton(null);
      onFilterApply(''); // Сброс фильтра
    } else {
      setActiveButton(buttonId);
      const filterNumber = buttonId === 'neutra' ? '0' : buttonId === 'positiva' ? '1' : '2';
      onFilterApply(filterNumber);
    }
  };

  return (
    <div id='filter-outerbox'>
      <Button text='Негативный &#128544;' id='nigga' active={activeButton === 'nigga'} otherIsActive={activeButton !== 'nigga' && activeButton !== null} onClick={() => handleButtonClick('nigga')} />
      <Button text='Нейтральный &#128528;' id='neutra' active={activeButton === 'neutra'} otherIsActive={activeButton !== 'neutra' && activeButton !== null} onClick={() => handleButtonClick('neutra')} />
      <Button text='Позитивный &#128578;' id='positiva' active={activeButton === 'positiva'} otherIsActive={activeButton !== 'positiva' && activeButton !== null} onClick={() => handleButtonClick('positiva')} />
    </div>
  );
}

export default FilterMenu;
