import Link from "next/link";
import { useEffect, useState } from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const whatsappLink = "https://wa.me/+917337672574";
  const phoneLink = "tel:+917337672574";

  return (
    <div className="fixed bottom-8 right-8 z-[999]">
      <div className="flex flex-col items-center gap-3">
        <Link 
          href={phoneLink}
          className="flex items-center justify-center w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full text-2xl transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
          aria-label="Call us"
        >
          <FaPhoneAlt />
        </Link>
        <Link
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full text-3xl transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp />
        </Link>
      </div>
    </div>
  );
}
