import React from "react"
import { IconProps } from "types/icon"

const ShoppingBagOutline: React.FC<IconProps> = ({
  size = "24",
  color = "#141827",
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
      <path
        d="M6 7L6 6C6 4.34315 7.34315 3 9 3H15C16.6569 3 18 4.34315 18 6V7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 7H21L20 20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20L3 7Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ShoppingBagOutline
