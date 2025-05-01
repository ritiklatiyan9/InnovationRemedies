import React from 'react';
import { Bot } from 'lucide-react';
import ai from '../../../assets/Images/ai.png';

const ChatIcon = ({ onClick, isOpen }) => {
  return (


    <>
  
<button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-50  rounded-full shadow-lg transition-all duration-300 transform ${
        isOpen ? 'bg-indigo-600 text-white scale-95' : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:scale-105'
      }`}
      aria-label="Open chat"
    >
      <img src={ai} alt="Chat Icon" className='h-14 rounded-full' />
    </button>
    </>
   
  );
};

export default ChatIcon;