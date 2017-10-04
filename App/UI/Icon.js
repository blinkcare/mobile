import React from 'react'
import styled from 'styled-components/native'
import { Icon as Element } from 'react-native-elements'
import { getColor } from './util'
import { space, alignSelf } from 'styled-system'

const Base = styled(Element)([], space, alignSelf)

const Icon = ({ color = 'snow', underlayColor = 'blue', ...props }) => (
  <Base
    color={getColor(color)}
    underlayColor={getColor(underlayColor)}
    {...props}
  />
)

export default Icon
