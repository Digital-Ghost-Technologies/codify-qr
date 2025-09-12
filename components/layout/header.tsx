import ThemeToggle from "@/components/ui/theme-toggle";
import { Heart, QrCode } from "lucide-react";
import Link from "next/link";

export function Header() {
    return (
        <header className="w-full border-b border-border bg-background ">
            <div className="container mx-auto flex h-16 items-center p-6 space-x-4 sm:space-x-6 md:space-x-10">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-2xl font-extrabold">Codify</span>
                    <div className="p-1 bg-gradient-to-br from-indigo-500 to-indigo-800 rounded-lg shadow-sm">
                        <QrCode className="h-7 w-7 text-primary-foreground" strokeWidth={1.33} />
                    </div>
                </Link>
                <nav className="ml-auto flex items-center space-x-2">
                    <ThemeToggle />
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span>Made with</span>
                        <Heart className="h-4 w-4 text-rose-600" />                    </div>
                </nav>
            </div>
        </header>
    );
}