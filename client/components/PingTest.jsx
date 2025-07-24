"use client";
import { useState } from 'react';

export default function PingTest() {
  const [response, setResponse] = useState('');

  async function pingBackend() {
    try {
      const res = await fetch('http://localhost:5001/health'); // adjust port if needed
      const text = await res.text();
      setResponse(text);
    } catch (error) {
      setResponse('Error: ' + error.message);
    }
  }

  return (
    <div className="p-4 border rounded-md">
      <button
        onClick={pingBackend}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Ping Backend
      </button>
      {response && <p className="mt-2">Response: {response}</p>}
    </div>
  );
}
