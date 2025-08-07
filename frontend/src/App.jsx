import React, { useEffect } from 'react';
import {Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import bg from './assets/landing-bg.jpg';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './redux/features/auth/authAction';

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCurrentUser())
    },[])
    
    return (
        <div className="h-screen overflow-y-auto font-poppins flex flex-col">
            <Header/>

            <div
                style={{ backgroundImage: `url(${bg})` }}
                className="relative min-h-fit bg-fixed bg-center flex-1 bg-no-repeat bg-cover"
            >
                <div className="absolute top-0 left-0 bg-white/90 w-full h-full"></div>

                <div className="relative h-full w-full">
                    <Outlet/>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default App;
