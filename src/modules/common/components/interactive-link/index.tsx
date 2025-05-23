import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "../localized-client-link"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className="flex gap-x-1 items-center group text-base-regular"
      href={href}
      onClick={onClick}
      style={{ "--link-color": "#ee6983" } as React.CSSProperties}
      {...props}
    >
     <Text style={{ color: "var(--link-color)" }}>{children}</Text>
      <ArrowUpRightMini
        className="group-hover:rotate-45 ease-in-out duration-150"
        style={{ color: "var(--link-color)" }}
      />
    </LocalizedClientLink>
  )
}

export default InteractiveLink
