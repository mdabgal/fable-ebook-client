import React from 'react';

const Spinner = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-base-100">
        
            <div className="loading loading-spinner loading-lg text-emerald-600"></div>
            <p className="mt-4 text-gray-500 font-medium animate-pulse">Loading Fable...</p>
        </div>
    );
};

export default Spinner;