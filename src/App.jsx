import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import './App.css';

function App() {
  const [textoOriginal, setTextoOriginal] = useState('');
  const [textoCifrado, setTextoCifrado] = useState('');
  const [textoDescifrado, setTextoDescifrado] = useState('');

  const encryptionKey = 'byz9VFNtbRQM0yBODcCb1lrUtVVH3D3x'; // 32 caracteres
  const iv = 'X05IGQ5qdBnIqAWD'; // 16 caracteres

  const cifrarTexto = () => {
    const key = CryptoJS.enc.Utf8.parse(encryptionKey);
    const ivParsed = CryptoJS.enc.Utf8.parse(iv);

    const encrypted = CryptoJS.AES.encrypt(textoOriginal, key, {
      iv: ivParsed,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    setTextoCifrado(encrypted.toString());
  };

  const descifrarTexto = () => {
    try {
      const key = CryptoJS.enc.Utf8.parse(encryptionKey);
      const ivParsed = CryptoJS.enc.Utf8.parse(iv);

      const decrypted = CryptoJS.AES.decrypt(textoCifrado, key, {
        iv: ivParsed,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      const result = decrypted.toString(CryptoJS.enc.Utf8);
      setTextoDescifrado(result);
    } catch (error) {
      setTextoDescifrado('Error al descifrar');
    }
  };

  return (
    <div className="App" style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>🔐 Cifrado AES-256-CBC </h2>

      <label>Texto original:</label>
      <input
        type="text"
        value={textoOriginal}
        onChange={(e) => setTextoOriginal(e.target.value)}
        style={{ marginBottom: '1rem', width: '100%' }}
      />

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={cifrarTexto} style={{ marginRight: '10px' }}>Cifrar</button>
        <button onClick={descifrarTexto}>Descifrar</button>
      </div>

      <p><strong>Texto cifrado:</strong> {textoCifrado}</p>
      <p><strong>Texto descifrado:</strong> {textoDescifrado}</p>
    </div>
  );
}

export default App;
