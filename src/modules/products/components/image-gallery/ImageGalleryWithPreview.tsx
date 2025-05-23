"use client"

import { useState } from "react"
import ImageGallery from "@modules/products/components/image-gallery"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { X } from "lucide-react"

type ImageGalleryWithPreviewProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGalleryWithPreview = ({ images }: ImageGalleryWithPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const openModal = (index: number) => {
    setSelectedIndex(index)
    setIsOpen(true)
  }

  const closeModal = () => setIsOpen(false)

  return (
    <>
      <ImageGallery images={images} onImageClick={openModal} />

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex">
          {/* Thumbnails */}
          <div className="w-[100px] overflow-y-auto flex flex-col gap-2 p-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`relative aspect-[3/4] w-full cursor-pointer rounded-md border ${
                  index === selectedIndex
                    ? "border-white"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedIndex(index)}
              >
                <Image
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          </div>

          {/* Main preview */}
          <div className="flex-1 flex items-center justify-center relative">
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full"
              onClick={closeModal}
            >
              <X size={24} />
            </button>
            <div className="relative max-w-4xl w-full aspect-video">
              <Image
                src={images[selectedIndex].url}
                alt={`Image ${selectedIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ImageGalleryWithPreview
