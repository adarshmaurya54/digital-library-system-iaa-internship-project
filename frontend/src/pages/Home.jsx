import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import heroBg from '../assets/landing-bg.jpg'; // adjust path if needed
import { useSelector } from 'react-redux';

function Home() {
    const { user } = useSelector(state => state.auth)
    return (
        <div className="flex flex-col items-center justify-center w-full">
            {/* Hero Section */}
            <div
                className="w-full h-[80vh] bg-cover bg-center flex flex-col justify-center items-center text-center relative"

            >
                <div className="relative z-10 max-w-2xl mx-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                        Welcome to IAA Digital Library
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-6">
                        Nurturing aviation excellence by providing seamless access to study materials, resources, and digital content for trainees and faculty.
                    </p>
                    {user ?
                        <Link to="/dashboard">
                            <Button text="Go to dashboard" />
                        </Link>
                        :
                        <Link to="/signup">
                            <Button text="Get Started" />
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
}


export default Home;
