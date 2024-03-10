export function rgbAngle(angle: number): string {
  // Ensure the angle is within the range [0, 360)
  angle %= 360
  if (angle < 0) {
    angle += 360
  }

  // Convert angle to RGB color
  let r: number, g: number, b: number
  if (angle < 120) {
    r = ((120 - angle) / 120) * 255
    g = (angle / 120) * 255
    b = 0
  } else if (angle < 240) {
    angle -= 120
    r = 0
    g = ((120 - angle) / 120) * 255
    b = (angle / 120) * 255
  } else {
    angle -= 240
    r = (angle / 120) * 255
    g = 0
    b = ((120 - angle) / 120) * 255
  }

  // Return RGB color in the format 'rgb(r, g, b)'
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
}
