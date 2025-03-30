import React, { useState, useEffect, useCallback } from 'react';
import {
  wrapper, title, newBtn,
  item, selectedItem, itemTitle, iconBtn, sidebarTransition
} from './SidebarStyle';
import { PlusCircle, Edit, Trash2, Menu, Search, Settings } from 'lucide-react';
import SettingsModal from '../SettingsModal/SettingsModal';

const Sidebar = ({ 
  sessions, currentSessionId, onNewSession,
  onDeleteSession, onSelectSession, onRenameSession,
  isCollapsed, toggleCollapse }) => {
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleRenameStart = (e, id, currentName) => {
    e.stopPropagation();
    setEditingId(id);
    setEditingName(currentName);
  };

  const handleRenameFinish = (id) => {
    if (editingName.trim() !== '') {
      onRenameSession(id, editingName);
    }
    setEditingId(null);
  };

  const handleCreateNewSession = useCallback(() => {
    const newSessionNumber = sessions.length > 0
      ? Math.max(...sessions.map(s => parseInt(s.name.match(/\d+$/)?.[0] || 0))) + 1
      : 1;

    const newSessionName = `Dự án ${newSessionNumber}`;
    onNewSession(newSessionName);
  }, [sessions, onNewSession]);

  useEffect(() => {
    if (sessions.length === 0) {
      handleCreateNewSession();
    }
  }, [sessions.length, handleCreateNewSession]);

  return (
    <>
      <aside className={`${wrapper} ${sidebarTransition} ${isCollapsed ? 'w-20' : 'w-72'}`} style={{ position: 'relative' }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center" style={{ width: '100%' }}>
            <button className="p-2" onClick={toggleCollapse}>
              <Menu size={24} />
            </button>
            <h2 className={`${title} transition-all duration-300 origin-left ${isCollapsed ? 'opacity-0 scale-0 w-0' : 'opacity-100 scale-100 w-auto'}`}>
              Dự án
            </h2>
          </div>
          {!isCollapsed && (
            <div className="flex items-center">
              {!isCollapsed && (
                <button className="p-2">
                  <Search size={24} />
                </button>
              )}
              <button className="p-2" onClick={() => setIsSettingsOpen(true)}>
                <Settings size={24} />
              </button>
            </div>
          )}
        </div>
       
        {!isCollapsed && (
          <>
            <div className="flex justify-between items-center mb-6">
              <button onClick={handleCreateNewSession} className={`${newBtn} flex items-center gap-2`}>
                <PlusCircle className="align-middle" size={18}/> <span className="align-middle">Tạo mới</span>
              </button>
            </div>
            <ul className="space-y-3">
              {sessions.map((session) => (
                <li
                  key={session.id}
                  className={`${item} overflow-hidden ${session.id === currentSessionId ? selectedItem : 'hover:bg-slate-100'}`}
                  onClick={() => onSelectSession(session.id)}
                >
                  <div className="flex items-center justify-between gap-2">
                    {editingId === session.id ? (
                      <input
                        type="text"
                        autoFocus
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleRenameFinish(session.id)}
                        onBlur={() => handleRenameFinish(session.id)}
                        className="flex-1 bg-transparent border-b-2 border-indigo-500 outline-none px-1 transition"
                      />
                    ) : (
                      <span className={`${itemTitle} flex-1 truncate`}>{session.name}</span>
                    )}
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <button
                        onClick={(e) => handleRenameStart(e, session.id, session.name)}
                        className={iconBtn}
                        title="Chỉnh sửa tên"
                      >
                        <Edit size={16}/>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onDeleteSession(session.id); }}
                        className="text-red-500 hover:text-red-700 text-sm"
                        title="Xóa dự án"
                      >
                        <Trash2 size={16}/>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

export default Sidebar;