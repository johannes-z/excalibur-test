import { vec } from 'excalibur'

export const PLAYFIELD_WIDTH = 6000
export const PLAYFIELD_HEIGHT = 6000

const galaxy = galaxyGenerator()

export function useGalaxy() {
  return galaxy
}

function generateStars(numStars = 600) {
  const stars = []

  let passes = 0
  while (stars.length < numStars) {
    if (passes > 10000)
      return stars
    const i = stars.length

    const angle = Math.random() * Math.PI * 2
    const distance = Math.random() * 2000 + 1000

    const x = Math.cos(angle) * distance
    const y = Math.sin(angle) * distance

    const neighbors = stars.filter((star) => {
      return Math.abs(star.x - x) < 100 && Math.abs(star.y - y) < 100
    })

    if (neighbors.length > 0) {
      passes++
      continue
    }

    stars.push({
      x,
      y,
      id: `${i}`,
    })
  }

  return stars
}

function generateConnections(stars) {
  // generate at least 1 connection per star, prevent overlapping connectors
  const connections = []

  stars.forEach((star, i) => {
    const numConnections = Math.floor(Math.random() * 3) + 1

    // find closest neighbors in circle (360°), ignore distance
    const neighbors = stars.filter((neighbor, j) => {
      if (i === j)
        return false

      return vec(star.x, star.y).distance(vec(neighbor.x, neighbor.y)) < 300
    }).slice(0, numConnections)

    // const neighbors = stars.filter((neighbor, j) => {
    //   if (i === j)
    //     return false

    //   const dx = Math.abs(star.x - neighbor.x)
    //   const dy = Math.abs(star.y - neighbor.y)
    //   return Math.sqrt(dx * dx + dy * dy) < 200
    // })

    neighbors.forEach((neighbor) => {
      const connection = connections.find((connection) => {
        return connection.from === neighbor.id && connection.to === star.id
      })

      if (!connection) {
        connections.push({
          from: star.id,
          to: neighbor.id,
        })
      }
    })
  })

  return connections
}

function galaxyGenerator(numStars = 600) {
  const galaxy = {
    stars: [
      { x: 0, y: 0, id: '-1' },
    ],
    connections: [],
  }

  const stars = generateStars(numStars)
  const connections = generateConnections(stars)

  galaxy.stars = galaxy.stars.concat(stars)
  galaxy.connections = galaxy.connections.concat(connections)

  return galaxy
}
