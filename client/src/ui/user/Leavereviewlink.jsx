import React from 'react';
import { Link } from 'react-router-dom';
import interrogationIcon from '@/assets/svg/leftbaruser/interrogation.svg';

const Leavereviewlink = () => {
    return (
        <Link 
            to="/review" 
            className="flex items-center justify-center gap-[0.5vw] w-full no-underline"
        >
            <img 
                src={interrogationIcon} 
                alt="Review" 
                className="shrink-0 object-contain"
                style={{ width: '1vw', height: '1vw' }}
            />
            <span className="text-[0.9vw] font-medium text-[#3457DC] whitespace-nowrap">
                Leave a review ?
            </span>
        </Link>
    );
};

export default Leavereviewlink;
