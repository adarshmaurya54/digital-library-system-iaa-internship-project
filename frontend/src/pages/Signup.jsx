import React from 'react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <div className="relative flex flex-col p-6 bg-white rounded-2xl shadow-xl border border-gray-200 max-w-sm w-full mx-auto">
            <div className="text-2xl font-bold mb-2 text-[#002F6C] text-center">
                Create your account
            </div>
            <div className="text-sm font-medium mb-4 text-center text-[#002F6C]">
                Sign up to get started
            </div>
            <form className="flex flex-col gap-4">
                <div>
                    <label htmlFor="name" className="block text-gray-600 text-sm mb-1">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your full name"
                        className="w-full h-11 px-3 rounded-xl border border-gray-300 focus:ring-2 ring-[#002F6C] outline-none transition"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-600 text-sm mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="w-full h-11 px-3 rounded-xl border border-gray-300 focus:ring-2 ring-[#002F6C] outline-none transition"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-600 text-sm mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Create a password"
                        className="w-full h-11 px-3 rounded-xl border border-gray-300 focus:ring-2 ring-[#002F6C] outline-none transition"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-gray-600 text-sm mb-1">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        className="w-full h-11 px-3 rounded-xl border border-gray-300 focus:ring-2 ring-[#002F6C] outline-none transition"
                    />
                </div>
                <Button type='submit' text='Sign Up' />
            </form>
            <div className="text-sm text-center mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-sky-700 hover:underline">Log in here</Link>
            </div>
        </div>
    );
}

export default Signup;
