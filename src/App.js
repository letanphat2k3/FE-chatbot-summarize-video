import React, { useState } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import ChatHistory from './components/ChatHistory/ChatHistory';
import ChatInput from './components/ChatInput/ChatInput';
import './input.css';

const App = () => {
  const [youtubeLink, setYoutubeLink] = useState('');
  const [sessions, setSessions] = useState([{ id: 1, name: 'Dự án 1', history: [] }]);
  const [currentSessionId, setCurrentSessionId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const currentSession = sessions.find((s) => s.id === currentSessionId);

  //  Gửi câu hỏi và hiển thị loading
  const handleSend = async (question) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      const updatedSessions = sessions.map((session) => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            history: [...session.history, { question, answer: data.answer }],
          };
        }
        return session;
      });
      setSessions(updatedSessions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //  Gửi link YouTube
  const handleSubmitYoutubeLink = async () => {
    if (!youtubeLink.trim()) return;
    try {
      const res = await fetch("http://localhost:8000/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ youtube_link: youtubeLink }),
      });
      const data = await res.json();
      alert(data.message); // hoặc hiển thị trong chat history
    } catch (error) {
      console.error(error);
    }
  };
  

  //  Tạo dự án mới
  const handleNewSession = () => {
    const newId = sessions.length === 0 ? 1 : Math.max(...sessions.map(s => s.id)) + 1;
    const newSession = { id: newId, name: `Dự án ${newId}`, history: [] };
    setSessions([...sessions, newSession]);
    setCurrentSessionId(newId);
  };

  //  Xóa dự án
  const handleDeleteSession = (id) => {
    const filtered = sessions.filter((s) => s.id !== id);
    setSessions(filtered);
    if (id === currentSessionId && filtered.length > 0) {
      setCurrentSessionId(filtered[0].id);
    }
  };

  //  Đổi tên dự án
  const handleRenameSession = (id, newName) => {
    const updatedSessions = sessions.map((session) =>
      session.id === id ? { ...session, name: newName } : session
    );
    setSessions(updatedSessions);
  };

  return (
    <div className="flex h-screen font-sans bg-slate-100">
      <Sidebar
          sessions={sessions}
          currentSessionId={currentSessionId}
          onNewSession={handleNewSession}
          onDeleteSession={handleDeleteSession}
          onSelectSession={setCurrentSessionId}
          onRenameSession={handleRenameSession}
          isCollapsed={isSidebarCollapsed}
          toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className="flex flex-col flex-1">
        <Header
          youtubeLink={youtubeLink}
          setYoutubeLink={setYoutubeLink}
          onSubmitYoutubeLink={handleSubmitYoutubeLink}
        />
        <ChatHistory history={currentSession?.history || []} loading={loading} />
        <ChatInput onSend={handleSend} loading={loading} />
      </div>
    </div>
  );
};

export default App;
