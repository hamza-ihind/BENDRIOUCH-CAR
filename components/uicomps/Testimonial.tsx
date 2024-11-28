"use client";

import React from "react";
import Image from "next/image";

interface TestimonialProps {
  rating: number;
  text: string;
  name: string;
  image: string;
  work: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  rating,
  text,
  name,
  image,
  work,
}) => {
  const generateStars = (rating: number): React.ReactNode => {
    const stars = [];
    const totalStars = 5;

    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <Image
          key={i}
          src={
            i <= rating
              ? "/assets/icons/full-star.png"
              : "/assets/icons/empty-star.png"
          }
          alt={`star-${i}`}
          width={16}
          height={16}
        />
      );
    }

    return stars;
  };

  return (
    <div className="flex items-center  max-lg:flex-col-reverse gap-8 px-16 max-lg:p-8">
      <div className="flex flex-col items-start justify-between min-[1024px]:flex-1 gap-8 max-lg:items-center">
        <div className="flex gap-1.5">{generateStars(rating)}</div>
        <h2 className="big-text text-4xl leading-[48px] w-[75%] max-lg:text-center max-xl:text-xl max-lg:w-full">
          {text}
        </h2>
        <div className="flex items-center justify-between w-full max-lg:items-center">
          <div className="flex items-center gap-4">
            <Image
              src={image}
              alt={image}
              width={48}
              height={48}
              className="rounded-3xl border-2 dark:border-orange-500 border-orange-800"
            />
            <div className="flex items-start flex-col gap-1 max-md:gap-0">
              <p className="p-text text-black">{name}</p>
              <p className="desc-text text-left">{work}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[30%] object-contain max-lg:w-[40%]">
        <Image
          src={image}
          alt={image}
          width={1000}
          height={50}
          className="rounded-full border-4 border-orange-500"
        />
      </div>
    </div>
  );
};

export default Testimonial;
