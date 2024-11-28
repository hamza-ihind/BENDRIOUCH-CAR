import Image from "next/image";

interface FeatureProps {
  icon: string;
  title: string;
  desc: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, desc }) => {
  return (
    <div
      key={title}
      className="flex flex-col items-center justify-start max-w-[450px]"
    >
      <div className="flex p-3 h-16 w-16 border dark:border-white border-black rounded-[50%] items-center justify-center">
        <Image src={icon} alt={icon} height={32} width={32} />
      </div>
      <p className="text-gray-900 dark:text-white text-center text-xl font-medium mt-5">
        {title}
      </p>
      <p className="desc-text mt-2">{desc}</p>
    </div>
  );
};

export default Feature;
