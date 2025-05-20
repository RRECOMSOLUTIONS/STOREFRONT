import { Suspense } from "react"
import { listRegions, getRegion } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import User from "@modules/common/icons/user"
import SearchModal from "@modules/layout/components/search-modal"
import SalesOffersBar from "../sales-offers-bar"
import NavMenu from "../nav-menu"
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"

type NavProps = {
  params?: {
    countryCode?: string
  }
}

export default async function Nav({ params = {} }: NavProps) { // Default to empty object!
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  const countryCode = params.countryCode || process.env.NEXT_PUBLIC_DEFAULT_REGION || "dk"

  const region = await getRegion(countryCode)

  if(!region) {
    return null
  }

  const { collections } = await listCollections({ fields: "*products" })
const categories = await listCategories()


  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      
      <SalesOffersBar />

      <header
        className="relative h-16 mx-auto duration-200"
        style={{
          background: "#ff6382",
        }}
      >
        <nav className="content-container txt-xsmall-plus text-white flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full font-twentieth-century">
            <SideMenu regions={regions} categories={categories} collections={collections} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-black uppercase font-twentieth-century"
            >
              RRECOM Solutions
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-black font-twentieth-century"
                href="/account"
              >
                <User size="26" color="white" />
              </LocalizedClientLink>
            </div>

            <div className="hidden small:flex items-center gap-x-6 h-full">
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-black flex gap-2 font-twentieth-century"
                  href="/cart"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>

            </div>
            {/* Pass countryCode if needed */}
            <SearchModal countryCode={countryCode} region={region}  />

           
          </div>
        </nav>
      </header>

      {/* <NavMenu /> */}
    </div>
  )
}
