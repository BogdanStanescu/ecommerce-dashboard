import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t absolute bottom-0">
      <div className="mx-auto py-10">
        <p className="text-center text-xs text-black">
          &copy; 2023 E-Commerce Dashboard. All rights reserved. Powered by{" "}
          <a
            href="https://www.linkedin.com/in/bogdanstanescu/"
            target="_blank"
            className="underline font-bold text-blue-950"
          >
            Stănecsu Bogdan 🚀
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
