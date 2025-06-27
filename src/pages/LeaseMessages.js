import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function LeaseMessages() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const senderId = localStorage.getItem('userId');
  const receiverId = prompt('Enter receiver user ID');

  const loadMessages = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/messages/${senderId}`);
    setMessages(res.data);
  };

  const sendMessage = async () => {
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/messages`, {
      sender: senderId,
      receiver: receiverId,
      content: newMsg,
    });
    setNewMsg('');
    loadMessages();
  };

  useEffect(() => { loadMessages(); }, []);

  return (
    <div>
      <h3>Lease Agreement Messages</h3>
      <div>
        {messages.map((m) => (
          <div key={m._id}><b>{m.sender.name}:</b> {m.content}</div>
        ))}
      </div>
      <input
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        placeholder="Type message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
