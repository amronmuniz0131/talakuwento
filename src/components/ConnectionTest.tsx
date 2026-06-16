import { useState, useEffect } from 'react';

export function ConnectionTest() {
  const [status, setStatus] = useState<'testing' | 'success' | 'error'>('testing');
  const [message, setMessage] = useState<string>('Testing connection...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/test');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStatus('success');
        setMessage(data.message);
        console.log('Backend Response:', data);
      } catch (error) {
        setStatus('error');
        setMessage('Server Connection Failed');
        console.error('Connection Test Error:', error);
      }
    };

    testConnection();
  }, []);

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white font-medium transition-all duration-500 ${
      status === 'testing' ? 'bg-blue-500/80' :
      status === 'success' ? 'bg-green-500/80' :
      'bg-red-500/80'
    }`}>
      <div className="flex items-center gap-2">
        {status === 'testing' && <span className="animate-spin text-xl">⏳</span>}
        {status === 'success' && <span className="text-xl">✅</span>}
        {status === 'error' && <span className="text-xl">❌</span>}
        <p>{message}</p>
      </div>
    </div>
  );
}
