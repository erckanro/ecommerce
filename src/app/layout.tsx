import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "E-Commerce",
  description: "Demo project with Next.js and Redux",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="w-full mx-auto">{children}</main>
          <div id="modal-root" />
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
