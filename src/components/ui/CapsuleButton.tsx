import React from 'react';

// actually create-next-app default template often doesn't have lib/utils. 
// I will adhere to standard Tailwind classes first or create the utility.
// For now, I'll assume no clsx/tailwind-merge installed unless I installed them? I didn't.
// So I will use template literals.

interface CapsuleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    icon?: React.ReactNode;
}

export function CapsuleButton({
    children,
    className,
    variant = 'primary',
    icon,
    ...props
}: CapsuleButtonProps) {

    const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-[0_4px_14px_0_rgba(84,101,255,0.39)]",
        secondary: "bg-brand-lavender text-brand-black hover:bg-brand-lavender/90",
        outline: "border-2 border-brand-white/20 text-brand-white hover:bg-brand-white/10",
        ghost: "text-brand-white/60 hover:text-brand-white hover:bg-brand-white/5"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className || ''}`}
            {...props}
        >
            <span className="flex items-center gap-2">
                {children}
                {icon && <span className="bg-brand-black/20 text-current p-1 rounded-full">{icon}</span>}
            </span>
        </button>
    );
}
