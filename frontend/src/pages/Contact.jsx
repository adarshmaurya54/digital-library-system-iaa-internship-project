import React from 'react';

function Contact() {
    return (
        <div className="md:py-4 md:max-w-sm w-full mx-auto">
            <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-8 w-[500px] text-center">
                <h2 className="text-3xl font-bold text-[#002F6C] mb-4">Contact Us</h2>
                <p className="text-black/80 mb-4">Reach out to us for queries or support.</p>
                <form className="flex flex-col gap-4">
                    <input type="text" placeholder="Name" className="p-2 border rounded" />
                    <input type="email" placeholder="Email" className="p-2 border rounded" />
                    <textarea placeholder="Message" rows={4} className="p-2 border rounded"></textarea>
                    <button className="bg-[#002F6C] text-white p-2 rounded hover:bg-blue-800 transition">Send</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
