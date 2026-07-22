import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import Header from "@/app/components/Header";
import Footer from "@/app/components/footer";

export const metadata: Metadata = {
  title: "Saturday Workshop",
  description: "We're here to help you succeed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <Header />
          <main style={{ paddingTop: "65px" }}>{children}</main>
          <Footer />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
