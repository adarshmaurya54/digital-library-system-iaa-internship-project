import { Link } from "react-router-dom";

function PageNotFound() {
    return (
        <div className="relative bg-[url(src/assets/bg_iaa_building.jpg)] h-screen bg-cover bg-no-repeat">
            {/* Dark overlay */}
            <div className="absolute top-0 left-0 h-full w-full bg-black/60 flex flex-col items-center justify-center text-center px-6">

                {/* Large 404 number */}
                <h1 className="text-8xl md:text-9xl font-extrabold text-white drop-shadow-lg">
                    404
                </h1>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
                    Oops! Page Not Found
                </h2>

                {/* Description */}
                <p className="text-gray-200 mt-2 max-w-md">
                    The page you are looking for might have been removed,
                    had its name changed, or is temporarily unavailable.
                </p>

                {/* Back to home button */}
                <Link
                    to='/'
                    className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg shadow-lg transition duration-300"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}

export default PageNotFound;
