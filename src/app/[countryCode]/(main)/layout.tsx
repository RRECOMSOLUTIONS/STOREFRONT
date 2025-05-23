import { Metadata } from "next"

import { listCartOptions, retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getBaseURL } from "@lib/util/env"
import { StoreCartShippingOption } from "@medusajs/types"
import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner"
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  let customer = null
  let cart = null
  let shippingOptions: StoreCartShippingOption[] = []

  const countryCode = process.env.NEXT_PUBLIC_DEFAULT_REGION || "dk"

  try {
    customer = await retrieveCustomer()
  } catch (error) {
    console.error("Error retrieving customer:", error)
  }

  try {
    cart = await retrieveCart()
  } catch (error) {
    console.error("Error retrieving cart:", error)
  }

  if (cart) {
    try {
      const { shipping_options } = await listCartOptions()

      console.log("Shipping options:", shipping_options)
      shippingOptions = shipping_options
    } catch (error) {
      console.error("Error retrieving shipping options:", error)
    }
  }

  return (
    <>
      <Nav params={{ countryCode }} />
      {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart} />
      )}

      {cart && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions}
        />
      )}
      {props.children}
      <Footer />
    </>
  )
}
