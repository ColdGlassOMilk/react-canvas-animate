class ImageLoader {
  private images: Record<string, HTMLImageElement> = {}

  constructor(srcList?: string[]) {
    this.loadImages(srcList || [])
  }

  loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        this.images[src] = img
        resolve(img)
      }
      img.onerror = (error) => {
        reject(error)
      }
      img.src = src
    })
  }

  loadImages(srcList: string[]): Promise<HTMLImageElement[]> {
    const pendingImages: Promise<HTMLImageElement>[] = srcList.map((src) => this.loadImage(src))
    return Promise.all(pendingImages)
  }

  getImageList(): string[] {
    return Object.keys(this.images)
  }

  getImages(): HTMLImageElement[] {
    return Object.values(this.images)
  }

  getImage(src: string): HTMLImageElement {
    return this.images[src] || new Image()
  }
}

export default ImageLoader
