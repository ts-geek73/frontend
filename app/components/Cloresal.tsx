"use client";
import Image from "next/image";
import cloresal1 from "./../../public/images/cloresal1.png";
import cloresal2 from "./../../public/images/cloresal2.png";
import cloresal3 from "./../../public/images/cloresal3.png";
import left from "../../public/images/back.png";
import right from "../../public/images/right-arrow.png";
import { useRef, useState } from "react";

const Cloresal = () => {
  const images = [
    cloresal2,
    cloresal3,
    cloresal1,
    cloresal2,
    cloresal1,
    cloresal3,
    cloresal1,
    cloresal2,
    cloresal3,
  ];

  const visibleImage = 3;
  const [startIndex, setStartIndex] = useState(0);

  const imagesToShow = images.slice(startIndex, startIndex + visibleImage);

  const containerRef = useRef(null);

  const scrollLeft = () => {
    setStartIndex(Math.max(0, startIndex - 1));
  };

  const scrollRight = () => {
    setStartIndex(Math.min(images.length - visibleImage, startIndex + 1));
  };

  return (
    <div className="relative flex ">

  
      <button
        onClick={scrollLeft}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white z-10 rounded-full p-2 opacity-70 hover:opacity-100"
      >
        <Image src={left} alt="left" height={30} width={30} />
      </button>

      <div
        ref={containerRef}
        className="flex overflow-x-auto scroll-smooth gap-4 py-8 px-4 min-w-full"
      >
        {imagesToShow.map((image, index) => (
          <div
            key={index}
            className="relative w-1/3 min-h-[500px] border-4 border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-[1.05]"
          >
            <Image
              src={image}
              alt={`cloresal-${index}`}
              height={500}
              width={500}
              objectFit="cover"
              className="absolute h-3/4 w-full top-0 left-0 "
            />

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-center p-4 bg-gradient-to-t from-black to-transparent rounded-lg">
              <h2 className="text-xl font-semibold">
                Cloresal Movie {startIndex + index + 1}
              </h2>
              <p className="mb-4 text-lg">
                Lorem ipsum dolor sit amet consectetur.
              </p>
              <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 z-10 opacity-70 hover:opacity-100"
      >
        <Image src={right} alt="right" height={30} width={30} />
      </button>
    </div>
  );
};

export default Cloresal;
