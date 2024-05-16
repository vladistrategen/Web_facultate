import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleLogout = () => {
        localStorage.removeItem('user'); 
        navigate('/login'); 
    };
    return (
        <header style={{ background: 'linear-gradient(45deg, #6b0f1a, #b91372)', color: 'white', padding: '10px', textAlign: 'center' }}>
            <h1>Welcome to ConnectFest!</h1>
            <div style={{ position: 'absolute', right: '10px', top: '10px' }}>
                <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '16px', cursor: 'pointer' }} onClick={toggleDropdown}>
                    &#9776; Menu
                </button>
                {isOpen && (
                    <div style={{ display: 'block', position: 'absolute', right: '0', backgroundColor: '#b91372', boxSizing: 'border-box', border: '1px solid #ddd', zIndex: 1000 }}>
                        <Link to="/" style={{ display: 'block', padding: '8px 16px', color: 'white', textDecoration: 'none' }}>Home Page</Link>
                        <Link to="/login" style={{ display: 'block', padding: '8px 16px', color: 'white', textDecoration: 'none' }}>Login</Link>
                        <Link to="/register" style={{ display: 'block', padding: '8px 16px', color: 'white', textDecoration: 'none' }}>Register</Link>
                        <Link to="/about" style={{ display: 'block', padding: '8px 16px', color: 'white', textDecoration: 'none' }}>About</Link>
                        <Link to="/login" style={{ display: 'block', padding: '8px 16px', color: 'white', textDecoration: 'none' }} onClick={handleLogout}>Logout</Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
