import React from "react"
import { IconProps } from "types/icon"

const ContactUsIcon: React.FC<IconProps> = ({
  size = "24",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      {/* Chat bubble */}
      <path
        d="M4 4H20C21.1046 4 22 4.89543 22 6V14C22 15.1046 21.1046 16 20 16H8L4 20V6C4 4.89543 4.89543 4 6 4Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Eyes */}
      <circle cx="9" cy="10" r="1" fill={color} />
      <circle cx="15" cy="10" r="1" fill={color} />

      {/* Smile */}
      <path
        d="M9 13C9.66667 13.6667 10.6667 14 12 14C13.3333 14 14.3333 13.6667 15 13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ContactUsIcon
