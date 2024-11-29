import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestmessage , setLatestMessages] = useState(" ");

  useEffect (() =>{
    const socket = new WebSocket('ws://localhost:8080')
    socket.onopen = () =>{
      console.log("Connected")
    }
    socket.onmessage = (message) =>{
      console.log('Recieved Message: ', message.data)
      setLatestMessages(message.data)
    }
    setSocket(socket);
  }, [])

  if(!socket){
    return <div>Loading...</div>
  }

  return (
   <>
    <div>
    <h1>WebSocket Example</h1>

    <input onChange={(e) => {setLatestMessages(e.target.value)}}>
    </input>
    <button onClick={() =>{
      socket.send(latestmessage);
    }}
    >Send
    </button>
    {latestmessage}
    </div>
   </>
  )
}

export default App
