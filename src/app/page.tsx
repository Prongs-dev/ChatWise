// src/app/page.tsx
'use client';

import React, { useState } from 'react';

// Component for typing animation
const TypingAnimation = () => (
  <div className="flex items-center">
    <div className="flex space-x-1">
      <span className="dot animate-bounce h-2 w-2 bg-blue-500 rounded-full" />
      <span className="dot animate-bounce h-2 w-2 bg-blue-500 rounded-full" />
      <span className="dot animate-bounce h-2 w-2 bg-blue-500 rounded-full" />
    </div>
  </div>
);

export default function Home() {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setChatLog((prev) => [...prev, `User: ${input}`]);
    setInput('');
    setLoading(true);
    setIsTyping(true); // Set typing state to true

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      setChatLog((prev) => [...prev, `User: ${input}`, `AI: ${data.response}`]);
    } catch (error) {
      setChatLog((prev) => [...prev, `Error: Failed to fetch response from AI.`]);
    } finally {
      setLoading(false);
      setIsTyping(false); // Reset typing state
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-auto mb-4 bg-white rounded-lgp-4">
        <div className="chat-log">
          {chatLog.map((msg, index) => (
            <div key={index} className="mb-2">
              {msg}
            </div>
          ))}
          {isTyping && <TypingAnimation />} {/* Show typing animation */}
        </div>
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 p-2 rounded-l-lg focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition duration-200"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
