import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={{ background: '#333', color: 'white', padding: '10px', textAlign: 'center' }}>
            <p>ConnectFest © {new Date().getFullYear()}</p>
        </footer>
    );
};

export default Footer;
