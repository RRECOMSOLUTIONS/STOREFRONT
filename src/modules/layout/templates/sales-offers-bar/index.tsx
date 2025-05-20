"use client"

import React from "react"

const salesOffers = [
  "30% OFF on Dresses!",
  "Flat ₹300 OFF on T-Shirts!",
  "Free Handbag on orders over ₹2000!",
  "Buy 2 Get 1 Free on Jeans!",
]

const SalesOffersBar: React.FC = () => {
  return (
    <div className="bg-white h-auto py-2 border-b border-gray-200">
      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 px-2 md:px-4">
        {salesOffers.map((offer, index) => (
          <React.Fragment key={index}>
            <span className="text-[#ff4a6e] font-bold text-xs md:text-sm flex items-center text-center">
              {offer}
            </span>
            {/* Vertical Pink Line Separator - hide after last item */}
            {index !== salesOffers.length - 1 && (
              <span
                className="bg-[#ff4a6e] mx-2 md:mx-3"
                style={{ width: "2px", height: "16px" }}
              ></span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default SalesOffersBar
