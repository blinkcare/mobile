export const scale = [0, 8, 16, 32, 64]
export const typeScale = [64, 48, 32, 24, 16, 14, 12]

export const palette = {
  red: '#ee2a20',
  orange: '#ee9120',
  green: '#1cd783',
  blue: '#207aee',

  black: '#1f2d3d',
  steel: '#273444',
  slate: '#3c4858',
  grey: '#8492a6',
  // smoke3: '#c0ccda',
  // smoke2: '#d3dce6',
  smoke: '#e0e6ed',
  // snow3: '#e5e9f2',
  // snow2: '#eff2f7',
  snow: '#f9fafc',
  white: '#ffffff'
}

export const themes = {
  default: palette.black,
  secondary: palette.grey,
  primary: palette.blue,
  info: palette.blue,
  success: palette.green,
  alert: palette.orange,
  warning: palette.orange,
  danger: palette.red,
  error: palette.red
}

export const colors = {
  ...palette,
  ...themes
}

export const radius = 4
export const radiusL = 6

const theme = {
  scale,
  typeScale,
  colors,
  radii: [4, 8, 9999]
}

export default theme
