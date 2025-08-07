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
        password: '',
        loginRole: 'trainee'
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

        dispatch(userLogin(formData)).then((res) => {
            if (res.payload?.success) {
                navigate("/dashboard");
            }
        });
    };

    const toggleLoginRole = (role) => {
        setFormData((prev) => ({
            ...prev,
            loginRole: role,
        }))
    };


    return (
        <div className="md:py-4 h-full">
            <div className="relative flex flex-col p-6 md:h-auto h-full bg-white md:rounded-2xl shadow-xl border border-gray-200 md:max-w-sm w-full mx-auto">
                <div className="text-2xl font-bold mb-2 text-[#002F6C] text-center">
                    Welcome back !
                </div>
                <div className="text-sm font-medium mb-4 text-center text-[#002F6C]">
                    Log in to your account
                </div>
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                    <div className="rounded-2xl p-1 border border-black/10 mt-3">
                        <div className="relative w-full flex items-center overflow-hidden">
                            {/* Sliding background highlight */}
                            <div
                                className={`absolute z-10 top-0 transition-all duration-500 bg-[#002F6C] rounded-xl h-full w-1/3 ${formData.loginRole === "admin"
                                    ? "left-[66.6%]"
                                    : formData.loginRole === "faculty"
                                        ? "left-[33.3%]"
                                        : "left-[0%]"
                                    }`}
                            ></div>

                            {/* Trainee Button */}
                            <div
                                onClick={() => toggleLoginRole("trainee")}
                                className={`w-1/3 z-20 text-center p-2 cursor-pointer transition-colors duration-500 rounded-xl ${formData.loginRole === "trainee" ? "text-white" : "text-black"
                                    }`}
                            >
                                Trainee
                            </div>

                            {/* Faculty Button */}
                            <div
                                onClick={() => toggleLoginRole("faculty")}
                                className={`w-1/3 z-20 text-center cursor-pointer transition-colors duration-500 rounded-xl ${formData.loginRole === "faculty" ? "text-white" : "text-black"
                                    }`}
                            >
                                Faculty
                            </div>

                            {/* Admin Button */}
                            <div
                                onClick={() => toggleLoginRole("admin")}
                                className={`w-1/3 z-20 text-center cursor-pointer transition-colors duration-500 rounded-xl ${formData.loginRole === "admin" ? "text-white" : "text-black"
                                    }`}
                            >
                                Admin
                            </div>
                        </div>
                    </div>

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
