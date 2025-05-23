// lib/hooks/use-cart.ts
"use client"

import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { retrieveCart } from "@lib/data/cart"

export function useCart() {
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(null)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await retrieveCart()
        setCart(cartData)
      } catch {
        setCart(null)
      }
    }

    fetchCart()
  }, [])

  return { cart }
}
