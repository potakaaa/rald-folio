const CLOUDINARY_UPLOAD_PATH = "/image/upload/"

export function getCloudinaryImageUrl(src: string, width: number) {
  try {
    const url = new URL(src)

    if (url.hostname !== "res.cloudinary.com" || !url.pathname.includes(CLOUDINARY_UPLOAD_PATH)) {
      return src
    }

    url.pathname = url.pathname.replace(
      CLOUDINARY_UPLOAD_PATH,
      `${CLOUDINARY_UPLOAD_PATH}f_auto,q_auto,c_limit,w_${width}/`,
    )

    return url.toString()
  } catch {
    return src
  }
}

export function getCloudinarySrcSet(src: string, widths: number[]) {
  const sources = widths.map((width) => `${getCloudinaryImageUrl(src, width)} ${width}w`)

  return new Set(sources).size > 1 ? sources.join(", ") : undefined
}
