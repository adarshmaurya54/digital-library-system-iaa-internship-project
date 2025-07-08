import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import bg from './assets/landing-bg.jpg';
import Contact from './pages/Contact';
import Signup from './pages/Signup';

function App() {
    return (
        <div className="h-screen font-poppins flex flex-col">
            <Header />

            <div
                style={{ backgroundImage: `url(${bg})` }}
                className="relative min-h-fit py-10 bg-fixed bg-center flex-1 bg-no-repeat bg-cover"
            >
                <div className="absolute top-0 left-0 bg-white/90 w-full h-full"></div>

                <div className="relative flex justify-center items-center h-full">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/signup" element={<Signup />} />
                        {/* add more routes here */}
                    </Routes>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default App;
