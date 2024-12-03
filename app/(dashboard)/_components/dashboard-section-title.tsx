import { IconBadge } from "@/components/shared/icon-badge";
import { LucideIcon } from "lucide-react";
import React from "react";

interface DashboardPageTitleProps {
  icon: LucideIcon;
  title: string;
}

const DashboardSectionTitle = ({ icon, title }: DashboardPageTitleProps) => {
  return (
    <div className="flex items-center gap-4 mb-8 max-sm:flex-col max-sm:items-start">
      <IconBadge icon={icon} />
      <h2 className="font-bold max-md:font-semibold text-black dark:text-white text-3xl">
        {title}
      </h2>
    </div>
  );
};

export default DashboardSectionTitle;
