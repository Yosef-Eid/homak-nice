import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";

const geistSans = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "المختار للأثاث المعدني",
  description: "نوفر لكم أفخم الأثاث المعدني الراقي بتصاميم عصرية وجودة مضمونة.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      style={{direction:"rtl"}}
        className={` ${geistSans.className} antialiased`}
      >
        {children}
        <div className="z-50 absolute left-0 w-full">
          <Footer />
        </div>
      </body>
    </html>
  );
}
