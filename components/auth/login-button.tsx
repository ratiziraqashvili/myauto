"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "redirect";
    asChild?: boolean;
    className?: string;
}

export const LoginButton = ({
    children,
    mode = "redirect",
    asChild,
    className
}: LoginButtonProps) => {
    const router = useRouter();

    const onClick = () => {
        router.push("/auth/login");
    }

    return (
        <div onClick={onClick} className={className}>
            {children}
        </div>
    )
}