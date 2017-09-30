import React from 'react'
import styled from 'styled-components/native'
import { Button as Element } from 'react-native-elements'
import { getColor } from './util'
import { space, alignSelf } from 'styled-system'
import theme from './theme'

const Base = styled(Element)([], space, alignSelf)

const Button = ({ bg = 'primary', pill, ...props }) => (
  <Base
    backgroundColor={getColor(bg)}
    borderRadius={pill ? theme.radii[2] : theme.radii[0]}
    {...props}
  />
)

export default Button
