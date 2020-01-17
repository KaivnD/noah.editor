export interface Point2D {
  x: number
  y: number
}

export interface Vector2D extends Point2D {}

export interface Transform {
  x: number
  y: number
  /**
   * Zoom
   */
  z: number
}

export default {
  add(v1: Vector2D, v2: Vector2D): Vector2D {
    return { x: v1.x + v2.x, y: v1.y + v2.y }
  },
  sub(v1: Vector2D, v2: Vector2D): Vector2D {
    return { x: v1.x - v2.x, y: v1.y - v2.y }
  },
  mult(v: Vector2D, m: number): Vector2D {
    return { x: v.x * m, y: v.y * m }
  },
  div(v: Vector2D, m: number): Vector2D {
    return { x: v.x / m, y: v.y / m }
  }
}
