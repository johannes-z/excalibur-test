import type { ActorArgs, Vector } from 'excalibur'
import { Actor, Color, Line, vec } from 'excalibur'

export class Lane extends Actor {
  constructor(start: Vector, end: Vector, config?: ActorArgs) {
    super({
      z: 10,
      ...config,
      pos: start,
    })

    const color = new Color(0, 255, 255, 1)
    this.graphics.use(new Line({
      start: vec(0, 0),
      end: end.sub(start),
      thickness: 5,
      color,
    }), { anchor: vec(0, 0) })
  }
}
