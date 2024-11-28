import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface CTAProps {
  title: string;
  image: string;
  desc: string;
  // href: string;
}

const BigCTA: FC<CTAProps> = ({ title, image, desc }: CTAProps) => {
  return (
    // <Link href={href}>
    <div className="flex items-start gap-3 p-5 rounded-lg border border-solid border-gray-200 bg-white shadow-sm">
      <div className="flex p-3 items-center w-12 h-12 rounded-md border border-solid border-gray-200 bg-white shadow-sm">
        <Image src={image} alt={title} height={32} width={32} />
      </div>
      <div className="flex flex-col items-start gap-0.5">
        <p className="cta-text">{title}</p>
        <p className="desc-text text-base">{desc}</p>
      </div>
    </div>
    // </Link>
  );
};

export default BigCTA;
