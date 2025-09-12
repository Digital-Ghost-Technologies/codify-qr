'use client';

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("codify-theme", newTheme);
    }

    useEffect(() => {
        setMounted(true);
        const storedTheme = localStorage.getItem("codify-theme");
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, [setTheme]);

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" aria-label="Toggle theme" disabled>
                <Sun className="h-5 w-5" />
            </Button>
        );
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            onClick={toggleTheme}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            aria-label="Toggle theme"
        >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
    )
}