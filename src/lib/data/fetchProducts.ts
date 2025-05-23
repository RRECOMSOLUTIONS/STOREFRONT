// @lib/data/fetchProducts.ts
import { listProducts } from "@lib/data/products"
import { FindParams, StoreProductParams } from "@medusajs/types"

// Extend the query params type to include 'q' for search
interface SearchQueryParams extends FindParams, StoreProductParams {
  q?: string // Add the search query parameter
}

export const fetchProductsForSearch = async (
  searchTerm: string,
  countryCode: string
) => {
  try {
    const result = await listProducts({
      pageParam: 1,
      queryParams: {
        q: searchTerm.trim() || "",
        limit: 12,
      } as SearchQueryParams, // Type assertion with our custom interface
      countryCode: countryCode,
    })

    console.log("SearchModal result:", result)
    return result.response.products
  } catch (err) {
    console.error("Failed to fetch products:", err)
    return []
  }
}