import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-center text-gray-300 px-6 py-6">
            © {new Date().getFullYear()} Indian Aviation Academy. All rights reserved.
        </footer>
    );
}
