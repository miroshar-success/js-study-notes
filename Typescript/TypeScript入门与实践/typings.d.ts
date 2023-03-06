// 外部声明
declare const book: { price: number; name: string; author: string; is_published: boolean }
declare function alert(message: string): void

declare namespace Drawing {
  interface Point {
    x: number;
    y: number;
    z: number;
  }
}