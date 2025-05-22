import './signup.css';
import React, { useState } from 'react';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    function handleSubmit(e) {
        e.preventDefault();
        // Qui puoi mandare i dati dove vuoi, per ora non fa nulla
    }
    
    return (
        <form onSubmit={handleSubmit}>
        <h2>Iscrizione</h2>
        
        <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        
        <br />
        
        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        
        <br />
        
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        
        <br />
        
        <button type="submit">Invia</button>
        </form>
    );
}

export default Signup;
