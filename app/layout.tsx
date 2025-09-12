import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import { manrope, spaceMono } from "@/lib/font";
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codify QR - Free QR Code Generator",
  description: "Generate high-quality QR codes effortlessly. Customize designs, track scans, and enhance your brand presence with Codify QR.",
  icons: {
    icon: "/favicon.svg", // main favicon
    shortcut: "/favicon.svg", // browser shortcuts
    apple: "/favicon.svg", // iOS PWA / Safari
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${spaceMono.variable} antialiased`}>
        <GoogleAnalytics gaId="GTM-KR5RWMPW" />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false} storageKey="codifyqr-theme">
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow bg-muted">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
