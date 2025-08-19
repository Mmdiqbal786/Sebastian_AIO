"use client";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const companyName =
    process.env.NEXT_PUBLIC_COMPANY_NAME && process.env.NEXT_PUBLIC_COMPANY_NAME.trim() !== ""
      ? process.env.NEXT_PUBLIC_COMPANY_NAME
      : "Company Name";

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white text-center p-4 z-10">
      <p>
        &copy; {currentYear} {companyName}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
