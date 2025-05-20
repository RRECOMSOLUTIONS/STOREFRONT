import React from "react"
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import ChatFooter from "./chat-footer"

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { countryCode?: string }
}) => {
  const countryCode = params.countryCode || process.env.NEXT_PUBLIC_DEFAULT_REGION || "dk"

  return (
    <div>
      <Nav params={{ countryCode }} />
      <main className="relative">{children}</main>
      <ChatFooter />
      <Footer />
    </div>
  )
}

export default Layout
