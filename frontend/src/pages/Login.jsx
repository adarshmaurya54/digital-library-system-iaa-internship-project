import React from 'react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="relative flex flex-col p-6 bg-white rounded-2xl shadow-xl border border-gray-200 max-w-sm w-full mx-auto">
            <div className="text-2xl font-bold mb-2 text-[#002F6C] text-center">
                Welcome back !
            </div>
            <div className="text-sm font-medium mb-4 text-center text-[#002F6C]">
                Log in to your account
            </div>
            <form className="flex flex-col gap-4">
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
                        placeholder="Enter your password"
                        className="w-full h-11 px-3 rounded-xl border border-gray-300 focus:ring-2 ring-[#002F6C] outline-none transition"
                    />
                </div>
                <div className="text-right">
                    <a href="#" className="text-sm text-sky-700 hover:underline">Forgot your password?</a>
                </div>
                <Button type='submit' text='Login'/>
            </form>
            <div className="text-sm text-center mt-4">
                Don't have an account yet?{' '}
                <Link to="/signup" className="text-sky-700 hover:underline">Sign up for free!</Link>
            </div>
        </div>
    );
}

export default Login;
