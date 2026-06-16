import "./globals.css";
import { Pacifico, Quicksand } from "next/font/google";
import { Toaster } from "react-hot-toast";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
  display: "swap",
});
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata = {
  title: "For Leisha 🌸",
  description: "A little corner of the internet made just for you 💕",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${pacifico.variable} ${quicksand.variable}`}>
      <body className="font-body">
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              borderRadius: "30px",
              background: "#fff",
              color: "#e75a86",
              fontWeight: 600,
              boxShadow: "0 10px 30px rgba(231,90,134,.25)",
            },
          }}
        />
      </body>
    </html>
  );
}
