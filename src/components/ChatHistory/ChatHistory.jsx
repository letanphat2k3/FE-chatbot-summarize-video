import React from 'react';
import {
  wrapper, userLabel, userText,
  botLabel, botText
} from './ChatHistoryStyle';
import { UserRound, Bot } from 'lucide-react';

const ChatHistory = ({ history, loading }) => {
  return (
    <div className={wrapper}>
      {history.map((item, index) => (
        <div key={index} className="mb-6 bg-white rounded-2xl p-6 shadow-md border border-slate-100">
          <p className={userLabel}><UserRound className="inline-block mr-2" size={18}/>Bạn:</p>
          <p className={userText}>{item.question}</p>
          <p className={botLabel}><Bot className="inline-block mr-2" size={18}/>Bot:</p>
          <p className={botText}>{item.answer}</p>
        </div>
      ))}

      {loading && (
        <div className="animate-pulse flex space-x-4 bg-white p-6 rounded-2xl shadow-md">
          <div className="rounded-full bg-indigo-400 h-10 w-10"></div>
          <div className="flex-1 space-y-3 py-1">
            <div className="h-4 bg-indigo-400 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-indigo-400 rounded"></div>
              <div className="h-4 bg-indigo-400 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;