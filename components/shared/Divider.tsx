import React, { FC } from "react";
import Image from "next/image";

interface DividerProps {
  title: string;
}

const Divider: FC<DividerProps> = ({ title }: DividerProps) => {
  return (
    <div className="pt-16 pb-6 w-full flex flex-col gap-4">
      <div className="w-full flex justify-between">
        <p className="big-text text-2xl">{title}</p>
        <Image
          src="/assets/icons/vertical-dots.svg"
          alt="vertical dots"
          height={24}
          width={24}
        />
      </div>
      <div className="w-full h-0.5 bg-gray-300 rounded-lg" />
    </div>
  );
};

export default Divider;
