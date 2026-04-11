import React from 'react';

const Logoicon = ({
    width = '2.25rem',
    height = '1.625rem',
    className = '',
    alt = ''
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 36 26"
            fill="none"
            className={className}
            aria-label={alt}
        >
            <path d="M5.41737 7.82739V24.8195H4.29748C2.43871 24.8195 0.931641 23.0138 0.931641 20.7875V7.82739H5.41737Z" fill="#3457DC" />
            <path d="M36 22.3192C34.1389 23.8972 32.2162 24.8528 31.087 24.8528C30.7253 24.8528 30.4453 24.7543 30.2741 24.5479C30.2741 24.5479 24.5991 17.7734 23.8008 16.6098C25.7513 17.6162 30.3234 20.6042 31.3863 21.3362C30.5548 20.4072 26.0066 16.3079 24.8744 15.2327C32.4082 16.6504 35.9993 22.3192 35.9993 22.3192H36Z" fill="#3457DC" />
        </svg>
    );
};

export default Logoicon;
