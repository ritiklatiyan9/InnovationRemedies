import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Loader, User } from 'lucide-react';

// --- Embedded CSS for Loader and Sparkle ---
// Usually, this would go in a separate CSS file, but embedding for single-file example.
const AiAssistantStyles = () => (
  <style>{`
    /* Shimmer animation for loading bars */
    @keyframes shimmer {
      0% { background-position: 100% 0; }
      100% { background-position: -100% 0; }
    }

    /* Base style for the loading bars */
    .loading-shimmer-bar {
      /* --- ADJUST GRADIENT COLORS if needed --- */
      background: linear-gradient(90deg, #fde8f0, #fbcfe8, #f9a8d4, #fbcfe8, #fde8f0);
      background-size: 200% 100%; /* Gradient wider than bar */
      animation: shimmer 1.8s linear infinite;
      border-radius: 9999px; /* rounded-full */
      height: 0.625rem; /* h-2.5 */
    }

    /* Animation for the sparkle icon */
    @keyframes sparkle-pulse {
      0%, 100% { transform: scale(1); opacity: 0.8; }
      50% { transform: scale(1.1); opacity: 1; }
    }

    /* Style for the sparkle icon (using emoji via ::before) */
    .sparkle-icon::before {
      content: '✨'; /* Unicode sparkle emoji */
      display: inline-block;
      animation: sparkle-pulse 1.5s ease-in-out infinite;
      /* --- ADJUST COLOR if needed --- */
      color: #f9a8d4; /* Match a gradient color */
      position: absolute;
      /* --- Fine-tune positioning --- */
      top: -0.5rem;  /* -top-2 */
      left: -0.75rem; /* -left-3 */
      font-size: 1.25rem; /* text-xl */
      z-index: 10; /* Ensure it's visible */
    }

    /* Ensure smooth scrolling */
    .smooth-scroll {
        scroll-behavior: smooth;
    }

    /* Basic scrollbar styling (optional) */
    .ai-message-area::-webkit-scrollbar {
        width: 6px;
    }
    .ai-message-area::-webkit-scrollbar-track {
        background: #f1f5f9; /* bg-slate-100 */
        border-radius: 3px;
    }
    .ai-message-area::-webkit-scrollbar-thumb {
        background: #cbd5e1; /* bg-slate-300 */
        border-radius: 3px;
    }
    .ai-message-area::-webkit-scrollbar-thumb:hover {
        background: #94a3b8; /* bg-slate-400 */
    }
  `}</style>
);
// --- End Embedded CSS ---


// --- Chat Service (Uses Fetch API) ---
const chatService = {
  sendMessage: async (query) => {
    try {
      console.log(`Sending query to backend: ${query}`); // Log outgoing query
      const response = await fetch('https://innovation-backend.vercel.app/api/v1/chat/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      // Log raw response status
      console.log(`Response status: ${response.status}`);

      if (!response.ok) {
        let errorData = { message: `Server error: ${response.status}` };
        try {
            errorData = await response.json(); // Try to parse error details from backend
            console.error('Parsed error response:', errorData);
        } catch (parseError) {
            console.error('Could not parse error response body:', parseError);
            const textResponse = await response.text(); // Get raw text if JSON fails
            console.error('Raw error response text:', textResponse);
            errorData.message = textResponse || errorData.message; // Use raw text if available
        }
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received data from backend:', data); // Log successful response data

      if (data.success && data.data?.answer) {
        // Success case - return only the answer, ignore sources here
        return { answer: data.data.answer };
      } else {
        // Handle cases where backend response format is unexpected but request was 'ok'
        console.warn('Unexpected API response format:', data);
        throw new Error(data.message || 'Invalid response format from AI service');
      }
    } catch (error) {
      // Catch fetch errors (network issues) or errors thrown above
      console.error('AI Chat Service Error:', error);
      // Ensure the error passed up has a message property
      throw new Error(error.message || 'An unknown network or server error occurred.');
    }
  },
};
// --- End Chat Service ---


// --- Helper Function: Format Time ---
const formatTime = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
     return '--:--'; // Fallback for invalid date
  }
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
// --- End Helper Function ---


// --- ChatMessage Component ---
// Renders individual messages (user, bot, error) or the typing indicator
const ChatMessage = ({ message, isTyping }) => {
  const isUser = message.sender === 'user';

  // Helper to format message text with line breaks
  const formatMessageText = (text) => {
    // Ensure text is a string before splitting
    const safeText = typeof text === 'string' ? text : '';
    return safeText.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < safeText.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    // Animate message entry
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 w-full`}
    >
      {/* Bot Icon (only for bot messages) */}
      {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2 self-start mt-1 relative">
           {/* Removed sparkle icon from here as it wasn't explicitly requested in the updated version */}
           <Bot size={16} className="text-indigo-600" />
        </div>
      )}

      {/* Message Bubble or Loader */}
      <div
        className={`max-w-[85%] relative rounded-lg shadow-sm ${
          isUser
            ? 'bg-blue-500 text-white px-4 py-2' // User style
            : message.isError
            ? 'bg-red-50 text-red-800 border border-red-200 px-4 py-2' // Error style
            : isTyping
            ? 'p-3 bg-transparent border-none shadow-none' // Loader container style (no background/border)
            : 'bg-white border border-gray-200 text-gray-800 px-4 py-2' // Default bot style
        }`}
      >
        {/* === GEMINI-STYLE LOADING INDICATOR === */}
        {isTyping ? (
          <div className="flex flex-col space-y-1.5 w-48" aria-label="AI is typing"> {/* Fixed width for bars */}
            {/* Bar 1 (Uses CSS class for gradient/animation) */}
            <div
              className="loading-shimmer-bar"
              style={{ width: '85%', animationDelay: '0s' }} // Shorter width, no delay
            ></div>
            {/* Bar 2 */}
            <div
              className="loading-shimmer-bar"
              style={{ width: '100%', animationDelay: '0.2s' }} // Full width, slight delay
            ></div>
            {/* Bar 3 */}
            <div
              className="loading-shimmer-bar"
              style={{ width: '70%', animationDelay: '0.4s' }} // Shortest width, more delay
            ></div>
          </div>
        ) : (
          /* === REGULAR MESSAGE CONTENT === */
          <>
            {formatMessageText(message.text)}
            {/* --- SOURCE DISPLAY REMOVED --- */}
            {/* Timestamp */}
            <div className={`text-xs mt-1.5 opacity-75 text-right ${
                isUser ? 'text-blue-100' : message.isError ? 'text-red-500 font-medium' : 'text-gray-500'
              }`
            }>
              {formatTime(message.timestamp)}
            </div>
          </>
        )}
      </div> {/* End Message Bubble / Loader */}

      {/* User Icon (only for user messages) */}
      {isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center ml-2 self-start mt-1">
          <User size={16} className="text-blue-600" />
        </div>
      )}
    </motion.div>
  );
};
// --- End ChatMessage Component ---


// --- Main AiAssistant Component ---
export default function AiAssistant({ isOpen, onClose }) {
  // State variables
  const [messages, setMessages] = useState([
    // Initial welcome message
    { id: 1, sender: 'bot', text: 'Hello! I can help you find information from your documents. What would you like to know?', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false); // Controls loader visibility
  const [error, setError] = useState(null); // Stores error messages for display
  const messagesEndRef = useRef(null); // Ref for scrolling to bottom

  // Effect to scroll to the latest message
  useEffect(() => {
    // Small delay helps ensure the DOM has updated before scrolling
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer); // Cleanup timer
  }, [messages, isTyping]); // Re-run when messages or typing status change

  // Function to handle sending a message
  const handleSendMessage = async (e) => {
    // Allow calling without event (e.g., for retry)
    if (e) e.preventDefault();

    const textToSend = inputValue.trim();
    if (!textToSend) return; // Don't send empty messages

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    // Add user message to state and clear input field
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true); // Show the loader
    setError(null); // Clear any previous errors

    try {
      // Call the backend API
      const result = await chatService.sendMessage(userMessage.text);

      // Create the bot's response message
      const botMessage = {
        id: Date.now() + 1, // Ensure unique ID
        sender: 'bot',
        text: result.answer,
        timestamp: new Date(),
        // Sources are no longer expected or used here
      };
      // Add bot's response to state
      setMessages(prev => [...prev, botMessage]);

    } catch (err) {
      // Handle errors from the chat service
      const errorMessageText = err.message || 'An unexpected error occurred.';
      setError(errorMessageText); // Store error message to display the retry UI

      // Create an error message to display within the chat flow
      const errorMessage = {
        id: Date.now() + 1, // Ensure unique ID
        sender: 'bot',
        text: `Sorry, I encountered an error: ${errorMessageText}`,
        timestamp: new Date(),
        isError: true // Mark for specific styling
      };
      // Add error message to state
      setMessages(prev => [...prev, errorMessage]);

    } finally {
      // Hide the loader regardless of success or error
      setIsTyping(false);
    }
  };

  // Function to handle retrying the last message
  const handleRetry = () => {
    setError(null); // Clear the error display UI

    // Find the last message sent *by the user*
    const lastUserMessage = [...messages].slice().reverse().find(m => m.sender === 'user');

    if (lastUserMessage) {
      console.log('Retrying query:', lastUserMessage.text);

      // Remove the preceding error message from the bot before retrying
      setMessages(prev => prev.filter(m => !(m.sender === 'bot' && m.isError)));

      // Set the input value to the last message and trigger send
      // Need to ensure state updates before calling handleSendMessage again
      // Use a small timeout or useEffect based approach if direct call causes issues
      setInputValue(lastUserMessage.text); // Set input value first

      // Use a microtask (or short timeout) to ensure inputValue state is updated
      // before handleSendMessage reads it.
      Promise.resolve().then(() => {
         handleSendMessage(); // Call without event object
      });

    } else {
        console.warn("Could not find the last user message to retry.");
        alert("Could not find the last message to retry."); // User feedback
    }
  };

  // Render nothing if the chat window is not open
  if (!isOpen) return null;

  return (
    <>
      {/* Inject the CSS styles defined above */}
      <AiAssistantStyles />

      {/* Main Chat Window Container with Framer Motion Animation */}
      <motion.div
        // Animation properties for slide-in/out
        initial={{ x: "100%", opacity: 0.8 }} // Start off-screen right, slightly transparent
        animate={{ x: 0, opacity: 1 }}       // Animate to position 0 (on-screen), fully opaque
        exit={{ x: "100%", opacity: 0.8 }}      // Animate off-screen right on close
        transition={{ type: 'spring', stiffness: 320, damping: 35 }} // Spring physics
        // Styling for the chat window
        className="fixed bottom-4 right-4 z-[1000] w-[calc(100%-2rem)] max-w-md h-[calc(100vh-5rem)] max-h-[650px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-200/50"
        aria-modal="true" // Indicate it's a modal dialog
        role="dialog"
        aria-labelledby="ai-assistant-header"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 flex items-center justify-between flex-shrink-0 shadow-sm">
          <div className="flex items-center space-x-2">
            <Bot size={20} />
            <h2 id="ai-assistant-header" className="font-semibold text-base">AI Assistant</h2>
          </div>
          <button
            onClick={onClose} // Close button action
            className="text-white rounded-full p-1.5 -mr-1 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
            aria-label="Close AI Assistant"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages Display Area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-1 bg-slate-50 smooth-scroll ai-message-area">
          {/* Map through messages and render ChatMessage component */}
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} isTyping={false} /> // Render actual messages
          ))}
          {/* Conditionally render the typing indicator via ChatMessage */}
          {isTyping && (
             <ChatMessage key="typing-indicator" message={{ id: 'typing', sender: 'bot', timestamp: new Date() }} isTyping={true} />
          )}
          {/* Display Error and Retry Button */}
          {error && !isTyping && (
            <motion.div // Animate error appearance
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center pt-2 pb-1"
            >
              <div className="bg-red-100 border border-red-300 text-red-800 rounded-lg px-3.5 py-2 text-sm flex items-center gap-3 shadow-sm w-full max-w-sm mx-auto">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                 </svg>
                <span className="flex-grow leading-snug">{error}</span>
                <button
                  onClick={handleRetry}
                  className="ml-auto text-red-800 underline font-medium text-sm hover:text-red-600 flex-shrink-0 focus:outline-none focus:ring-1 focus:ring-red-400 rounded px-1"
                >
                  Retry
                </button>
              </div>
            </motion.div>
          )}
          {/* Invisible div to ensure scrolling goes to the very bottom */}
          <div ref={messagesEndRef} style={{ height: '1px' }} />
        </div>

        {/* Input Form Area */}
        <form onSubmit={handleSendMessage} className="border-t border-gray-200/80 p-3 bg-white flex-shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about your documents..."
              className="flex-grow py-2 px-4 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/80 disabled:opacity-60 transition-all"
              disabled={isTyping} // Disable input while AI is typing
              aria-label="Type your message"
              required // Make input required for form submission
            />
            <button
              type="submit"
              disabled={isTyping || !inputValue.trim()} // Disable if typing or input is empty/whitespace
              className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 flex-shrink-0 w-9 h-9 flex items-center justify-center"
              aria-label="Send message"
            >
              {/* Show loading spinner or send icon */}
              {isTyping ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
          {/* Optional small print footer */}
          <div className="text-xs text-gray-400 mt-2 text-center px-2">
            Powered by Your AI. Results may require verification.
          </div>
        </form>
      </motion.div>
    </>
  );
}
// --- End AiAssistant Component ---git branch -M main
