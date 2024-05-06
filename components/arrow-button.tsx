import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

export const ArrowButton = ({
  isExpanded,
  onClick,
}: {
  isExpanded: boolean;
  onClick?: () => void;
}) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      type="button"
      className="rounded-full transition duration-300 p-1 h-6"
    >
      <ChevronDown
        className={cn(
          "transition duration-500 size-4",
          isExpanded && "rotate-180"
        )}
      />
    </Button>
  );
};
