import Image from "next/image";

interface NavItemProps {
  text: string;
  image: string;
}

const NavItem: React.FC<NavItemProps> = ({ text, image }) => {
  return (
    <div className="flex gap-5 px-3 py-2 items-center text-lg font-medium rounded-lg transition-all duration-300 hover:bg-gray-50 text-gray-700">
      <Image src={image} alt="search" width={32} height={32} />
      {text}
    </div>
  );
};

export default NavItem;
