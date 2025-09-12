import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-t border-border bg-background">
            <div className="container mx-auto px-6 flex flex-col py-4 items-center md:flex-row md:justify-between">
                <p className="text-sm text-muted-foreground">&copy; 2025 CodifyQR. Built with Next.js and Tailwind CSS.</p>
                <div className="flex flex-row justify-center gap-4 text-sm">
                    <Link
                        href="/terms"
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        Terms & Conditions
                    </Link>

                    <Link
                        href="/policy"
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
}