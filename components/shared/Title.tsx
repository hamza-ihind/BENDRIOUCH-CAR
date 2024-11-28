import React, { FC, ReactNode } from "react";
import { Badge } from "../ui/badge";
import { SparklesCore } from "../ui/sparkles";

interface TitleProps {
  label: string;
  title: string;
  description: string;
  additionalStyles?: string;
}

const Title: FC<TitleProps> = ({
  label,
  title,
  description,
  additionalStyles = "",
}: TitleProps) => {
  return (
    <div
      className={`flex w-full flex-col gap-4 items-center justify-start max-xl:items-start ${additionalStyles}`}
    >
      <Badge
        className="w-fit text-sm font-medium max-xl:text-xs"
        variant={"outline"}
      >
        {label}
      </Badge>
      <div className="h-[100%] w-full flex flex-col items-center max-xl:items-start justify-center overflow-hidden rounded-xl">
        <h1 className="text-6xl max-xl:text-4xl max-xl:font-semibold font-bold text-center dark:text-white text-black relative z-20 mb-2">
          {title}
        </h1>
        <p className="p-text max-xl:text-left">{description}</p>
        <div className="max-xl:hidden w-[100rem] h-20 relative">
          {/* Gradients */}
          <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent h-[2px]  blur-sm" />
          <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent h-px" />
          <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent h-[5px] blur-sm" />
          <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent h-px" />

          <SparklesCore
            background="transparent"
            minSize={0.3}
            maxSize={0.8}
            particleDensity={900}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(500px_100px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
    </div>
  );
};

export default Title;
