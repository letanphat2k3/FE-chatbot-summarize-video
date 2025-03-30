import React, { useState, useEffect } from 'react';
import {
  wrapper, title, newBtn,
  item, selectedItem, itemTitle, iconBtn
} from './SidebarStyle';
import { FolderKanban, PlusCircle, Edit, Trash2 } from 'lucide-react';

const Sidebar = ({ sessions, currentSessionId, onNewSession, onDeleteSession, onSelectSession, onRenameSession }) => {
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

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

  const handleCreateNewSession = () => {
    const newSessionNumber = sessions.length > 0
      ? Math.max(...sessions.map(s => parseInt(s.name.match(/\d+$/)?.[0] || 0))) + 1
      : 1;

    const newSessionName = `Dự án ${newSessionNumber}`;
    onNewSession(newSessionName);
  };

  // Tự động thêm dự án đầu tiên khi không có dự án nào
  useEffect(() => {
    if (sessions.length === 0) {
      handleCreateNewSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions.length]);

  return (
    <aside className={wrapper}>
        <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-base leading-tight">
            <FolderKanban className="mt-[2px]" size={20}/>
            <h2 className={title}>Dự án</h2>
        </div>
        <button onClick={handleCreateNewSession} className={`${newBtn} flex items-center gap-2`}>
          <PlusCircle className="align-middle" size={18}/> <span className="align-middle">Mới</span>
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
    </aside>
  );
};

export default Sidebar;