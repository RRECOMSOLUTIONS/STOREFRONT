import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "RRECOM Solutions Store",
  description:
    "A performant ecommerce store template by RRECOM Solutions.",
}

// Function to fetch collections from the API
async function fetchCollections() {
  const backendUrl = process.env.MEDUSA_BACKEND_URL
  const publishableApiKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

  if (!backendUrl || !publishableApiKey) {
    console.error("Missing required environment variables: MEDUSA_BACKEND_URL or NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY")
    return null
  }

  try {
    const response = await fetch(`${backendUrl}/store/collections`, {
      method: "GET",
      headers: {
        "x-publishable-api-key": publishableApiKey,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch collections: ${response.statusText}`)
    }

    const data = await response.json()
    // Assuming the API returns { collections: [...] }
    return data.collections
  } catch (error) {
    console.error("Error fetching collections:", error)
    return null
  }
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)
  const collections = await fetchCollections()

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="py-12"   style={{
          background: "linear-gradient(to right, #fff5e4, #ffffff, #fff5e4)",
        }}>
           <h2 className="text-3xl-regular font-bold text-center text-gray-800 mb-8 font-twentieth-century">
          Our Featured Collections
        </h2>
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}