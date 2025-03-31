import React, { useState, useEffect, useRef } from 'react';
import {
  modalOverlay, modalContainer, modalHeader, modalTitle,
  closeButton, listItem, labelText, selectInput
} from './SettingsModalStyle';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const SettingsModal = ({ isOpen, onClose, theme, setTheme }) => {
  const [language, setLanguage] = useState('Dò tìm tự động');
  const modalRef = useRef();

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === 'Tối') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={modalOverlay}>
      <div className={modalContainer} ref={modalRef}>
        <div className={modalHeader}>
          <h2 className={modalTitle}>Cài đặt</h2>
          <button onClick={onClose} className={closeButton}>
            &times;
          </button>
        </div>
        <div className="flex items-center justify-between " style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
          <span className="label-with-underline">Chủ đề</span>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
        <ul className="space-y-4">
          <li className={listItem}>
            <span className={labelText}>Ngôn ngữ</span>
            <select className={selectInput} value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option>Dò tìm tự động</option>
              <option>Tiếng Việt</option>
              <option>English</option>
            </select>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default SettingsModal;