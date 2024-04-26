import { cn } from "@/lib/utils";

interface FormContainerProps {
    className: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const FormContainer = ({ className, children, onClick }: FormContainerProps) => {
   return (
        <div onClick={onClick} className={cn("bg-white rounded-xl shadow-md", className)}>
            {children}
        </div>
   ) 
}

export default FormContainer;