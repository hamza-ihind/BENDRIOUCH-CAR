"use client";

import { useState } from "react";

const Toggle = () => {
  const [active, setActive] = useState(false);

  const onToggle = () => {
    setActive(!active);
  };

  return (
    <div
      onClick={onToggle}
      className={`flex rounded-xl w-9 h-5 p-0.5 ${
        active ? "bg-teal-600 justify-end" : "bg-gray-100 justify-start"
      }`}
    >
      <div className="rounded-[50%] bg-white shadow-sm flex-shrink-0 h-4 w-4" />
    </div>
  );
};

export default Toggle;
