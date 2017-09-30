import { colors } from './theme'
import { includes } from 'lodash'

export const getColor = (color: string): string =>
  includes(color, '#') || includes(color, 'rgb') ? color : colors[color]
