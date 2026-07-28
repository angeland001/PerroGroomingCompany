import { useCallback, useEffect, useRef, useState } from 'react'
import './PupWidget.css'

/* Behavior ported from https://codepen.io/Ma5a/pen/MWBGbOb (Masahito Leo Takeuchi):
   the pup stays put at its starting spot and just looks toward the cursor,
   snapped to 8 directions. Positioning is adapted to `position: fixed` +
   viewport coordinates (instead of page coordinates) so it tracks the
   visible screen across a tall, scrolling site rather than a single
   fixed-height pen. On touch/mobile widths there's no cursor to chase, so
   it just sits in its resting pose. */

type Point = { x: number; y: number }
type Part = 'head' | 'body'
type Direction = 'clockwise' | 'anti-clockwise'
type Frame = [number, string?]

const ANGLES = [360, 45, 90, 135, 180, 225, 270, 315]
const ROTATE_FRAMES: Frame[] = [[0], [1], [2], [3], [5], [3, 'f'], [2, 'f'], [1, 'f']]
const DEFAULT_END = 4 // ROTATE_FRAMES[4] === [5], the front-facing/"down" resting pose
const DOG_SIZE = 96 // calc(2 * 48px)
const HEAD_FRAME_W = 31 * 2
const BODY_FRAME_W = 48 * 2
const MOBILE_QUERY = '(max-width: 640px)'

const PART_POSITIONS = [
  { leg1: { x: 26, y: 43 }, leg2: { x: 54, y: 43 }, leg3: { x: 26, y: 75 }, leg4: { x: 54, y: 75 }, tail: { x: 40, y: 70, z: 1 } },
  { leg1: { x: 33, y: 56 }, leg2: { x: 55, y: 56 }, leg3: { x: 12, y: 72 }, leg4: { x: 32, y: 74 }, tail: { x: 20, y: 64, z: 1 } },
  { leg1: { x: 59, y: 62 }, leg2: { x: 44, y: 60 }, leg3: { x: 25, y: 64 }, leg4: { x: 11, y: 61 }, tail: { x: 4, y: 44, z: 1 } },
  { leg1: { x: 39, y: 63 }, leg2: { x: 60, y: 56 }, leg3: { x: 12, y: 52 }, leg4: { x: 28, y: 50 }, tail: { x: 7, y: 21, z: 0 } },
  { leg1: { x: 23, y: 54 }, leg2: { x: 56, y: 54 }, leg3: { x: 24, y: 25 }, leg4: { x: 54, y: 25 }, tail: { x: 38, y: 2, z: 0 } },
  { leg1: { x: 21, y: 58 }, leg2: { x: 41, y: 64 }, leg3: { x: 53, y: 50 }, leg4: { x: 69, y: 53 }, tail: { x: 72, y: 22, z: 0 } },
  { leg1: { x: 22, y: 59 }, leg2: { x: 30, y: 64 }, leg3: { x: 56, y: 60 }, leg4: { x: 68, y: 62 }, tail: { x: 78, y: 40, z: 0 } },
  { leg1: { x: 47, y: 45 }, leg2: { x: 24, y: 53 }, leg3: { x: 68, y: 68 }, leg4: { x: 47, y: 73 }, tail: { x: 65, y: 65, z: 1 } },
] as const

const px = (n: number) => `${n}px`
const radToDeg = (r: number) => Math.round(r * (180 / Math.PI))
const degToRad = (d: number) => d / (180 / Math.PI)
const nearestN = (x: number, n: number) => (x === 0 ? 0 : x - 1 + Math.abs(((x - 1) % n) - n))

const rotateCoord = (angle: number, origin: Point, x: number, y: number): Point => {
  const a = degToRad(angle)
  const ax = x - origin.x
  const ay = y - origin.y
  return {
    x: ax * Math.cos(a) - ay * Math.sin(a) + origin.x,
    y: ax * Math.sin(a) + ay * Math.cos(a) + origin.y,
  }
}

const clampToViewport = (x: number, y: number): Point => ({
  x: Math.min(Math.max(x, 8), window.innerWidth - DOG_SIZE - 12),
  y: Math.min(Math.max(y, 8), window.innerHeight - DOG_SIZE - 8),
})

// Starting spot: top-right of the page content, just under the sticky
// header (so it never sits on top of the header itself). Recomputed on
// resize (see the effect below) so it stays clear of the header and the
// viewport edge at any screen size.
const getStartPosition = (): Point => {
  const header = document.querySelector('.site-header')
  const headerBottom = header ? header.getBoundingClientRect().bottom : 0
  const top = Math.max(headerBottom + 16, 16)
  return clampToViewport(window.innerWidth - DOG_SIZE - 24, top)
}

export default function PupWidget() {
  const dogElRef = useRef<HTMLDivElement>(null)
  const bodyFlipRef = useRef<HTMLDivElement>(null)
  const bodyImgRef = useRef<HTMLDivElement>(null)
  const headFlipRef = useRef<HTMLDivElement>(null)
  const headImgRef = useRef<HTMLDivElement>(null)
  const legWrapperRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null])
  const legImgRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null])
  const tailWrapperRef = useRef<HTMLDivElement>(null)
  const tailImgRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<Point>({ x: 24, y: 8 })

  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches)

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  // Shared sprite helpers — pure DOM writes against stable refs, safe to reuse
  // from either the desktop chase effect or the mobile patrol effect below.
  const setTranslate = (target: HTMLElement, x: number, y: number) => {
    target.style.transform = `translate(${px(x)}, ${px(y)})`
  }

  const positionLegs = useCallback((frame: number) => {
    const positions = PART_POSITIONS[frame]
    ;([1, 2, 3, 4] as const).forEach((n, i) => {
      const wrapper = legWrapperRefs.current[i]
      if (!wrapper) return
      const { x, y } = positions[`leg${n}` as 'leg1']
      setTranslate(wrapper, x, y)
    })
  }, [])

  const moveLegs = () => {
    [0, 3].forEach((i) => legImgRefs.current[i]?.classList.add('pup-walk-1'))
    ;[1, 2].forEach((i) => legImgRefs.current[i]?.classList.add('pup-walk-2'))
  }

  const stopLegs = () => {
    [0, 3].forEach((i) => legImgRefs.current[i]?.classList.remove('pup-walk-1'))
    ;[1, 2].forEach((i) => legImgRefs.current[i]?.classList.remove('pup-walk-2'))
  }

  const positionTail = useCallback((frame: number) => {
    const wrapper = tailWrapperRef.current
    if (!wrapper) return
    const tail = PART_POSITIONS[frame].tail
    setTranslate(wrapper, tail.x, tail.y)
    wrapper.style.zIndex = String(tail.z)
    tailImgRef.current?.classList.add('pup-wag')
  }, [])

  // Anchored at its starting spot, but reflowed whenever the viewport changes
  // size so it never drifts on top of the heading or other content — it just
  // never walks there on its own.
  useEffect(() => {
    const dogEl = dogElRef.current
    if (!dogEl) return

    const applyPosition = (point: Point) => {
      anchorRef.current = point
      dogEl.style.left = px(point.x)
      dogEl.style.top = px(point.y)
    }

    applyPosition(getStartPosition())
    positionLegs(DEFAULT_END)
    positionTail(DEFAULT_END)
    if (headImgRef.current) headImgRef.current.style.transform = `translateX(${px(DEFAULT_END * -HEAD_FRAME_W)})`
    if (bodyImgRef.current) bodyImgRef.current.style.transform = `translateX(${px(DEFAULT_END * -BODY_FRAME_W)})`

    let resizeTimer: number | undefined
    const handleResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => applyPosition(getStartPosition()), 120)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
    }
  }, [positionLegs, positionTail])

  // ---- Desktop / pointer-capable: turn in place to face the cursor ----
  useEffect(() => {
    if (isMobile) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const dogEl = dogElRef.current
    if (!dogEl) return

    // Reads the anchor fresh every call — the position effect above can move
    // it on resize, and the facing math always needs the current spot.
    const getPos = (): Point => ({ x: anchorRef.current.x + 48, y: anchorRef.current.y + 48 })

    const control: Point = { x: getPos().x, y: getPos().y + 200 }

    const dog = {
      timer: {} as Record<Part, number | undefined>,
      facing: { x: getPos().x, y: getPos().y + 100 },
      angle: 360,
      turning: false,
    }

    let paused = false

    const targetAngle = () => {
      const pos = getPos()
      const angle = radToDeg(Math.atan2(pos.y - control.y, pos.x - control.x)) - 90
      const adjusted = angle < 0 ? angle + 360 : angle
      const snapped = nearestN(adjusted, 45)
      return snapped === 0 ? 360 : snapped
    }

    const animateDog = (opts: {
      target: HTMLElement
      frameW: number
      currentFrame: number
      end: number
      part: Part
      speed: number
      direction: Direction
    }) => {
      const { target, frameW, currentFrame, end, part, speed, direction } = opts
      const offset = direction === 'clockwise' ? 1 : -1
      const frame = ROTATE_FRAMES[currentFrame]
      target.style.transform = `translateX(${px(frame[0] * -frameW)})`

      if (part === 'body') {
        positionLegs(currentFrame)
        moveLegs()
        positionTail(currentFrame)
      } else {
        headFlipRef.current?.classList.add('pup-happy')
      }

      dog.angle = ANGLES[currentFrame]

      const flipTarget = part === 'body' ? bodyFlipRef.current : headFlipRef.current
      flipTarget?.classList[frame[1] === 'f' ? 'add' : 'remove']('pup-flip')

      let nextFrame = currentFrame + offset
      if (nextFrame === -1) nextFrame = ROTATE_FRAMES.length - 1
      else if (nextFrame === ROTATE_FRAMES.length) nextFrame = 0

      if (currentFrame !== end) {
        dog.timer[part] = window.setTimeout(
          () => animateDog({ ...opts, currentFrame: nextFrame }),
          speed || 150,
        )
      } else if (part === 'body') {
        const pos = getPos()
        dog.facing = rotateCoord(dog.angle, pos, pos.x, pos.y - 100)
        window.setTimeout(stopLegs, 200)
        window.setTimeout(() => headFlipRef.current?.classList.remove('pup-happy'), 5000)
      }
    }

    const triggerDogAnimation = (opts: {
      target: HTMLElement
      frameW: number
      start: number
      end: number
      part: Part
      speed: number
      direction: Direction
    }) => {
      window.clearTimeout(dog.timer[opts.part])
      dog.timer[opts.part] = window.setTimeout(
        () => animateDog({ ...opts, currentFrame: opts.start }),
        opts.speed || 150,
      )
    }

    const getDirection = (target: Point): Direction => {
      const pos = getPos()
      const dx2 = dog.facing.x - pos.x
      const dy1 = pos.y - target.y
      const dx1 = target.x - pos.x
      const dy2 = pos.y - dog.facing.y
      return dx2 * dy1 > dx1 * dy2 ? 'anti-clockwise' : 'clockwise'
    }

    const turnDog = (start: number, end: number, direction: Direction) => {
      if (start === end) return
      if (headImgRef.current) {
        triggerDogAnimation({ target: headImgRef.current, frameW: HEAD_FRAME_W, start, end, part: 'head', speed: 100, direction })
      }
      window.setTimeout(() => {
        if (bodyImgRef.current) {
          triggerDogAnimation({ target: bodyImgRef.current, frameW: BODY_FRAME_W, start, end, part: 'body', speed: 100, direction })
        }
      }, 200)
    }

    const triggerTurnDog = () => {
      const start = ANGLES.indexOf(dog.angle)
      const end = ANGLES.indexOf(targetAngle())
      turnDog(start, end, getDirection(control))
    }

    const handleMove = (e: MouseEvent) => {
      if (paused) return
      control.x = e.clientX
      control.y = e.clientY
      triggerTurnDog()
    }

    // Cursor has actually left the browser viewport (not just moved onto a
    // child element) — freeze the gaze until it comes back. This has to
    // actively stop any turn already in progress, not just block new input.
    const handleDocLeave = () => {
      paused = true
      window.clearTimeout(dog.timer.head)
      window.clearTimeout(dog.timer.body)
      dog.turning = false
      stopLegs()
    }
    const handleDocEnter = () => {
      paused = false
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleDocLeave)
    document.documentElement.addEventListener('mouseenter', handleDocEnter)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleDocLeave)
      document.documentElement.removeEventListener('mouseenter', handleDocEnter)
      window.clearTimeout(dog.timer.head)
      window.clearTimeout(dog.timer.body)
    }
  }, [isMobile, positionLegs, positionTail])

  return (
    <div className="pup-widget" ref={dogElRef} aria-hidden="true" style={{ width: DOG_SIZE, height: DOG_SIZE }}>
      <div className="pup-widget__body-window">
        <div className="pup-widget__body-flip" ref={bodyFlipRef}>
          <div className="pup-widget__body pup-widget__img-bg" ref={bodyImgRef} />
        </div>
      </div>
      <div className="pup-widget__head-window">
        <div className="pup-widget__head-flip" ref={headFlipRef}>
          <div className="pup-widget__head pup-widget__img-bg" ref={headImgRef} />
        </div>
      </div>
      {[0, 1, 2, 3].map((i) => (
        <div
          className="pup-widget__leg-wrapper"
          key={i}
          ref={(el) => {
            legWrapperRefs.current[i] = el
          }}
        >
          <div
            className="pup-widget__leg pup-widget__img-bg"
            ref={(el) => {
              legImgRefs.current[i] = el
            }}
          />
        </div>
      ))}
      <div className="pup-widget__tail-wrapper" ref={tailWrapperRef}>
        <div className="pup-widget__tail pup-widget__img-bg" ref={tailImgRef} />
      </div>
    </div>
  )
}
