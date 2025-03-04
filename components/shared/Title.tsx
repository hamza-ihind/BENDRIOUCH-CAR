import React, { FC, ReactNode } from "react";
import { Badge } from "../ui/badge";
import { SparklesCore } from "../ui/sparkles";
import { IconBadge } from "./icon-badge";
import { Car, LucideIcon } from "lucide-react";

interface TitleProps {
  icon: LucideIcon;
  title: string;
  description: string;
  additionalStyles?: string;
}

const Title: FC<TitleProps> = ({
  icon,
  title,
  description,
  additionalStyles = "",
}: TitleProps) => {
  return (
    <div
      className={`flex w-full flex-col gap-4 items-start justify-start max-xl:items-start ${additionalStyles}`}
    >
      <IconBadge icon={icon} size={"default"} />
      <div className="h-[100%] w-full flex flex-col items-start justify-center overflow-hidden rounded-xl">
        <h1 className="mb-4 font-semibold text-gray-800 text-4xl lg:text-5xl dark:text-neutral-200">
          {title}
        </h1>
        <p className="p-text text-left text-gray-600 lg:w-[60%]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Title;
