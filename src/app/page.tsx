import React from "react";
import Header from "./components/Dashboard/HeaderAuth";

const HomePage = () => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-100 text-gray-900">
      <Header />

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full mt-16">

        {/* Popular Items */}
        <section className="p-8 w-full">
          <h3 className="text-2xl font-bold text-center">Global Platform</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {["Talent Management", "Recruitment", "Account Management"].map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg text-center">
                <h4 className="mt-2 font-semibold">{item}</h4>
              </div>
            ))}
          </div>
        </section>

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

      </main>

      {/* Footer (Fixed) */}
      <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white text-center p-4 z-10">
        <p>&copy; 2025 Aceolution One. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
