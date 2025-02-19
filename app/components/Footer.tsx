// 'use client'


import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <div className=" bg-slate-300 flex items-center md:justify-between justify-center
     p-5 sm:px-10 md:px-20 lg:px-32 xl:px-72 border-2 ">


      <div className="hidden md:block">
        <h2 className="text-2xl md:text-lg">Movie Explorer</h2>
        <p className="">Directed by TechStaunch Solution</p>
      </div>

      {/* Social Media Links */}
      <div className="flex justify-center gap-4">
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <Image
          width={50} height={50}
            className="opacity-30 hover:opacity-100 transition-all duration-300"
            src="https://img.icons8.com/?size=64&id=32323&format=png"
            alt="Instagram"
          />
        </a>
        <a href="https://www.linkedin.com/login/in" target="_blank" rel="noopener noreferrer">
          <Image
          width={50} height={50}
            className="opacity-30 hover:opacity-100 transition-all duration-300"
            src="https://img.icons8.com/?size=64&id=13930&format=png"
            alt="LinkedIn"
          />
        </a>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
          <Image
          width={50} height={50}
            className="opacity-30 hover:opacity-100 transition-all duration-300"
            src="https://img.icons8.com/?size=64&id=efFfwotdkiU5&format=png"
            alt="GitHub"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
