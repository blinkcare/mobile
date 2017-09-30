import React from 'react'
import { Text as Native } from 'react-native'
import styled from 'styled-components/native'
import {
  space,
  width,
  color,
  fontSize,
  textAlign,
  fontWeight,
  borderWidth,
  borderColor
} from 'styled-system'
import getColor from './util'

const Text = styled(Native)(
  [],
  space,
  width,
  color,
  fontSize,
  textAlign,
  fontWeight,
  borderWidth,
  borderColor
)

export default Text
