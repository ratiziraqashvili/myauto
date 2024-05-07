import { cn } from "@/lib/utils";

export const FormHeadingContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={cn("border-b flex justify-between px-6 py-5", className)}>
            {children}
        </div>
    )
}