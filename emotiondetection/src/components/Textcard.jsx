import React, { useState } from 'react'
import axios from 'axios'

function Textcard() {
  const [message, setMessage] = useState('');
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async() => {
    const result = await axios.post('http://localhost:8000',{text:message})
    console.log(result.data);
    setMessage('');
  };

  return (
    <div className='flex items-center justify-center h-screen p-[50px]'>
      <div className="w-full max-w-[1500px] h-[700px] flex items-center p-6">
        
        <div className="w-full h-[500px] backdrop-blur-xl bg-white bg-opacity-30 rounded-[50px] drop-shadow-2xl shadow-[0px_20px_50px_rgba(0,0,0,0.)] border border-white/50 mr-9 p-4 flex flex-col">
          <div className="flex-grow overflow-y-auto p-4 bg-white/10 rounded-lg mb-4">
            <p className="text-gray-300">Chat History will appear here...</p>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-white/80 backdrop-blur-md border border-gray-300 outline-none focus:ring focus:ring-indigo-500 mb-9"
              placeholder="Type your message..."
              value={message}
              onChange={handleInputChange}
            />
            <button
              onClick={handleSendMessage}
              className="ml-3 p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition mb-9"
            >
              Send
            </button>
          </div>
          <div>
          </div>
        </div>

        <div className="w-full h-[500px] backdrop-blur-xl bg-white bg-opacity-30 rounded-[50px] drop-shadow-2xl shadow-[0px_20px_50px_rgba(0,0,0,0.6)] border border-white/50"></div>
      </div>
    </div>
  )
}

export default Textcard;