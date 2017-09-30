import React from 'react'
import Box from './Box'
import styled from 'styled-components/native'

const Card = styled(Box).attrs({
  p: 2,
  m: 2,
  borderWidth: 2,
  borderColor: 'smoke'
})`background-color: white;`

export default Card
