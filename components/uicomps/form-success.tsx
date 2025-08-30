import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-xl flex items-center gap-x-3 text-sm text-green-700 dark:text-green-400">
      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
        <CheckCircledIcon className="h-3 w-3 text-white" />
      </div>
      <p className="font-medium">{message}</p>
    </div>
  );
};
