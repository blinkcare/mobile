import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import Box from './Box'
import {
  alignItems,
  justifyContent,
  flexWrap,
  flexDirection,
  flex,
  alignSelf
} from 'styled-system'

const Flex = Box.extend(
  [],
  { display: 'flex' },
  alignItems,
  justifyContent,
  flexWrap,
  flexDirection,
  flex,
  alignSelf
)

export default Flex
