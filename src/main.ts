import { Actor, Color, DisplayMode, Engine, PointerScope, vec } from 'excalibur'

import { Lane } from './models/lane' // change to './models/lane_slow'
import { Star } from './models/star'
import { useGalaxy } from './stores/galaxy'
import './style.css'

const engine = new Engine({
  canvasElementId: 'game',
  displayMode: DisplayMode.FillScreen,
  backgroundColor: Color.Transparent,
  pointerScope: PointerScope.Document,
  physics: false,
})

const { stars, connections } = useGalaxy()

stars.forEach((star) => {
  engine.add(new Star(star.id, { pos: vec(star.x, star.y) }))
})

connections.forEach((connection) => {
  const from = stars.find(star => star.id === connection.from)
  const to = stars.find(star => star.id === connection.to)

  if (from && to) {
    engine.add(new Lane(
      vec(from.x, from.y),
      vec(to.x, to.y),
    ))
  }
})

const camera = new Actor({
  pos: vec(0, 0),
})
engine.add(camera)

engine.currentScene.camera.strategy.lockToActor(camera)
engine.currentScene.camera.zoom = 0.18

engine.start()
