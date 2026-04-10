import React from 'react';

const AlgeriaIcon = ({
    width = '1rem',
    height = '0.75rem',
    className = '',
    alt = 'Algeria',
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 16 12"
            fill="none"
            className={className}
            aria-label={alt}
        >
            <rect width="16" height="12" rx="2" fill="white" />
            <path d="M0 0H8V12H0V0Z" fill="#006233" />
            <path d="M9.5 6C9.5 7.10457 8.82843 8 8 8C7.17157 8 6.5 7.10457 6.5 6C6.5 4.89543 7.17157 4 8 4C8.82843 4 9.5 4.89543 9.5 6Z" fill="#D21034" />
            <path d="M10 6C10 6.9665 9.44036 7.75 8.75 7.75C8.05964 7.75 7.5 6.9665 7.5 6C7.5 5.0335 8.05964 4.25 8.75 4.25C9.44036 4.25 10 5.0335 10 6Z" fill="#006233" />
            <path d="M10 6C10 6.9665 9.44036 7.75 8.75 7.75C8.05964 7.75 7.5 6.9665 7.5 6C7.5 5.0335 8.05964 4.25 8.75 4.25C9.44036 4.25 10 5.0335 10 6Z" fill="white" transform="translate(0.5, 0)" />
            {/* Simple star shape */}
            <path d="M8.8 5.4L9 6L8.5 5.7L8 6L8.2 5.4L7.8 5L8.3 5L8.5 4.4L8.7 5L9.2 5L8.8 5.4Z" fill="#D21034" />
        </svg>
    );
};

export default AlgeriaIcon;
