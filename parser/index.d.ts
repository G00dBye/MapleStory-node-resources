declare class FileClass {
  constructor(file?: string)
  /** descriptor.fd for opening a file descriptor */
  descriptor: { fd?: number }
  filename?: string
  isFile: true

  /** file's now offset */
  offset: number

  open(filename?: string): Promise<this>
  close(): Promise<void>

  /** change the offset */
  seek(position: number): number
  /** shift the offset and return it */
  shift(position: number): number
  /** return file offset */
  pos(): number
}
interface FileClass {
  clone(ref: FileClass): FileClass
}

declare namespace FileTypes {
  interface FileDirInfo {
    name: string
    dirs: true
    dir?: (ImageInfo|FileDirInfo)[]
  }
  interface ImageInfo {
    name: string
    dirs: false
  }
}
type FileTypes = FileTypes.FileDirInfo | FileTypes.ImageInfo

declare class Wz_File {
  constructor(file: string | FileClass)
  parse(): Promise<this>
  release(): void
  value?: FileTypes.FileDirInfo

  /**
   * 可选的解析中日志
   *
   * 为log对象赋值函数，在解析到新纪录时获得通知
   *
   * - `path`  当前路径 string[]
   * - `count` 已加载多少记录
   * - `name`  当前加载记录名称
   */
  log?: (now_path: string[], count: number, name: string) => void
}

declare namespace ImageTypes {
  interface ImagePropertyNode {
    class: "Property"
    children: ImageNodeValue[]
  }
  interface ImageVectorNode {
    class: "Shape2D#Vector2D" | "Shape2D#Convex2D"
    value: Wz_Vector
  }
  interface ImageCanvasNode {
    class: "Canvas"
    children?: ImageNodeValue[]
    value: Wz_Picture
  }
  interface ImageSoundNode {
    class: "Sound_DX8"
    value: Wz_Sound
  }
  interface ImageUolNode {
    class: "UOL"
    value: Wz_Uol
  }
  type ImageNodeValue = ImageNodeNullValue | ImageNodeIntValue | ImageNodeFloatValue | ImageNodeStringValue | ImageNodeImageValue
  interface ImageNodeNullValue {
    name: string
    type: "null"
    value: null
  }
  interface ImageNodeIntValue {
    name: string
    type: "integer"
    value: number
  }
  interface ImageNodeFloatValue {
    name: string
    type: "float"
    value: number
  }
  interface ImageNodeStringValue {
    name: string
    type: "string"
    value: string
  }
  interface ImageNodeImageValue {
    name: string
    type: "image"
    value: ImageNode
  }
  class ImageNode {
    extractImg(): Promise<this>
    release(): void
    type: "ImageNode"
    value?: ImagePropertyNode | ImageVectorNode | ImageCanvasNode | ImageSoundNode | ImageUolNode
  }
}

declare class Wz_Image {
  constructor(info: FileTypes.ImageInfo)
  parse(): this
  value?: ImageTypes.ImageNode
}
declare class Wz_Sound {
  toString(): string
  element: true
  type: "sound"
  soundtype: "mp3" | "binary" | "wavraw"
  extractSound(): Promise<Buffer>
}
declare class Wz_Vector {
  toString(): string
  element: true
  type: "vector"
  x: number
  y: number
}
declare class Wz_Picture {
  toString(): string
  element: true
  type: "picture"
  form: 1 | 2 | 3 | 513 | 517 | 1026 | 2050
  width: number
  height: number
  extractRGBA(): Promise<Uint8ClampedArray>
  extractPNG(): Promise<any>
}
declare class Wz_Uol {
  toString(): string
  element: true
  type: "uol"
  link: string[]
}
export default undefined
export {
  FileClass as fileclass,
  Wz_File as wz_file,
  Wz_Image as wz_image,
  // Do not use it, only for typing
  Wz_Sound as wz_sound,
  Wz_Vector as wz_vector,
  Wz_Picture as wz_picture,
  Wz_Uol as wz_uol,
  ImageTypes,
  FileTypes
}
