import styles from "@frontend/styles/main.module.css";
import React from "react";
import Image from "next/image";
import { Funnel_Display } from "next/font/google";

const funelDisplay = Funnel_Display({
  weight: "400",
  style: "normal",
  variable: "--font-funnel-display",
  subsets: ["latin"],
});
export const metadata = {
  title: "Skydevs Weather Service",
  description: "Skydevs Weather Service",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="main" className={`${funelDisplay.className} ${styles.main}`}>
        {" "}
        {children}
        <footer
          id="footer"
          className={`${funelDisplay.className} ${styles.footer}`}
        >
          <div className="text-center py-4 text-muted">
            Powered by{" "}
            <a
              className="me-3 pe-3 text-center"
              href="https://www.weatherapi.com/"
              title="Free Weather API"
            >
              WeatherAPI.com
            </a>
            <Image
              priority={true}
              src="https://cdn.weatherapi.com/v4/images/weatherapi_logo.png"
              alt="Weather data by WeatherAPI.com"
              width={120}
              height={40}
            />
          </div>
        </footer>
      </body>
    </html>
  );
}
