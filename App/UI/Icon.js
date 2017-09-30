import React from 'react'
import styled from 'styled-components/native'
import { Icon as Element } from 'react-native-elements'
import { getColor } from './util'
import { space, alignSelf } from 'styled-system'

const Base = styled(Element)([], space, alignSelf)

const Icon = ({ color, ...props }) => <Base color={getColor(bg)} {...props} />

export default Icon
