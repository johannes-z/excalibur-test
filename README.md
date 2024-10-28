Repro of excalibur.js issue.

```ts
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
```

is faster than (~20%)

```ts
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
```

## Steps to reproduce
```
pnpm install
pnpm run dev
```

This is using the optimized Actor. Change line #3 in `src/main.ts` to use `./models/lane_slow`.
