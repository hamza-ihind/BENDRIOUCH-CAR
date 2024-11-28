import React, { useState } from "react";

interface DropdownItemProps {
  label: string;
  description?: string;
  onSelect: (label: string) => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  label,
  description,
  onSelect,
}) => (
  <div
    className="flex px-1.5 py-0.5 items-center"
    onClick={() => onSelect(label)}
  >
    <div className="desc-text text-black">{label}</div>
    {description && <div className="desc-text text-black">{description}</div>}
  </div>
);

interface DropdownProps {
  trigger: React.ReactNode;
  items: { label: string; description?: string }[];
  onTagSelect: (tag: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, items, onTagSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (label: string) => {
    closeDropdown();
    onTagSelect(label);
  };

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className={`dropdown relative ${isOpen ? "open" : ""}`}>
      <div className="dropdown-trigger cursor-pointer" onClick={toggleDropdown}>
        {trigger}
      </div>
      {isOpen && (
        <div className="flex px-2 py-1 flex-col items-start">
          {items.map((item) => (
            <DropdownItem
              key={item.label}
              label={item.label}
              onSelect={handleSelect}
              description={item.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
