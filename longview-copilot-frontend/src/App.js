import { useState } from 'react';
import './App.css'

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);

    const res = await fetch('https://longview-copilot-shark-backend.onrender.com/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    const reply = data.choices[0]?.message?.content || "Sorry, I didn't understand that.";
    setMessages([...newMessages, { role: 'assistant', content: reply }]);
    setInput('');
  };

  return (
    <div className='App'>
      <div className='App-body'>
        <h2>Longview CoPilot</h2>
        <div className="chat-history">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-message ${msg.role === 'user' ? 'user' : 'assistant'}`}
            >
              <strong>{msg.role === 'user' ? 'You' : 'CoPilot'}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <div className="input-row">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={4}
            cols={50}
            placeholder="Type your message..."
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;