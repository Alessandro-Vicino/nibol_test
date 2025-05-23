import React, { useState, useEffect } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';
import db from '../db/db';



function Signup() {
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' o 'error'

    const passwordStrength = (pwd) => {
        let score = 0;
        if (!pwd) return score;
        if (pwd.length >= 6) score += 25;
        if (/[A-Z]/.test(pwd)) score += 25;
        if (/[0-9]/.test(pwd)) score += 25;
        if (/[^A-Za-z0-9]/.test(pwd)) score += 25;
        return score;
    };

    const getColor = (score) => {
        if (score < 50) return '#ff3d00';
        if (score < 75) return '#ffa500';
        return '#4caf50';
    };

    const getStrengthText = (score) => {
        switch (true) {
            case (score === 0): return '';
            case (score < 50): return 'Too easy my friend';
            case (score < 75): return 'Almost there';
            default: return 'Top secret';
        }
    };

    const strength = passwordStrength(password);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome || !cognome || !email || !password || !termsAccepted) {
            setMessage('Fill in all fields and accept the terms and conditions.');
            setMessageType('error');
            return;
        }

        try {
            // Verifica se l'email è già registrata
            const existing = await db.users.where('email').equals(email).first();
            if (existing) {
                setMessage('Email already registered.');
                setMessageType('error');
                return;
            }

            await db.users.add({ nome, cognome, email, password });

            setMessage('Registration successful!');
            setMessageType('success');

            setNome('');
            setCognome('');
            setEmail('');
            setPassword('');
            setTermsAccepted(false);
        } catch (error) {
            setMessage('Error during registration.');
            setMessageType('error');
        }
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className='container-fluid main-login'>
            <div className='row'>
                <div className='col-12 col-sm-10 col-md-8 col-lg-6 login-container custom-width'>
                    <h2 className="login-title mt-5 text-start">Signup</h2>

                    <p className="text-start">
                        Already registered?{' '}
                        <Link to="/login" className="link-custom">Login</Link>
                    </p>

                    {message && (
                        <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                            />
                        </div>

                        <div className="mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Surname"
                                value={cognome}
                                onChange={e => setCognome(e.target.value)}
                            />
                        </div>

                        <div className="mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px' }}>
                                <div style={{ width: '300px', height: '4px', borderRadius: '4px', backgroundColor: '#ddd' }}>
                                    <div style={{ width: `${strength}%`, height: '100%', backgroundColor: getColor(strength), borderRadius: '4px' }} />
                                </div>
                                <small style={{ color: getColor(strength), margin: 0 }}>{getStrengthText(strength)}</small>
                            </div>
                        </div>

                        <div className="form-check mb-2 mt-3">
                            <input
                                className="form-check-input custom-checkbox"
                                type="checkbox"
                                id="acceptTerms"
                                checked={termsAccepted}
                                onChange={e => setTermsAccepted(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="acceptTerms">
                                agree to our <Link to="#" className="link-terms">Terms and Conditions</Link>
                            </label>
                        </div>

                        <button type="submit" className="button-custom w-100">Create account</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
