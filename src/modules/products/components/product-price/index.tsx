import { clx } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  const isSale = selectedPrice.price_type === "sale"

  return (
    <div className="flex items-center flex-wrap gap-2 text-ui-fg-base">
      {/* Main price */}
      <span
        className={clx("text-2xl font-semibold", {
          "text-black": isSale,
        })}
        data-testid="product-price"
        data-value={selectedPrice.calculated_price_number}
      >
        {!variant && "From "}
        {selectedPrice.calculated_price}
      </span>

      {/* Original price (if on sale) */}
      {isSale && (
        <span
          className="text-lg line-through text-gray-400"
          data-testid="original-product-price"
          data-value={selectedPrice.original_price_number}
        >
          {selectedPrice.original_price}
        </span>
      )}

      {/* Discount badge (if on sale) */}
      {isSale && (
        <span className="text-red-600 text-sm font-medium rounded-full">
          -{selectedPrice.percentage_diff}%
        </span>
      )}
    </div>
  )
}
