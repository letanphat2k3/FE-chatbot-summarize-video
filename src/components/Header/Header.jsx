import React from 'react';
import { headerWrapper, title, inputStyle, buttonStyle } from './HeaderStyle';
import { Upload } from 'lucide-react';

const Header = ({ youtubeLink, setYoutubeLink, onSubmitYoutubeLink }) => {
  return (
    <header className={headerWrapper}>
      <h1 className={title}>
        {/* <Video className="inline-block mr-2" size={24}/> */}
        Chatbot Summarize Video 
    </h1>
      <div className="flex items-center gap-3 w-1/2">
        <input
          type="text"
          placeholder="Dán link YouTube tại đây..."
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          className={inputStyle}
        />
        <button onClick={onSubmitYoutubeLink} className={buttonStyle}>
          <Upload className="inline-block mr-1" size={18}/>
          <span className="align-middle">Gửi</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
