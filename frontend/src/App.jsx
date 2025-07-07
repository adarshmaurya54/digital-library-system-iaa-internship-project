function App() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header with IAA-style gradient */}
      <nav className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-[#0058A0] to-[#85C5EC] shadow-md">
        <h1 className="text-3xl font-bold text-white">Digital Library</h1>
        <div className="space-x-6 text-white font-medium">
          <a href="#about" className="hover:text-yellow-300">About</a>
          <a href="#features" className="hover:text-yellow-300">Features</a>
          <a href="#contact" className="hover:text-yellow-300">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-16 bg-white">
        <h2 className="text-5xl md:text-6xl font-extrabold text-[#0058A0] leading-tight mb-4">
          Unlock a World of Knowledge 📚
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">
          Access thousands of books, research papers, and academic resources from anywhere in the world. Explore, learn, and grow with our digital library platform.
        </p>
        <a
          href="#get-started"
          className="bg-[#0058A0] hover:bg-[#004478] text-white text-lg font-semibold py-3 px-8 rounded-full shadow-md transition duration-300"
        >
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20 px-6 md:px-20 border-t border-gray-200">
        <h3 className="text-4xl font-bold text-center text-[#0058A0] mb-12">
          Features You'll Love
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300">
            <h4 className="text-2xl font-bold text-[#0058A0] mb-2">Instant Access</h4>
            <p className="text-gray-700">Read and download books anytime, anywhere with just a few clicks.</p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300">
            <h4 className="text-2xl font-bold text-[#0058A0] mb-2">Smart Search</h4>
            <p className="text-gray-700">Quickly find the exact book or article you need using powerful filters.</p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300">
            <h4 className="text-2xl font-bold text-[#0058A0] mb-2">User Dashboard</h4>
            <p className="text-gray-700">Track your reading history, save favorites, and manage your account.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-[#F5FAFF] py-20 px-6 md:px-20 border-t border-gray-200">
        <h3 className="text-4xl font-bold text-center text-[#0058A0] mb-12">About Us</h3>
        <p className="max-w-3xl mx-auto text-lg text-gray-700 text-center">
          Our mission is to democratize knowledge and make quality educational resources available to all. Whether you're a student, educator, or curious mind, our platform is built to help you thrive in the digital age.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-20 px-6 md:px-20 border-t border-gray-200">
        <h3 className="text-4xl font-bold text-center text-[#0058A0] mb-12">Get in Touch</h3>
        <form className="max-w-2xl mx-auto space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0058A0]"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0058A0]"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0058A0]"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-[#0058A0] text-white font-semibold py-3 rounded-lg hover:bg-[#004478] transition duration-300"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-[#0058A0] text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} Digital Library. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
