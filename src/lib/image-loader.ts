class ImageLoader {
  private images: Record<string, HTMLImageElement> = {}

  loadImages(srcList: string[]): Promise<void[]> {
    const pendingImages: Promise<void>[] = []
    srcList.forEach((src) => {
      pendingImages.push(
        new Promise<void>((resolve, reject) => {
          const img = new Image()
          img.onload = () => {
            this.images[src] = img
            resolve()
          }
          img.onerror = (error) => {
            reject(error)
          }
          img.src = src
        }),
      )
    })
    return Promise.all(pendingImages)
  }

  getImage(src: string): HTMLImageElement {
    return this.images[src] || new Image()
  }
}

export default ImageLoader
