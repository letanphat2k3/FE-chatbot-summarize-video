import React, { useState } from 'react';
import { container, inputStyle, buttonStyle } from './ChatInputStyle';
import { Send, LoaderCircle } from 'lucide-react';

const ChatInput = ({ onSend, loading }) => {
  const [question, setQuestion] = useState('');

  const handleSend = () => {
    if (question.trim() !== '' && !loading) {
      onSend(question);
      setQuestion('');
    }
  };

  return (
    <div className={container}>
      <input
        type="text"
        placeholder={loading ? "Đang xử lý..." : "Nhập câu hỏi của bạn..."}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        className={`${inputStyle} ${loading && 'opacity-50 cursor-not-allowed'}`}
        disabled={loading}
      />
      <button onClick={handleSend} className={`${buttonStyle} ${loading && 'opacity-50 cursor-not-allowed'}`} disabled={loading}>
        {loading ? (
          <><LoaderCircle className="animate-spin inline-block mr-1 align-middle" size={18}/><span className="align-middle">Gửi</span></>
        ) : (
          <><Send className="inline-block mr-1 align-middle" size={18}/><span className="align-middle">Gửi</span></>
        )}
      </button>
    </div>
  );
};

export default ChatInput;
