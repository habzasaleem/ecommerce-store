import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/CartContext";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";
// keep any other imports you already have here (globals-addition.css, fonts, etc.)

export const metadata = {
  title: "Dazzle",
  description: "Every Style. Every You.",
  // keep the rest of your existing metadata here if you have more
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  );
}