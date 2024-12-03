import React from "react";

interface SectionTitleProps {
  title: string;
  description: string;
}

const SectionTitle = ({ title, description }: SectionTitleProps) => {
  return (
    <div className="flex items-start flex-col flex-1/2 w-[350px] max-md:w-full">
      <p className="text-2xl text-black dark:text-white font-semibold">
        {title}
      </p>
      <p className="text-base text-gray-600">{description}</p>
    </div>
  );
};

export default SectionTitle;
