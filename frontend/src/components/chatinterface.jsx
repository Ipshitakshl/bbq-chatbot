import React, { useState, useEffect, useRef } from 'react';

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { text: "Welcome to Barbeque Nation! How can I help you today? (Type 'book' to make a reservation, 'faq' for questions, or 'update/cancel' to modify a booking)", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new window.WebSocket('ws://localhost:8000/chat');
    ws.current.onmessage = (e) => {
      setMessages(prev => [...prev, { text: e.data, isBot: true }]);
    };
    ws.current.onerror = (e) => {
      setMessages(prev => [...prev, { text: "Connection error. Please ensure the backend is running.", isBot: true }]);
    };
    return () => ws.current && ws.current.close();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && ws.current) {
      setMessages(prev => [...prev, { text: input, isBot: false }]);
      ws.current.send(input);
      setInput('');
    }
  };

  return (
    <div style={{
      maxWidth: '600px', margin: '20px auto', padding: '20px',
      border: '1px solid #ccc', borderRadius: '8px'
    }}>
      <div style={{
        height: '400px', overflowY: 'auto', marginBottom: '10px',
        padding: '10px', background: '#f5f5f5'
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            margin: '8px 0',
            padding: '8px',
            background: msg.isBot ? '#e3f2fd' : '#fff',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            background: '#2196f3', color: 'white',
            border: 'none', borderRadius: '4px', cursor: 'pointer'
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
