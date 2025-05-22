import React, { useState } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';

function Signup() {
    
    const [password, setPassword] = useState('');
    
    // funzione per calcolare la forza della password (0-100)
    const passwordStrength = (pwd) => {
        let score = 0;
        if (!pwd) return score;
        if (pwd.length >= 6) score += 25;
        if (/[A-Z]/.test(pwd)) score += 25;       // maiuscole
        if (/[0-9]/.test(pwd)) score += 25;       // numeri
        if (/[^A-Za-z0-9]/.test(pwd)) score += 25; // caratteri speciali
        return score;
    };
    
    // colore barra in base al punteggio
    const getColor = (score) => {
        if (score < 50) return '#ff3d00';    // rosso
        if (score < 75) return '#ffa500';    // arancione
        return '#4caf50';                    // verde
    };
    
    // testo in base al punteggio
    const getStrengthText = (score) => {
        switch (true) {
            case (score === 0):
            return '';
            case (score < 50):
            return 'Too easy my friend';
            case (score < 75):
            return 'Almost there';
            default:
            return 'Top secret';
        }
    };
    

    const strength = passwordStrength(password);
    
    return (
        <div className='container-fluid main-login'>     
            <div className='row '>
                <div className='col-12 col-sm-10 col-md-8 col-lg-6 login-container  custom-width'>
                
                    <h2 className=" login-title  mt-5 text-start">Signup</h2>
                    
                    <p className="text-start">
                        Already registered?{' '}
                        <Link to="/login" className="link-custom">Login</Link>
                    </p>
                    
                    <div className="mb-2">
                        <label htmlFor="inputNome" className="form-label"></label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputNome"
                            placeholder="Inserisci il nome"
                        />
                    </div>
                    
                    <div className="mb-2">
                        <label htmlFor="inputCognome" className="form-label"></label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputCognome"
                            placeholder="Inserisci il cognome"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="inputEmail" className="form-label"></label>
                        <input type="email" className="form-control" id="inputEmail" placeholder="Inserisci l'email" />
                    </div>
                    
                    <div className="mb-2">
                        <label htmlFor="inputPassword" className="form-label"></label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword"
                            placeholder="Inserisci la password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        
                        {/* Barra di forza password con testo sulla stessa riga */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px' }}>
                            <div
                                className="password-strength-bar"
                                style={{ width: '300px', height: '4px', borderRadius: '4px', backgroundColor: '#ddd' }}
                            >
                                <div
                                    className="password-strength-fill"
                                    style={{ width: `${strength}%`, height: '100%', backgroundColor: getColor(strength), borderRadius: '4px' }}
                                />
                            </div>
                            <small style={{ color: getColor(strength), margin: 0 }}>
                                {getStrengthText(strength)}
                            </small>
                        </div>
                    </div>
                    
                    <div className="form-check mb-2 mt-3">
                        <input
                            className="form-check-input custom-checkbox"
                            type="checkbox"
                            id="acceptTerms"
                        />
                        <label className="form-check-label" htmlFor="acceptTerms">
                            agree to our <Link to="#" className="link-terms">Terms and Conditions</Link>
                        </label>
                    </div>
                    
                    <button type="submit" className="button-custom w-100">Create account</button>
                
                </div>
            </div>
        </div>
    );
}

export default Signup;
