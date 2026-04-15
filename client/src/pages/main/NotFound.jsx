import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{
            height: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2vh',
            textAlign: 'center',
            color: 'white',
            fontFamily: 'Poppins, sans-serif'
        }}>
            <h1 style={{ fontSize: '8vh', margin: 0, color: '#3457DC' }}>404</h1>
            <p style={{ fontSize: '2.5vh', opacity: 0.7 }}>Oops! Page not found.</p>
            <Link to="/usersdashboard" style={{
                marginTop: '2vh',
                padding: '1.5vh 3vw',
                backgroundColor: '#3457DC',
                color: 'white',
                borderRadius: '1vh',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1.8vh'
            }}>
                Back to Dashboard
            </Link>
        </div>
    );
};

export default NotFound;
