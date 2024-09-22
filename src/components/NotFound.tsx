import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = (): JSX.Element => {
    return (
        <div className="w-full min-h-screen flex flex-col gap-y-5 items-center justify-center">
            <div className="text-[25px] text-red-500 font-medium text-center">
                Page Not Found
            </div>

            <div className="text-gray-500 underline cursor-pointer text-xl text-center">
                <Link to='/'>
                    View Pianimation Profile
                </Link>
            </div>
        </div>
    );
};

export default NotFound;