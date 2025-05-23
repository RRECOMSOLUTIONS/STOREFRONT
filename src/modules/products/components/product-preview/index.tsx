"use client"

import { Button, Select, Text } from "@medusajs/ui"
import { useRouter, useParams } from "next/navigation"
import { useState, useMemo, useEffect } from "react"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons"
import { addToCart } from "@lib/data/cart"
import { useCart } from "@lib/hooks/use-cart"
import { isEqual } from "lodash"

export default function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({ product })
  const router = useRouter()
  const countryCode = useParams().countryCode as string

  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | undefined>()
  const [isAdding, setIsAdding] = useState(false)
  const [localQuantities, setLocalQuantities] = useState<Record<string, number>>({})
  const { cart } = useCart()
  const [isSingleVariantInCart, setIsSingleVariantInCart] = useState<boolean>(false)

  // console.log(`cart`, cart)
  const singleVariant = product.variants?.length === 1 ? product.variants[0] : null

  const inStock = singleVariant &&
    (!singleVariant.manage_inventory ||
      singleVariant.allow_backorder ||
      (singleVariant.inventory_quantity ?? 0) > 0)
      

     
      
  const optionTitle = product.options?.[0]?.title
  const optionId = product.options?.[0]?.id

  const variantsWithSingleOption = useMemo(() => {
    if (product.options?.length === 1) {
      return (
        product.variants
          ?.filter((variant) => {
            const inStock =
              !variant.manage_inventory ||
              variant.allow_backorder ||
              (variant.inventory_quantity ?? 0) > 0
  
            return inStock
          })
          .map((variant) => {
            const option = variant.options?.find((opt) => opt.option_id === optionId)
            return option
              ? {
                  value: option.value,
                  label: option.value,
                  variant,
                }
              : null
          })
          .filter((v) => !!v) || []
      )
    }
    return []
  }, [product.variants, product.options, optionId])
  

  const selectedVariant = useMemo(() => {
    return variantsWithSingleOption.find(v => v.value === selectedOption)?.variant
  }, [selectedOption, variantsWithSingleOption])

  const selectedInStock = selectedVariant &&
    (!selectedVariant.manage_inventory ||
      selectedVariant.allow_backorder ||
      (selectedVariant.inventory_quantity ?? 0) > 0)

      const cartItem = cart?.items?.find(
        (item) => item.variant_id === singleVariant?.id
      )
      const isInCart = !!cartItem
      const cartQuantity = cartItem?.quantity ?? 0
      
      const selectedVariantCartItem = cart?.items?.find(
        (item) => item.variant_id === selectedVariant?.id
      )
      const selectedVariantInCart = !!selectedVariantCartItem
      const selectedVariantQuantity = selectedVariantCartItem?.quantity ?? 0

      const isSelectedVariantInCart =
  selectedVariant &&
  (localQuantities[selectedVariant.id] ?? selectedVariantQuantity) > 0

      
      
      const handleAddToCartClick = async (variant: HttpTypes.StoreProductVariant) => {
        const cartItem = cart?.items?.find(item => item.variant_id === variant.id)
        const currentQty = cartItem?.quantity ?? 0
      
        setIsAdding(true)
        await addToCart({
          variantId: variant.id,
          quantity: currentQty + 1,
          countryCode,
        })
        setIsAdding(false)
        setIsSingleVariantInCart(true) // ✅ update local state immediately
      }
      
      const handleToggleVariantInCart = async (variant: HttpTypes.StoreProductVariant) => {
        const variantId = variant.id
      
        const currentQty =
          localQuantities[variantId] ??
          cart?.items?.find((item) => item.variant_id === variantId)?.quantity ??
          0
      
          console.log(`before currentQty`, currentQty)

        const newQty = currentQty > 0 ? currentQty - 1 : 1 // decrease if exists, otherwise add
      
        setIsAdding(true)
      
        console.log(`currentQty`, currentQty)
        console.log(`newQty`, newQty)
        const response = await addToCart({
          variantId,
          quantity: newQty,
          countryCode,
        })
      
        console.log(`response`, response)
        setLocalQuantities((prev) => ({
          ...prev,
          [variantId]: newQty,
        }))
      
        setIsAdding(false)
      }
      

  const handleAddToWishlist = () => {
    console.log("Wishlist Clicked:")
    console.log("Product Title:", product.title)
    console.log("Product ID:", product.id)
    setIsWishlisted((prev) => !prev)
  }



useEffect(() => {
  if (singleVariant && cart?.items?.length) {
    const alreadyInCart = cart.items.some(
      (item) => item.variant_id === singleVariant.id
    )
    if (alreadyInCart) {
      setIsSingleVariantInCart(true)
    }
  }
}, [cart, singleVariant])


  console.log(`isInCart`, isInCart)
  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper">
      <Thumbnail
  thumbnail={product.thumbnail}
  images={product.images}
  size="full"
  isFeatured={isFeatured}
>
{singleVariant && inStock && (
  <Button
    variant="transparent"
    size="small"
    // disabled={isSingleVariantInCart}
    className={`text-xs px-2 py-1 rounded shadow-sm transition-colors duration-200 ${
      isSingleVariantInCart
        ? "bg-red-500 text-white hover:bg-red-500"
        : "bg-transparent text-white hover:text-red-500"
    }`}    
    onClick={(e) => {
      e.preventDefault()
      e.stopPropagation()
      if (!isSingleVariantInCart) {
        handleAddToCartClick(singleVariant)
      }
    }}
    isLoading={isAdding}
  >
    <FontAwesomeIcon icon={faShoppingCart} className="w-3 h-3 mr-1" />
    {isSingleVariantInCart ? (
      <span className="text-xs font-semibold">x{cartQuantity === 0 ? 1 : cartQuantity}</span>
    ) : (
      <span className="text-xs font-semibold"></span>
    )}
  </Button>
)}


  <Button
    variant="transparent"
    className="p-2 rounded-full bg-transparent"
    onClick={(e) => {
      e.preventDefault()
      e.stopPropagation()
      handleAddToWishlist()
    }}
  >
    <FontAwesomeIcon
      icon={faHeart}
      className={`w-4 h-4 drop-shadow transition-colors duration-200 ${
        isWishlisted ? "text-red-500 hover:text-white" : "text-white hover:text-red-500"
      }`}
    />
  </Button>
</Thumbnail>


        <div className="flex txt-compact-medium mt-4 justify-between">
          <Text className="text-black font-twentieth-century" data-testid="product-title">
            {product.title}
          </Text>
          <div className="flex items-center gap-x-2 font-twentieth-century">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>


        {/* Dropdown if multiple variants with a single option */}
        {variantsWithSingleOption.length > 1 && (
  <div className="flex items-center mt-2 gap-2">
    <div className="w-1/2">
      <Select value={selectedOption} onValueChange={(val) => setSelectedOption(val)}>
        <Select.Trigger className="w-full">
          <Select.Value placeholder={`Select ${optionTitle ?? "Option"}`} />
        </Select.Trigger>
        <Select.Content>
          {variantsWithSingleOption.map(({ value }) => (
            <Select.Item key={value} value={value!}>
              {value}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>

    <div className="w-1/2">
    <Button
  onClick={(e) => {
    e.preventDefault()
    e.stopPropagation()
    if (selectedVariant && !isSelectedVariantInCart) {
      handleToggleVariantInCart(selectedVariant)
    }
  }}
  disabled={!selectedVariant || !selectedInStock}
  isLoading={isAdding}
  variant={isSelectedVariantInCart ? "secondary" : "primary"}
  className={`flex items-center justify-center gap-2 ${
    isSelectedVariantInCart ? "bg-red-500 text-white hover:bg-red-500" : ""
  }`}
>
  <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" />
  <span>
    {isSelectedVariantInCart
      ? `x${localQuantities[selectedVariant.id] ?? selectedVariantQuantity}`
      : "Add"}
  </span>
</Button>

</div>

  </div>
)}

      </div>
    </LocalizedClientLink>
  )
}
