import type { ActorArgs } from 'excalibur'
import { Actor, Color, Vector } from 'excalibur'

export class Star extends Actor {
  constructor(id: string, config?: ActorArgs) {
    super({
      z: 100,
      ...config,
    })

    this.graphics.onPostDraw = (gfx) => {
      gfx.drawCircle(Vector.Zero, 20, Color.Yellow)
    }

    return this
  }
}
