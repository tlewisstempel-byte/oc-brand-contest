import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create a Brand With AI | StackDaily x Open Campus",
  description: "Get a brief. Make it yours. Win $500."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
