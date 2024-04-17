"use client";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "redirect" | "modal";
    asChild?: boolean;
    className: string;
}

export const LoginButton = ({
    children,
    mode = "redirect",
    asChild,
    className
}: LoginButtonProps) => {
    const onClick = () => {
        console.log("loggin button clicked")
    }

    return (
        <div onClick={onClick} className={className}>
            {children}
        </div>
    )
}