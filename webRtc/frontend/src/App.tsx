import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route , BrowserRouter as Router, Routes} from 'react-router-dom'
import Sender from './components/Sender'
import Receiver from './components/Receiver'

function App() {

  return (
    <>
     <div>
      <BrowserRouter>
        <Routes>
          <Route path="/sender" element={<Sender />} /> 
          <Route path="/receiver" element={<Receiver />} />
        </Routes>
      </BrowserRouter>
     </div>
    </>
  )
}

export default App;
