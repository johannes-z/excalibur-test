import type { ActorArgs, Vector } from 'excalibur'
import { Actor, BoundingBox, Color, Line, vec } from 'excalibur'

export class Lane extends Actor {
  constructor(start: Vector, end: Vector, config?: ActorArgs) {
    super({
      z: 10,
      ...config,
      pos: start,
    })

    const _end = end.sub(start)

    this.graphics.localBounds = BoundingBox.fromPoints([
      vec(0, 0),
      _end,
    ])

    const color = new Color(0, 255, 255, 1)

    this.graphics.onPostDraw = (gfx) => {
      gfx.drawLine(vec(0, 0), _end, color, 5)
    }
  }
}
