import { Figtree } from "next/font/google";
import "@/styles/globals.css";
import { Metadata } from "next";
import CustomCursor from "@/components/animation/custom-cursor";

const figTreeSans = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://tubelight-theta.vercel.app"),

  title: {
    default: "TubeLight – Smart Video Platform",
    template: "%s | TubeLight"
  },

  description: "Discover high-quality videos crafted for you.",

  keywords: [
    "TubeLight",
    "video platform",
    "video hosting",
    "streaming app",
    "video player",
    "modern ui"
  ],

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/logo.svg",
        color: "#0090E4"
      }
    ]
  },

  openGraph: {
    title: "TubeLight – Smart Video Platform",
    description: "Watch, upload and manage videos on the fast and sleek TubeLight platform.",
    url: "https://tubelight-theta.vercel.app",
    siteName: "TubeLight",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "TubeLight Preview"
      }
    ],
    locale: "en_US",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "TubeLight – Smart Video Platform",
    description: "A fast, modern and responsive video hosting & streaming experience.",
    images: ["/logo.png"]
  },

  manifest: "/manifest.json",

  robots: {
    index: true,
    follow: true
  },

  alternates: {
    canonical: "https://tubelight-theta.vercel.app"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figTreeSans.variable} ${figTreeSans.className} antialiased`}
      >
        <CustomCursor />

        {children}
      </body>
    </html>
  );
}
