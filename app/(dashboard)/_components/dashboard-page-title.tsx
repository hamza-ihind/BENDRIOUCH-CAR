import React from "react";

interface DashboardTitleProps {
  title: string;
  description: string;
}

const DashboardPageTitle = ({ title, description }: DashboardTitleProps) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <h1 className="text-black dark:text-white text-5xl font-bold max-lg:text-4xl">
        {title}
      </h1>
      <p className="text-gray-500 text-base">{description}</p>
    </div>
  );
};

export default DashboardPageTitle;
