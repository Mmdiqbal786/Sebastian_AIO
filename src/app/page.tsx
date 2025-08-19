import React from "react";
import Layout from "@/app/components/Dashboard/LayoutAuth";

const HomePage = () => {
  return (
    <Layout>  
      <main className="flex justify-center items-center px-4 sm:px-6 lg:px-8 py-24">
        <section className="p-8 w-full">
          <h3 className="text-2xl font-bold text-center">Global Platform</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {["Talent Management", "Recruitment", "Account Management"].map((item, index) => (
              <div key={index} className="bg-black text-white p-4 rounded-lg shadow-lg text-center">
                <h4 className="mt-2 font-semibold">{item}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* <section className="p-8 w-full bg-gray-200 text-center rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Join Us For Users</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 justify-center">
            <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gray-800 text-white gap-2 hover:bg-gray-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" href="/login">
              Login
            </a>
            <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gray-800 text-white gap-2 hover:bg-gray-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" href="/registration">
              Register
            </a>
          </div>
        </section> */}
        </main>
    </Layout>
  );
};

export default HomePage;
