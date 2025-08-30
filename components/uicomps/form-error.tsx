import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-x-3 text-sm text-red-700 dark:text-red-400">
      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
        <ExclamationTriangleIcon className="h-3 w-3 text-white" />
      </div>
      <p className="font-medium">{message}</p>
    </div>
  );
};
