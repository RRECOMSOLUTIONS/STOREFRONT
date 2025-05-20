import { listProducts } from "@lib/data/products";
import { HttpTypes } from "@medusajs/types";
import { Text, Button } from "@medusajs/ui";

import InteractiveLink from "@modules/common/components/interactive-link";
import ProductPreview from "@modules/products/components/product-preview";
import Link from "next/link";

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection;
  region: HttpTypes.StoreRegion;
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  });

  if (!pricedProducts || pricedProducts.length === 0) {
    return null;
  }

  const displayedProducts = pricedProducts.slice(0, 4);
  const showViewAll = pricedProducts.length > 4;

  return (
    <section className="content-container py-12 small:py-24">
      {/* Section Header */}
      <header className="flex flex-col small:flex-row justify-between items-start small:items-center mb-8">
        <div>
          <Text className="txt-xlarge font-twentieth-century font-semibold">
            {collection.title}
          </Text>
          <p className="mt-2 text-md text-gray-600 font-twentieth-century">
            Discover our finest selection of ethnic and contemporary clothing,
            crafted with care and elegance to reflect the beauty of Indian traditions.
          </p>
        </div>
      </header>

      {/* Product List */}
      <ul className="grid grid-cols-2 small:grid-cols-3 large:grid-cols-4 gap-x-6 gap-y-24 small:gap-y-36">
        {displayedProducts.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}

        {showViewAll && (
          <li className="flex items-center justify-center">
            <Link href={`/collections/${collection.handle}`}>
              <Button className="bg-[#ff6382] text-white rounded-none px-6 py-2">
                View all products
              </Button>
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
}
