"use client"

import { Fragment, useState, useEffect } from "react"
import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { XMark } from "@medusajs/icons"
import { listProducts } from "@lib/data/products"
import { fetchProductsForSearch } from "@lib/data/fetchProducts"
import ProductPreviewSearch from "@modules/products/components/product-preview-search"
import { StoreProduct, StoreRegion } from "@medusajs/types"
import { FaSearch } from "react-icons/fa"

type SearchModalProps = {
    countryCode: string
    region: StoreRegion | null
}

const SearchModal = ({ countryCode,region }: SearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState<StoreProduct[]>([])

//   console.log("SearchModal region:", region)

useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProductsForSearch(searchTerm, countryCode)
        .then((fetchedProducts) => {
          setProducts(fetchedProducts)
        })
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchTerm, countryCode])

  if (!region) {
    return null
  }

  return (
    <Popover className="h-full flex">
      {({ open, close }) => (
        <>
          <div className="relative flex h-full">
            <Popover.Button
              data-testid="nav-search-button"
              className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
            >
              <FaSearch className="w-5 h-5" />
            </Popover.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100 backdrop-blur-2xl"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 backdrop-blur-2xl"
            leaveTo="opacity-0"
          >
            <PopoverPanel className="flex flex-col absolute w-full sm:w-2/3 md:w-1/2 h-[calc(100vh-1rem)] z-30 inset-x-0 text-sm text-ui-fg-on-color backdrop-blur-2xl">
              <div className="flex flex-col h-full bg-[rgba(255,99,130,0.5)] rounded-rounded justify-between p-6">
                <div className="flex justify-end">
                  <button data-testid="close-search-button" onClick={close}>
                    <XMark />
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border p-2 w-full mb-4 text-black"
                />

<div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                {products.length > 0 ? (
                    products.map((product) => (
                      <ProductPreviewSearch
                        key={product.id}
                        product={product}
                        region={region}
                      />
                    ))
                  ) : (
                    <p className="text-white">No products found.</p>
                  )}
                </div>
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default SearchModal
