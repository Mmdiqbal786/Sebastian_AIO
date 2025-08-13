import React from "react";
import Logo from "@/app/lib/Logo";

const HomePage = () => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-100 text-gray-900">
      {/* Navbar (Fixed) */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-white shadow-md z-10">
        <Logo variant="small" />
        <button className="px-4 py-2 bg-red-500 text-white rounded">Order Now</button>
      </nav>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full mt-16">
        {/* Hero Section */}
        <header className="flex flex-col md:flex-row items-center justify-center text-center md:text-left p-8 w-full">
          <div className="md:w-1/2 space-y-4">
            <h2 className="pt-4 text-4xl font-extrabold">Fresh Food Delivered to You</h2>
            <p className="text-gray-600">Order your favorite meals anytime, anywhere.</p>
            <button className="px-6 py-3 bg-red-500 text-white rounded-lg">Get Started</button>
          </div>
        </header>

        {/* Login & Register Links */}
        <section className="p-8 w-full bg-gray-200 text-center rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Join Us For Users</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 justify-center">
            <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gray-800 text-white gap-2 hover:bg-gray-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" href="/login">
              Login
            </a>
            <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gray-800 text-white gap-2 hover:bg-gray-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" href="/registration">
              Register
            </a>
          </div>
        </section>

        {/* Popular Items */}
        <section className="p-8 w-full">
          <h3 className="text-2xl font-bold text-center">Popular Dishes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {["Pizza", "Burger", "Sushi"].map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg text-center">
                <h4 className="mt-2 font-semibold">{item}</h4>
                <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded">Order Now</button>
              </div>
            ))}
          </div>
        </section>

        <section className="p-8 w-full bg-gray-200 text-center rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Join Us For Employee</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 justify-center">
            <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gray-800 text-white gap-2 hover:bg-gray-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" href="/login">
              Login
            </a>
            <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gray-800 text-white gap-2 hover:bg-gray-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" href="/registration">
              Register
            </a>
          </div>
        </section>

      </main>

      {/* Footer (Fixed) */}
      <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white text-center p-4 z-10">
        <p>&copy; 2025 Lentlz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
