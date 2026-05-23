import { Orbitron, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-mono-cyber",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Sagar Dahal | Information Security Consultant & Red Teamer",
  description: "Interactive portfolio of Sagar Dahal, a Certified Red Team Professional (CRTP) specializing in web/API penetration testing, Active Directory security, systems auditing, and code security.",
  keywords: ["Sagar Dahal", "Cybersecurity", "Red Team", "CRTP", "Penetration Testing", "Security Consultant", "Active Directory", "Code Audit"],
  authors: [{ name: "Sagar Dahal" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${shareTechMono.variable}`}>
      <head>
        <meta name="theme-color" content="#0a0b0e" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
