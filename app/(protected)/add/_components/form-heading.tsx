import { LucideIcon } from "lucide-react";

interface FormHeadingProps {
  icon: LucideIcon;
  label: string;
}

export const FormHeading = ({ icon: Icon, label }: FormHeadingProps) => {
  return (
    <div className="flex gap-4 items-center">
      <Icon className="size-5 text-gray-800" />
      <h1 className="text-[0.95rem] tracking-wide text-gray-800">{label}</h1>
    </div>
  );
};
