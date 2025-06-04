import { useState } from 'react';
import './App.css'

function App() {
  const [messages, setMessages] = useState([{ role: 'user', content: '' }]);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);

    const res = await fetch('https://longview-copilot-shark-backend.onrender.com/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    const reply = data.choices[0]?.message?.content;
    setMessages([...newMessages, { role: 'assistant', content: reply }]);
    setResponse(reply);
    setInput('');
  };

  return (
    <div className='App App-header'>
      <h2>Longview CoPilot</h2>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={handleSend}>Send</button>
      <div style={{ marginTop: '1rem' }}>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;