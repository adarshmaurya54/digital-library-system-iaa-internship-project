import React, { useState } from 'react';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userLogin } from '../redux/features/auth/authAction';
import { useDispatch } from 'react-redux';

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value })
    }

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email || !password) {
            toast.error("All fields are required!");
            return;
        }

        if (!validateEmail(email)) {
            toast.error('Please enter a valid email address!');
            return;
        }
        const payload = {
            email, password
        };

        dispatch(userLogin(payload)).then((res) => {
            if (res.payload?.success) {
                navigate("/profile"); 
            }
        });
    };


    return (
        <div className="md:py-4">
            <div className="relative flex flex-col p-6 bg-white md:rounded-2xl shadow-xl border border-gray-200 md:max-w-sm w-full mx-auto">
                <div className="text-2xl font-bold mb-2 text-[#002F6C] text-center">
                    Welcome back !
                </div>
                <div className="text-sm font-medium mb-4 text-center text-[#002F6C]">
                    Log in to your account
                </div>
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-600 text-sm mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full h-11 px-3 rounded-xl border border-gray-300 focus:ring-2 ring-[#002F6C] outline-none transition"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-600 text-sm mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full h-11 px-3 rounded-xl border border-gray-300 focus:ring-2 ring-[#002F6C] outline-none transition"
                        />
                    </div>
                    <div className="text-right">
                        <a href="#" className="text-sm text-sky-700 hover:underline">Forgot your password?</a>
                    </div>
                    <div className='text-center'>
                        <Button type='submit' text='Login' />
                    </div>
                </form>
                <div className="text-sm text-center mt-4">
                    Don't have an account yet?{' '}
                    <Link to="/signup" className="text-sky-700 hover:underline">Sign up for free!</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
