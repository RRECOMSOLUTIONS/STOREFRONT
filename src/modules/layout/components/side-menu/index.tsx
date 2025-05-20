"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"
import Hamburger from "@modules/common/icons/hamburger"

const SideMenuItems = {
  // Home: "/",
  Store: "/store",
  Account: "/account",
  Cart: "/cart",
}

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  categories: any[] // listCategories data
  collections: any[] // listCollections data
}

const SideMenu = ({ regions, categories, collections }: SideMenuProps) => {
  const toggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                >
                  <Hamburger size="24" color="currentColor" />
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
                <PopoverPanel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 text-sm text-ui-fg-on-color m-2 backdrop-blur-2xl">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-[rgba(255,99,130,0.5)] rounded-rounded justify-between p-11 overflow-y-auto custom-scrollbar"
                  >
                    <div className="flex justify-end" id="xmark">
                      <button data-testid="close-menu-button" onClick={close}>
                        <XMark />
                      </button>
                    </div>
                    <ul className="flex flex-col gap-2 items-start justify-start">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="text-xl leading-8 hover:text-ui-fg-disabled"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        )
                      })}

                      {categories && categories.length > 0 && (
                        <li className="mt-4">
                          <span className="text-lg font-semibold mb-2 block text-white">Categories</span>
                          <ul className="flex flex-col gap-4">
                            {categories.map((cat) => {
                              if (cat.parent_category) return null
                              const children = cat.category_children || []

                              return (
                                <li key={cat.id}>
                                  <LocalizedClientLink
                                    href={`/categories/${cat.handle}`}
                                    className="font-medium hover:text-ui-fg-disabled"
                                    onClick={close}
                                  >
                                    {cat.name}
                                  </LocalizedClientLink>

                                  {/* Child categories */}
                                  {children.length > 0 && (
                                    <ul className="ml-4 mt-2 flex flex-col gap-2">
                                      {children.map((child: { id: string; handle: string; name: string }) => (
                                        <li key={child.id}>
                                          <LocalizedClientLink
                                            href={`/categories/${child.handle}`}
                                            className="text-sm hover:text-ui-fg-disabled"
                                            onClick={close}
                                          >
                                            {child.name}
                                          </LocalizedClientLink>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              )
                            })}
                          </ul>
                        </li>
                      )}

                      {/* Collections */}
                      {collections && collections.length > 0 && (
                        <li className="mt-4">
                          <span className="text-lg font-semibold mb-2 block text-white">Collections</span>
                          <ul className="flex flex-col gap-4">
                            {collections.map((col) => (
                              <li key={col.id}>
                                <LocalizedClientLink
                                  href={`/collections/${col.handle}`}
                                  className="font-medium hover:text-ui-fg-disabled"
                                  onClick={close}
                                >
                                  {col.title}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}
                    </ul>
                    <div className="flex flex-col gap-y-6">
                      <div
                        className="flex justify-between"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <Text className="flex justify-between txt-compact-small">
                        © {new Date().getFullYear()} RRECOM Solutions. All rights
                        reserved.
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
