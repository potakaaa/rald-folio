import { gallery } from "@/data/portfolio"
import type { GalleryImage } from "@/data/portfolio"
import { getCloudinaryImageUrl, getCloudinarySrcSet } from "@/lib/cloudinary"
import { Section } from "../shared/section"

const galleryTileClasses: Record<GalleryImage["orientation"], string> = {
  landscape: "col-span-2",
  portrait: "row-span-2",
  square: "",
}

export function GallerySection() {
  return (
    <Section
      id="gallery"
      eyebrow="Creative"
      title="Gallery studies."
      description="Visual work that shows taste, composition, and the creative range I bring to product and brand experiences."
    >
      <div className="grid auto-rows-[9rem] grid-cols-2 grid-flow-dense gap-3 sm:auto-rows-[12rem] lg:grid-cols-4 lg:auto-rows-[14rem]">
        {gallery.map((image) => (
          <figure
            key={image.src}
            tabIndex={0}
            className={`group relative min-h-0 overflow-hidden bg-muted outline-none ${galleryTileClasses[image.orientation]}`}
          >
            <img
              src={getCloudinaryImageUrl(image.src, 720)}
              srcSet={getCloudinarySrcSet(image.src, [320, 480, 720, 900])}
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt={image.alt}
              className="size-full object-cover transition duration-500 ease-standard group-hover:scale-105 group-hover:blur-sm group-focus-visible:scale-105 group-focus-visible:blur-sm"
              loading="lazy"
            />
            <figcaption className="absolute inset-0 flex items-center justify-center bg-black/20 px-5 text-center text-sm font-medium text-white opacity-0 transition-opacity duration-300 ease-standard group-hover:opacity-100 group-focus-visible:opacity-100">
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
