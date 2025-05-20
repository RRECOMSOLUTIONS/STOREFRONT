import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Utility function
function toTitleCase(str: string) {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  

export default async function NavMenu() {
  const { collections } = await listCollections({ fields: "*products" })
  const productCategories = await listCategories()

  const topCollections = collections.slice(0, 3)
  const remainingCollections = collections.slice(3)

  return (
    <nav className="w-full bg-white shadow-md border-b border-gray-200">
      <div className="content-container flex justify-between items-center py-4 relative">

        {/* ================= Categories Menu ================= */}
        <div className="flex gap-x-6 items-center">
          {productCategories?.length > 0 &&
            productCategories.map((c) => {
              if (c.parent_category) return null // Only parent categories

              const children = c.category_children || []

              return (
                <div key={c.id} className="relative">
                  {/* Parent Category */}
                  <LocalizedClientLink
                    href={`/categories/${c.handle}`}
                    className="font-twentieth-century font-bold text-[#ff6382] relative group hover:text-pink-600"
                  >
                    {toTitleCase(c.name)}
                    {/* Dropdown */}
                    {children.length > 0 && (
                      <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                        <ul className="flex flex-col p-2">
                          {children.map((child) => (
                            <li key={child.id}>
                              <LocalizedClientLink
                                href={`/categories/${child.handle}`}
                                className="block px-4 py-2 text-sm text-[#ff6382] font-twentieth-century hover:bg-gray-100 hover:text-pink-600"
                              >
                                {toTitleCase(child.name)}
                              </LocalizedClientLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </LocalizedClientLink>
                </div>
              )
            })}

          {/* ================= Top 3 Collections Direct ================= */}
          {topCollections.map((collection: any) => (
            <LocalizedClientLink
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="font-twentieth-century font-bold text-[#ff6382] hover:text-pink-600"
            >
              {collection.title}
            </LocalizedClientLink>
          ))}

          {remainingCollections.length > 0 && (
            <div className="relative">
              <span className="font-twentieth-century font-bold text-[#ff6382] cursor-pointer relative group hover:text-pink-600">
                More Collections
                <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                  <ul className="flex flex-col p-2">
                    {remainingCollections.map((c: any) => (
                      <li key={c.id}>
                        <LocalizedClientLink
                          href={`/collections/${c.handle}`}
                          className="block px-4 py-2 text-sm text-[#ff6382] font-twentieth-century hover:bg-gray-100 hover:text-pink-600"
                        >
                          {c.title}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
