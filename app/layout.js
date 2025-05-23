import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "prismjs/themes/prism-twilight.css"
// import "./prism.css"
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { AppContextProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DebAi : Your personal AI assistant",
  description: "DebAi is a personal AI assistant that helps you with your tasks.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AppContextProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider>
                <AppSidebar />
                <div className="flex flex-1 flex-col overflow-hidden">
                  <Navbar />
                  {children}
                  <Toaster />
                </div>
              </SidebarProvider>
            </ThemeProvider>
          </body>
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
