import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { toggleContainer, iconStyle } from './ThemeToggleStyle';

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'Tối' ? 'Sáng' : 'Tối');
  };

  return (
    <div onClick={toggleTheme} style={toggleContainer}>
      {theme === 'Tối' ? <Moon style={iconStyle} /> : <Sun style={iconStyle} />}
    </div>
  );
};

export default ThemeToggle;
