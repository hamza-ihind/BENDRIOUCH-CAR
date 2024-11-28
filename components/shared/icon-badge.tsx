import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon } from "@radix-ui/react-select";

const backgroundVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-orange-500/20",
        success: "bg-emerald-500/20",
      },
      size: {
        default: "p-3",
        sm: "p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-orange-500",
      success: "text-emerald-500",
    },
    size: {
      default: "h-6 w-6",
      sm: "h-3 w-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type backgroundVariantsProps = VariantProps<typeof backgroundVariants>;

type iconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends backgroundVariantsProps, iconVariantsProps {
  icon: LucideIcon;
}

export const IconBadge = ({ icon: Icon, variant, size }: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  );
};
