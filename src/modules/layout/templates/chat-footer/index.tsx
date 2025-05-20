"use client"
import { useState } from "react"
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaTimes } from "react-icons/fa"
import ContactUsIcon from "@modules/common/icons/contact-us-icon"

export default function ContactToggle() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOptions = () => setIsOpen(!isOpen)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Toggle Options */}
      {isOpen && (
        <div className="flex flex-col items-end gap-1 transition-all duration-300 ease-in-out">
          {/* WhatsApp */}
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-white text-green-500 shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] border border-green-500 transition-all"
            aria-label="WhatsApp"
          >
            <FaWhatsapp size={30} />
          </a>

          {/* Phone */}
          <a
            href="tel:+1234567890"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-white text-blue-500 shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] border border-blue-500 transition-all"
            aria-label="Phone"
          >
            <FaPhoneAlt size={22} />
          </a>

          {/* Email */}
          <a
            href="mailto:info@example.com"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-white text-yellow-500 shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] border border-yellow-500 transition-all"
            aria-label="Email"
          >
            <FaEnvelope size={22} />
          </a>
        </div>
      )}

      {/* Main Contact Button */}
      <button
        onClick={toggleOptions}
        className={`flex items-center justify-center w-14 h-14 rounded-full transition-all ${
          isOpen ? 'bg-white' : 'bg-[#ff4a6e]'
        } shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]`}
        aria-label="Contact Options"
      >
        {isOpen ? (
          <FaTimes size={20} color="red" />
        ) : (
          <ContactUsIcon size="36" color="#fff" />
        )}
      </button>
    </div>
  )
}
