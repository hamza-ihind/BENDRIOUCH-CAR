import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 text-center z-20 w-full py-10 px-4 sm:px-6 lg:px-8">
      {/* <div>
        <a
          className="flex-none text-xl font-semibold text-black dark:text-white"
          href="#"
          aria-label="Brand"
        >
          ALEPHNULL
        </a>
      </div> */}
      {/* LOGO HERE */}
      <div className="mt-3">
        <p className="text-gray-300 dark:text-neutral-300">
          © ALEPHNULL. 2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
