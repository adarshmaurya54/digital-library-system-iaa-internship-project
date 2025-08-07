import React from 'react';

function About() {
    return (
        <div className='h-full md:py-4 flex items-center justify-center'>
            <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-8 w-[600px] text-center">
                <h2 className="text-3xl font-bold text-[#002F6C] mb-4">About Us</h2>
                <p className="text-black/80">
                    The Indian Aviation Academy (IAA) is the premier training institute in the field of aviation, nurturing future aviation professionals.
                </p>
            </div>
        </div>
    );
}

export default About;
