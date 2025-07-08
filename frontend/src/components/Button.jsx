import React, { useState } from 'react';

function Button({type,text}) {
    return (
        <button
            type={type}
            className="relative px-6 py-2 rounded-full bg-yellow-400 text-blue-900 font-medium overflow-hidden transition-colors duration-300"
        >
            <span className="relative text-black z-10">{text}</span>
        </button>
    );
}

export default Button;
