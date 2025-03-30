import React, { useState, useEffect, useRef } from 'react';
import {
  modalOverlay, modalContainer, modalHeader, modalTitle,
  closeButton, listItem, labelText, selectInput
} from './SettingsModalStyle';

const SettingsModal = ({ isOpen, onClose }) => {
  const [theme, setTheme] = useState('Hệ thống');
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
        <ul className="space-y-4">
          <li className={listItem}>
            <span className={labelText}>Chủ đề</span>
            <select className={selectInput} value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option>Hệ thống</option>
              <option>Tối</option>
              <option>Sáng</option>
            </select>
          </li>
          <li className={listItem}>
            <span className={labelText}>Ngôn ngữ</span>
            <select className={selectInput} value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option>Dò tìm tự động</option>
              <option>Tiếng Việt</option>
              <option>English</option>
            </select>
          </li>
          {/* Thêm các mục khác tương tự */}
        </ul>
      </div>
    </div>
  );
};

export default SettingsModal;