'use client'
import { useState, useRef } from "react"
import Image from "next/image"

type ImageGalleryProps = {
  images: { id: number, url: string }[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [mainImage, setMainImage] = useState(images[0]?.url)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: "50%", y: "50%" })
  const zoomTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomPosition({ x: `${x}%`, y: `${y}%` })

    // Setăm un timeout pentru a activa zoom-ul după o secundă
    zoomTimeoutRef.current = setTimeout(() => {
      setIsZoomed(true)
    }, 500)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isZoomed) {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - left) / width) * 100
      const y = ((e.clientY - top) / height) * 100
      setZoomPosition({ x: `${x}%`, y: `${y}%` })
    }
  }

  const handleMouseLeave = () => {
    if (zoomTimeoutRef.current) {
      clearTimeout(zoomTimeoutRef.current)
      zoomTimeoutRef.current = null
    }
    setIsZoomed(false)
  }

  return (
    <div className="flex flex-col items-start relative">
      <div
        className="relative aspect-[29/34] lg:w-[500px] w-full overflow-hidden bg-ui-bg-subtle mb-4 cursor-zoom-in"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={mainImage}
          priority={true}
          alt="Main product image"
          width={500}
          height={600}  // Setați dimensiuni explicite pentru o mai bună compatibilitate pe mobil
          className="transition-transform duration-500 ease-in-out rounded"
          style={{
            objectFit: "cover",
            width: "100%",  // Adaugăm lățimea 100% pentru a se adapta containerului
            height: "100%",
            transformOrigin: `${zoomPosition.x} ${zoomPosition.y}`,
            transform: isZoomed ? "scale(1.5)" : "scale(1)",
          }}
        />
      </div>

      {/* Thumbnail images */}
      <div className="flex gap-x-4">
        {images.map((image,index) => (
          <div
            key={index}
            onClick={() => setMainImage(image.url)}
            className="cursor-pointer relative aspect-[29/34] w-20 h-20 overflow-hidden bg-ui-bg-subtle"
          >
            <Image
              src={image.url}
              alt={`Thumbnail image ${image?.id}`}
              width={80}
              height={100}
              className="absolute inset-0 rounded"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
