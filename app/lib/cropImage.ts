export async function getCroppedImg(
  imageSrc: string,
  crop: { x: number; y: number; width: number; height: number }
): Promise<Blob> {
  const image = new Image()
  image.src = imageSrc
  await new Promise(resolve => (image.onload = resolve))

  const canvas = document.createElement("canvas")
  canvas.width = 256
  canvas.height = 256

  const ctx = canvas.getContext("2d")!

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    256,
    256
  )

  return new Promise(resolve =>
    canvas.toBlob(blob => resolve(blob!), "image/jpeg", 0.9)
  )
}
