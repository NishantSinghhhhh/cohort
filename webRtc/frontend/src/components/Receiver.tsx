import React, { useState } from 'react';

const Receiver = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [offer, setOffer] = useState('');
  const [iceCandidates, setIceCandidates] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);

  const connectWebSocket = () => {
    const ws = new WebSocket('ws://localhost:8080/receiver'); // Update with your WebSocket server address
    setSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket connected as receiver');
      ws.send(JSON.stringify({ type: 'identify-as-receiver' }));
    };

    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      console.log('Message from server:', data);

      // Handle offer and ICE candidates
      if (data.type === 'offer') {
        setOffer(data.payload.sdp);
        console.log('Received offer:', data.payload.sdp);
      } else if (data.type === 'ice-candidate') {
        setIceCandidates((prev) => [...prev, data.payload.candidate]);
        console.log('Received ICE Candidate:', data.payload.candidate);
      }

      setMessages((prev) => [...prev, JSON.stringify(data)]);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setSocket(null);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  };

  const acceptOffer = () => {
    console.log('Accepting offer...');
    // Placeholder for accepting the offer logic
    console.log('Offer accepted:', offer);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc' }}>
      <h2>WebRTC Receiver</h2>
      {!socket ? (
        <button onClick={connectWebSocket}>Connect to WebSocket</button>
      ) : (
        <p>Connected to WebSocket</p>
      )}

      <div style={{ marginTop: '20px' }}>
        <h4>Offer:</h4>
        <textarea
          rows={5}
          cols={40}
          value={offer}
          readOnly
          placeholder="Offer SDP will appear here"
        />
        <br />
        {offer && (
          <button onClick={acceptOffer} style={{ marginTop: '10px' }}>
            Accept Offer
          </button>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h4>Received ICE Candidates:</h4>
        <ul>
          {iceCandidates.map((candidate, index) => (
            <li key={index}>{candidate}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h4>Messages from Server:</h4>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Receiver;
