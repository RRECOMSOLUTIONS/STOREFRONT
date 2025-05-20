import { Button, Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"

export default function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  console.log("product", product)
  console.log("cheapestPrice", cheapestPrice)
  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />
   {/* <Thumbnail
  thumbnail={product.thumbnail}
  images={product.images}
  size="medium"
  isFeatured={isFeatured}
  percentageDiff={
    cheapestPrice?.price_type === "sale"
      ? Number(cheapestPrice.percentage_diff)
      : undefined
  }
/> */}


        <div className="flex txt-compact-medium mt-4 justify-between">
          <Text className="text-black font-twentieth-century" data-testid="product-title">
            {product.title}
          </Text>
          <div className="flex items-center gap-x-2 font-twentieth-century">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
               </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
