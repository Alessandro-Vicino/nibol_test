import React, { useState, useEffect } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import db from '../db/db';  // correggi il percorso se serve

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' o 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage('Enter email and password.');
            setMessageType('error');
            return;
        }

        try {
            // Cerca l'utente con email e password corrispondenti
            const user = await db.users
                .where({ email: email, password: password })
                .first();

            if (!user) {
                setMessage('User not registered or incorrect credentials.');
                setMessageType('error');
            } else {
                setMessage('Login successful!');
                setMessageType('success');
                // qui puoi anche fare redirect o salvare lo stato login
            }
        } catch (error) {
            setMessage('Error during login.');
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
        <div className="container-fluid main-login">
            <div className="row">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 login-container">
                    <h2 className="login-title mt-5 text-start">Login</h2>

                    <p className="text-start">
                        Don't you have an account?{' '}
                        <Link to="/signup" className="link-custom">Signup</Link>
                    </p>

                    {message && (
                        <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-2">
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="button-custom w-100">Continue</button>
                    </form>

                    <p className="mt-3 text-center">
                        <Link to="/signup" className="link-custom">Forgot password?</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
