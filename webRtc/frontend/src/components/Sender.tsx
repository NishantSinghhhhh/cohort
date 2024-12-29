// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'


// const Sender = () => {

//     useEffect(() =>{
//         const socket = new WebSocket('ws://localhost:8080');
//         socket.onopen = () => {
//             console.log('Connected to WebSocket server');
//             socket.send(JSON.stringify({ type: "sender" }));
//         };
//     })
//   return (
//     <div>
//       <button>Send Button</button>
//     </div>
//   )
// }

// export default Sender

import React, { useState } from 'react';

const Sender = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [offer, setOffer] = useState('');
  const [iceCandidate, setIceCandidate] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const connectWebSocket = () => {
    const ws = new WebSocket('ws://localhost:8080/sender'); // Update with your WebSocket server address
    setSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket connected as sender');
      ws.send(JSON.stringify({ type: 'identify-as-sender' }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, JSON.stringify(data)]);
      console.log('Message from server:', data);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setSocket(null);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  };

  const sendOffer = () => {
    if (socket && offer) {
      socket.send(JSON.stringify({ type: 'create-offer', payload: { sdp: offer } }));
      console.log('Offer sent:', offer);
    }
  };

  const sendIceCandidate = () => {
    if (socket && iceCandidate) {
      socket.send(JSON.stringify({ type: 'ice-candidate', payload: { candidate: iceCandidate } }));
      console.log('ICE Candidate sent:', iceCandidate);
    }
  };

  async function startSendingVideo() {
    // Create a new RTCPeerConnection instance
    const pc = new RTCPeerConnection();

    try {
        // Create an offer
        const offer = await pc.createOffer();

        // Set the local description to the created offer
        await pc.setLocalDescription(offer);

        // Send the offer to the server via WebSocket
        socket?.send(
            JSON.stringify({
                type: "createOffer",
                sdp: pc.localDescription, // Use `pc.localDescription` instead of `pc.loadDescription`
            })
        );

        console.log("Offer sent successfully:", pc.localDescription);
    } catch (error) {
        console.error("Error during offer creation or sending:", error);
    }
}

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc' }}>
      <h2>WebRTC Sender</h2>
      {!socket ? (
        <button onClick={connectWebSocket}>Connect to WebSocket</button>
      ) : (
        <p>Connected to WebSocket</p>
      )}

      <div style={{ marginTop: '20px' }}>
        <label>
          <strong>Offer SDP:</strong>
          <textarea
            rows={5}
            cols={40}
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            placeholder="Enter SDP Offer here"
          />
        </label>
        <br />
        <button onClick={sendOffer} style={{ marginTop: '10px' }}>
          Send Offer
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <label>
          <strong>ICE Candidate:</strong>
          <textarea
            rows={3}
            cols={40}
            value={iceCandidate}
            onChange={(e) => setIceCandidate(e.target.value)}
            placeholder="Enter ICE Candidate here"
          />
        </label>
        <br />
        <button onClick={sendIceCandidate} style={{ marginTop: '10px' }}>
          Send ICE Candidate
        </button>
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

export default Sender;
